<template>
    <q-list>
      <div class="row">
        <div class="col-4">
          <q-item-label header>Groups</q-item-label>
         </div>
        <div class="col-8  q-pa-sm">
          <q-btn no-caps outline size="sm" class="float-right  q-pa-xs" color="grey-9" label="New Group" @click="newGroup" />
        </div>
        <div class="col-12 q-pa-md">
          <JoinGroup />
         </div>
       </div>
      <q-item clickable v-ripple v-for="(record) in groupsList" v-bind:key="record.keyRef" @click.native="projectDetail(record)">
        <q-item-section>
          <q-item-label>{{record.name}}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon color="grey-9" name="keyboard_arrow_right" />
        </q-item-section>
      </q-item>
    </q-list>
</template>

<script>
import JoinGroup from '../components/joinGroup'
export default {
  name: 'GroupsList',
  components: { JoinGroup },
  data () {
    return {}
  },
  beforeMount () {
    let projectsRef = this.$db.ref('/profiles/' + this.$auth.currentUser.uid + '/groups/')
    projectsRef.on('child_added', (data) => {
      let grpID = data.val()
      let store = this.$store
      this.$db.ref('/projects/' + grpID + '/').once('value').then(function (snapshot) {
        if (snapshot.val() !== null) {
          store.dispatch('projects/projectAdded', snapshot)
        }
      })
    })
  },
  computed: {
    groupsList: function () {
      return this.$store.getters['projects/projectsList']
    }
  },
  methods: {
    projectDetail (record) {
      // this.$router.push({ path: `/projectDetail/${record.participantCode}`, params: { project: record } })
      this.$router.push({ name: 'projectDetail', params: { id: record.participantCode, project: record } })
    },
    async newGroup () {
      this.$router.push('newProject')
    }
  }
}
</script>

<style>
</style>
