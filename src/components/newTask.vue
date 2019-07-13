<template>
  <q-form @submit="addTask">
    <q-input label="Task *" dark v-model="taskData.title" class="q-ma-sm" stack-label
      :rules="[ val => val && val.length > 0 || 'What is your task?']"
    />
    <q-input label="Summary *" dark type="textarea" rows="2" v-model="taskData.summary" class="q-ma-sm" stack-label
      :rules="[ val => val && val.length > 0 || 'Please add few lines about task']"
    />
    <q-input label="Expected Start Date / Time *" dark v-model="taskData.start_date_time" class="q-ma-sm" stack-label>
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date dark v-model="taskData.start_date_time" mask="YYYY-MM-DD HH:mm" stack-label/>
          </q-popup-proxy>
        </q-icon>
      </template>
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time dark v-model="taskData.start_date_time" mask="YYYY-MM-DD HH:mm" format24h/>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input label="Expected Completion Date / Time (Optional)" dark v-model="taskData.end_date_time" class="q-ma-sm" stack-label>
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date dark v-model="taskData.end_date_time" mask="YYYY-MM-DD HH:mm"/>
          </q-popup-proxy>
        </q-icon>
      </template>
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time dark v-model="taskData.end_date_time" mask="YYYY-MM-DD HH:mm" format24h />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <div class="row no-wrap text-white">
      <q-checkbox dark v-model="taskData.urgent" label="Urgent" class="q-mr-md"/>
      <q-checkbox dark v-model="taskData.important" label="Important" />
    </div>
  <q-btn color="grey-9" type="submit" class="full-width q-mt-md" >
      <span v-if="!loading">Add Task</span>
      <q-spinner-dots v-else/>
  </q-btn>
</q-form>
</template>

<script>
import { QSpinnerDots } from 'quasar'
import _ from 'underscore'

export default {
  name: 'NewTask',
  components: {
    QSpinnerDots
  },
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
      loading: false,
      priorityOptions: [
        { label: 'Very High', value: '1' },
        { label: 'High', value: '2' },
        { label: 'Medium', value: '3' },
        { label: 'Low', value: '4' }
      ]
    }
  },
  methods: {
    async addTask () {
      let errorInUpdate
      this.loading = true
      if (_.isUndefined(this.groupId)) {
        let keyRef = await this.$db.ref('/user-tasks/' + this.$auth.currentUser.uid + '/').push()
        this.taskData.keyRef = keyRef.key
        await keyRef.set(this.taskData, function (error) {
          errorInUpdate = error
        })
      } else {
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
          color: 'primary',
          textColor: 'white'
        })
        this.$router.go(-1)
      }
      this.loading = false
    }
  }
}
</script>

<style>
</style>
