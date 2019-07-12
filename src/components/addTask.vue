<template>
  <q-form @submit="addTask">
    <div class="row">
      <div class="col-8">
        <q-input label="New Task" dark dense v-model="taskData.title" stack-label/>
      </div>
      <div class="col-4">
        <q-btn no-caps color="grey-9" class="float-right" type="submit">Add</q-btn>
      </div>
    </div>
</q-form>
</template>

<script>
import _ from 'underscore'

export default {
  name: 'NewTask',
  props: {
    groupId: String
  },
  data () {
    return {
      taskData: {
        keyRef: '',
        title: '',
        summary: '',
        important: false,
        urgent: false,
        start_date_time: null,
        end_date_time: null,
        priority: '',
        completed: false,
        percentage_completion: 0,
        dependent: '',
        dependency_notes: null,
        delegated: false,
        delegatedTo: '',
        delegatedOn: null,
        notes: []
      },
      loading: false
    }
  },
  methods: {
    async addTask () {
      let errorInUpdate
      this.loading = true
      console.log(this.groupId)
      if (_.isUndefined(this.groupId)) {
        let keyRef = await this.$db.ref('/user-tasks/' + this.$auth.currentUser.uid + '/').push()
        this.taskData.keyRef = keyRef.key
        await keyRef.set(this.taskData, function (error) {
          errorInUpdate = error
        })
      } else {
        console.log('Adding group task')
        let keyRef = await this.$db.ref('/projects/' + this.groupId + '/tasks/').push()
        this.taskData.keyRef = keyRef.key
        await keyRef.set(this.taskData, function (error) {
          errorInUpdate = error
        })
      }
      if (errorInUpdate != null) {
        this.$q.notify({
          message: 'Error occured',
          type: 'negative'
        })
      } else {
        this.$q.notify({
          message: 'Task added',
          color: 'grey-9',
          textColor: 'white'
        })
      }
      this.loading = false
    }
  }
}
</script>

<style>
</style>
