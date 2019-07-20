<template>
  <q-card dark class="bg-grey-10" text-color="white" flat square>
    <q-card-section class="q-pa-sm">
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
    </q-card-section>
  </q-card>
</template>

<script>
import _ from 'underscore'

export default {
  name: 'NewTask',
  props: {
    project: Object
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
        // priority: '',
        completed: false,
        // percentage_completion: 0,
        // dependent: '',
        // dependency_notes: null,
        // delegated: false,
        // delegatedTo: '',
        // delegatedOn: null,
        notes: []
      },
      loading: false
    }
  },
  methods: {
    async addTask () {
      let errorInUpdate
      this.loading = true
      let groupTask = false
      if (_.isUndefined(this.project)) {
        let keyRef = await this.$db.ref('/user-tasks/' + this.$auth.currentUser.uid + '/').push()
        this.taskData.keyRef = keyRef.key
        await keyRef.set(this.taskData, function (error) {
          errorInUpdate = error
        })
      } else {
        let keyRef = await this.$db.ref('/projects/' + this.project.keyRef + '/tasks/').push()
        groupTask = true
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
        // DB has updated. So need to fetch latest data
        if (!groupTask) {
          this.$store.dispatch('tasks/populateUserTasks', { db: this.$db, auth: this.$auth })
        } else {
          this.$store.dispatch('groupTasks/populateGroupTasks', { db: this.$db, auth: this.$auth, project: this.project })
        }
        this.taskData.title = ''
        // this.$q.notify({
        //   message: 'Task added',
        //   color: 'grey-9',
        //   textColor: 'white'
        // })
      }
      this.loading = false
    }
  }
}
</script>

<style>
</style>
