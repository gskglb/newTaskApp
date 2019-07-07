<template>
  <q-form @submit="addProject">
    <q-input label="Participant Code" readonly dark filled v-model="joiningRef" class="q-ma-sm" stack-label
      :rules="[ val => val && val.length > 0 || 'Project / Group Name is required']"
    />
    <q-banner class="bg-grey-3">
      You should provide this participant code to people who want to join this group
    </q-banner>

    <q-input label="Project / Group Name  *" dark v-model="prj.name" class="q-ma-sm" stack-label
      :rules="[ val => val && val.length > 0 || 'Project / Group Name is required']"
    />
    <q-input label="Purpose of the group *" dark type="textarea" rows="2" v-model="prj.description" class="q-ma-sm" stack-label
      :rules="[ val => val && val.length > 0 || 'Please add few lines about project / group']"
    />
  <q-btn color="grey-9" type="submit" class="full-width q-mt-md" >
      <span v-if="!loading">Add Group</span>
      <q-spinner-dots v-else/>
  </q-btn>
</q-form>
</template>

<script>
import { QSpinnerDots, date } from 'quasar'

export default {
  name: 'NewProject',
  components: {
    QSpinnerDots
  },
  data () {
    return {
      prj: {
        keyRef: '',
        participantCode: '',
        name: '',
        description: '',
        status: false,
        admin: '',
        members: []
      },
      loading: false
    }
  },
  computed: {
    joiningRef: function () {
      let dateString = new Date()
      return date.formatDate(dateString, 'DDMMhhmmSS')
    }
  },
  methods: {
    async addProject () {
      this.loading = true
      let errorInUpdate
      this.prj.participantCode = this.joiningRef
      if (this.prj.members == null) {
        this.prj.members = []
      }
      this.prj.admin = this.$auth.currentUser.uid
      this.prj.members.push({ 'id': this.$auth.currentUser.uid, 'added': new Date() })
      let keyRef = await this.$db.ref('/projects/').push()
      this.prj.keyRef = keyRef.key
      await keyRef.set(this.prj, function (error) {
        errorInUpdate = error
      })
      let profile = null
      await this.$db.ref('/profiles/' + this.$auth.currentUser.uid + '/').once('value').then(function (snapshot) {
        if (snapshot.val() !== null && snapshot.val().displayName !== 'undefined' && snapshot.val().displayName !== null) {
          profile = snapshot.val()
          if (profile.groups == null) {
            profile.groups = []
          }
          profile.groups.push(keyRef.key)
          console.log('Profile in side %o', profile)
        }
      })
      console.log('profile outside %o', profile)
      await this.$db.ref('/profiles/' + this.$auth.currentUser.uid + '/').update(profile, function (error) {
        errorInUpdate = error
      })
      if (errorInUpdate != null) {
        this.$q.notify({
          message: 'Error occured',
          type: 'negative'
        })
      } else {
        this.$q.notify({
          message: 'Group added',
          color: 'grey-9',
          textColor: 'white'
        })
        this.$router.push('home')
      }
      this.loading = false
    }
  }
}
</script>

<style>
</style>
