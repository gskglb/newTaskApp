<template>
  <q-layout view="lHh Lpr lFf" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-grey-9">
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>
        <q-separator dark vertical inset />
        <q-toolbar-title>
          {{this.title}}
        </q-toolbar-title>
        <!-- <q-btn flat dense round aria-label="New" @click.native="$router.push('new')">
          <q-icon name="person" />
        </q-btn> -->
        <q-btn flat dense round @click.native="$router.push({name: 'home'})">
          <q-icon name="home" />
        </q-btn>
        <q-btn flat dense round aria-label="Exit" @click.native="signOut">
          <q-icon name="exit_to_app" />
        </q-btn>
      </q-toolbar>
        <!-- <q-tabs
          inline-label
          class="bg-grey-9 text-white"
        >
          <q-route-tab no-caps to="home" name="mails" label="Self" exact/>
          <q-route-tab no-caps to="group_home" name="alarms" label="Groups" exact/>
        </q-tabs> -->
    </q-header>
    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2" >
      <GroupsList />
    </q-drawer>
    <q-page-container>
      <router-view :key="$route.fullPath"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import GroupsList from '../components/listProjects'
export default {
  name: 'MyLayout',
  components: {
    GroupsList
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      title: '',
      slogan: ''
    }
  },
  methods: {
    setTitleAndSlogan: function (payload) {
      this.title = payload.title
      this.slogan = payload.slogan
    },
    async signOut () {
      let router = this.$router
      let store = this.$store
      await this.$auth.signOut().then(function () {
        console.error('Sign Out good')
        store.dispatch('tasks/flush')
        store.dispatch('projects/flush')
        router.push('/')
      }, function (error) {
        console.log(error)
      })
    }
  },

  created () {
    this.$bus.$on('setTitleAndSlogan', this.setTitleAndSlogan)
  },

  mounted () {
    // // Register firebase events
    // let tasksRef = this.$db.ref('/user-tasks/' + this.$auth.currentUser.uid + '/')
    // tasksRef.on('child_added', (data) => {
    //   this.$store.dispatch('tasks/taskAdded', data)
    // })

    // tasksRef.on('child_changed', (data) => {
    //   this.$store.dispatch('tasks/taskChanged', data)
    // })

    // tasksRef.on('child_removed', (data) => {
    //   this.$store.dispatch('tasks/taskDeleted', data)
    // })

    // tasksRef.once('value', (snap) => {
    // })
    // // Register firebase events
    // let projectsRef = this.$db.ref('/profiles/' + this.$auth.currentUser.uid + '/groups/')
    // projectsRef.on('child_added', (data) => {
    //   let grpID = data.val()
    //   let store = this.$store
    //   this.$db.ref('/projects/' + grpID + '/').once('value').then(function (snapshot) {
    //     if (snapshot.val() !== null) {
    //       store.dispatch('projects/projectAdded', snapshot)
    //     }
    //   })
    // })

    // projectsRef.on('child_changed', (data) => {
    //   this.$store.dispatch('projects/projectChanged', data)
    // })

    // projectsRef.on('child_removed', (data) => {
    //   this.$store.dispatch('projects/projectDeleted', data)
    // })

    // projectsRef.once('value', (snap) => {
    // })
  },

  beforeDestroy () {
    this.$bus.$off('setTitleAndSlogan', this.setTitleAndSlogan)
  }
}
</script>

<style>
</style>
