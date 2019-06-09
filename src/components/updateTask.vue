<template>
  <q-dialog v-model="showModal" minimized ref="modalRef">
    <q-card flat square v-if="taskData !== null">
      <q-card-section>
        <div class="text-h6">Update Task</div>
      </q-card-section>
      <q-separator />
    <q-card-section>
            <q-input v-model="taskData.title" placeholder="What is the task..." />
            <q-input type="textarea" v-model="taskData.summary" placeholder="Summary of the task..." />
            <q-datetime  v-model="taskData.start_date_time" type="datetime" placeholder="By when you want to start..." />
            <q-datetime  v-model="taskData.end_date_time" type="datetime" placeholder="By when this task should complete..." />
            <div class="row no-wrap">
              <q-slider v-model="taskData.percentage_completion" label snap  :min="0" :max="100"/>
            </div>
          <div class="row no-wrap">
            <q-checkbox  v-model="taskData.urgent"  label="Urgent" /> &nbsp;
            <q-checkbox  v-model="taskData.important"  label="Important" />
          </div>
        <div class="row justify-center q-mt-md">
        <q-btn flat no-caps class="bg-blue-grey-14"  text-color="white" @click="updateTask(taskData)" >
            <span v-if="!loading">Update Task</span>
            <q-spinner-dots v-else/>
        </q-btn>
        </div>
    </q-card-section>
          <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Update" color="primary" v-close-popup />
        </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { QSpinnerDots } from 'quasar'

export default {
  name: 'UpdateTask',
  components: {
    QSpinnerDots
  },
  props: {
    taskData: Object,
    showNotesModal: Boolean
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async updateTask (record) {
      console.log(record.keyRef)
      if (record.completed === true) {
        record.percentage_completion = 100
      }
      let errorHappened
      await this.$db.ref('/user-tasks/' + this.$auth.currentUser.uid + '/' + record.keyRef).update(record, function (error) {
        errorHappened = error
      })
      if (errorHappened) {
        this.$q.notify({
          message: 'Error occured',
          type: 'negative'
        })
      } else {
        this.$q.notify({
          message: 'Task Updated',
          color: 'blue-grey-14',
          textColor: 'white',
          icon: 'check'
        })
      }
      this.showModal = false
    },
    async resetAll () {
      this.taskData.title = ''
      this.taskData.summary = ''
      this.taskData.start_date_time = null
      this.taskData.end_date_time = null
      this.taskData.urgent = false
      this.taskData.important = false
    }
  },
  validations: {
    taskData: {
      title: { required },
      summary: { required },
      important: { required },
      urgent: { required },
      start_date_time: { required }
    }
  },
  computed: {
    showModal: {
      get: function () {
        console.log(this.showNotesModal)
        return this.showNotesModal === true
      },
      set: function (newValue) {
        // this.$bus.$emit('setEdit', { newValue })
      }
    }
  },

  mounted () {
    console.log('I am in')
  }

}
</script>

<style>
</style>
