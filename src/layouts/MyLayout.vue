<template>
  <q-layout view="lHh Lpr lFf" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-grey-9">
      <q-toolbar>
        <q-btn flat dense round @click.native="$router.push('home')">
          <q-icon name="home" />
        </q-btn>

        <q-toolbar-title>
          {{this.title}}
        </q-toolbar-title>
        <q-btn flat dense round aria-label="New" @click.native="$router.push('new')">
          <q-icon name="person" />
        </q-btn>
        <q-btn flat dense round aria-label="Exit" @click.native="signOut">
          <q-icon name="exit_to_app" />
        </q-btn>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <!-- <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://github.com/quasarframework/">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://chat.quasar.dev">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
            <q-item-label caption>chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://forum.quasar.dev">
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://twitter.com/quasarframework">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
      </q-list> -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
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
        router.push('/')
      }, function (error) {
        console.log('Sign Out Error %o', error)
      })
    }
  },

  created () {
    this.$bus.$on('setTitleAndSlogan', this.setTitleAndSlogan)
  },

  mounted () {
    // Register firebase events
    let tasksRef = this.$db.ref('/user-tasks/' + this.$auth.currentUser.uid + '/')
    tasksRef.on('child_added', (data) => {
      this.$store.dispatch('tasks/taskAdded', data)
    })

    tasksRef.on('child_changed', (data) => {
      this.$store.dispatch('tasks/taskChanged', data)
    })

    tasksRef.on('child_removed', (data) => {
      this.$store.dispatch('tasks/taskDeleted', data)
    })

    tasksRef.once('value', (snap) => {
      // console.log('initial data loaded!', snap.numChildren() === count)
    })
  }
}
</script>

<style>
</style>
