<template>
  <q-form @submit="addProject">
    <q-input label="Project / Group Name  *" dark v-model="prj.name" class="q-ma-sm" stack-label
      :rules="[ val => val && val.length > 0 || 'Project / Group Name is required']"
    />
    <q-input label="Description *" dark type="textarea" rows="2" v-model="prj.description" class="q-ma-sm" stack-label
      :rules="[ val => val && val.length > 0 || 'Please add few lines about project / group']"
    />
  <q-btn color="primary" type="submit" class="full-width q-mt-md" >
      <span v-if="!loading">Add Project / Group</span>
      <q-spinner-dots v-else/>
  </q-btn>
</q-form>
</template>

<script>
import { QSpinnerDots } from 'quasar'

export default {
  name: 'NewProject',
  components: {
    QSpinnerDots
  },
  data () {
    return {
      prj: {
        keyRef: '',
        name: '',
        description: '',
        status: false,
        admin: '',
        members: []
      },
      loading: false
    }
  },
  methods: {
    async addProject () {
      this.loading = true
      let errorInUpdate
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
          message: 'Project added',
          color: 'primary',
          textColor: 'white'
        })
        this.$router.push('list')
      }
      this.loading = false
    }
  }
}
</script>

<style>
</style>
