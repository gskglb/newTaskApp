<template>
    <q-list dark>
      <q-item>
        <q-item-section>
          <q-item-label overline>To join group, enter participant code</q-item-label>
          <q-item-label>
            <q-form @submit="joinGroup">
            <q-input dark filled dense v-model="participantCode"
              :rules="[ val => val && val.length > 0 || 'Participant Code is needed']"
            />
            <q-btn type="submit" no-caps label="Join" color="grey-8" text-color="white" class="full-width q-mb-xs"/>
            </q-form>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
</template>

<script>

export default {
  name: 'JoinGroup',
  props: {
    groupId: String
  },
  data () {
    return {
      show: false,
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
      let exists = false
      let groupKey = null
      await projectRef.orderByChild('participantCode').equalTo(this.participantCode).once('value', function (snapShot) {
        if (snapShot.val() === null) {
          that.$q.notify({
            message: 'Incorrect participant code',
            color: 'negative',
            textColor: 'white',
            icon: 'info'
          })
        } else {
          snapShot.forEach(function (data) {
            groupKey = data.key
            let groupRef = that.$db.ref('/projects/' + data.key + '/members/')
            groupRef.orderByChild('members').once('value', function (memSnapShot) {
              memSnapShot.forEach(function (memberData) {
                if (that.$auth.currentUser.uid === memberData.val().id) {
                  exists = true
                }
              })
              if (!exists) {
                that.addToGroup(groupKey)
              } else {
                that.$q.notify({
                  message: 'You are already member of this group',
                  color: 'red',
                  textColor: 'white',
                  icon: 'error'
                })
              }
            })
          })
        }
      })
      this.loading = false
    },
    async addToGroup (groupKey) {
      this.$db.ref('/projects/' + groupKey + '/members/').push({ 'id': this.$auth.currentUser.uid, 'added': new Date() })
      this.$q.notify({
        message: 'You are added to group',
        color: 'primary',
        textColor: 'white',
        icon: 'info'
      })
    }
  }
}
</script>

<style>
</style>
