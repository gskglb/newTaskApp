<template>
  <q-card dark class="bg-grey-9">
    <q-form @submit="joinGroup">
      <q-input dark label="Participant Code *" v-model="participantCode" class="q-ml-md q-mr-md" stack-label
        :rules="[ val => val && val.length > 0 || 'Participant Code is needed']"
      />
      <p dark class="q-ml-md q-mr-md">{{this.message}}</p>
      <q-btn dark no-caps outline size="md" type="submit" class="q-ma-sm">
          <span v-if="!loading">Join Group</span>
          <q-spinner-dots v-else/>
      </q-btn>
    </q-form>
  </q-card>
</template>

<script>
import { QSpinnerDots } from 'quasar'

export default {
  name: 'JoinGroup',
  components: {
    QSpinnerDots
  },
  props: {
    groupId: String
  },
  data () {
    return {
      participantCode: '',
      loading: false,
      message: ''
    }
  },
  methods: {
    async joinGroup () {
      this.loading = true
      let projectRef = await this.$db.ref('/projects/')
      let that = this
      // let groupKey = null
      projectRef.orderByChild('participantCode').equalTo(this.participantCode).on('value', function (snapShot) {
        if (snapShot.val() === null) {
          that.message = 'No groups found with this participant code'
        } else {
          snapShot.forEach(function (data) {
            let groupRef = that.$db.ref('/projects/' + data.key + '/members/')
            let keyRef = groupRef.push()
            keyRef.set({ id: that.$auth.currentUser.uid }, function (error) {
              console.log(error)
            })
          })
        }
      })
      this.loading = false
    }
  }
}
</script>

<style>
</style>
