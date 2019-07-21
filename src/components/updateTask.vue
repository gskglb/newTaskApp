<template>
  <q-dialog v-model="showModal" minimized ref="modalRef">
    <q-card dark class="q-pa-xs bg-grey-9" text-color="white" flat square v-if="taskData !== null" style="width: 350px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Update Task</div>
        <q-input dark label="Task *" v-model="taskData.title" stack-label
          :rules="[ val => val && val.length > 0 || 'What is your task?']"
        />
        <q-input dark label="Summary *" type="textarea" rows="3" v-model="taskData.summary"  stack-label
          :rules="[ val => val && val.length > 0 || 'Please add few lines about task']"
        />
        <q-input dark label="Expected Start Date / Time *" v-model="taskData.start_date_time"  stack-label>
          <template dark v-slot:prepend>
            <q-icon dark name="event" class="cursor-pointer">
              <q-popup-proxy dark transition-show="scale" transition-hide="scale">
                <q-date dark v-model="taskData.start_date_time" mask="YYYY-MM-DD HH:mm" stack-label/>
              </q-popup-proxy>
            </q-icon>
          </template>
          <template dark v-slot:append>
            <q-icon dark name="access_time" class="cursor-pointer">
              <q-popup-proxy dark transition-show="scale" transition-hide="scale">
                <q-time dark v-model="taskData.start_date_time" mask="YYYY-MM-DD HH:mm" format24h/>
              </q-popup-proxy>
          </q-icon>
          </template>
        </q-input>
        <q-input dark label="Expected Completion Date / Time (Optional)" v-model="taskData.end_date_time"  stack-label>
          <template dark v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date dark v-model="taskData.end_date_time" mask="YYYY-MM-DD HH:mm"/>
              </q-popup-proxy>
            </q-icon>
          </template>
          <template dark v-slot:append>
            <q-icon dark name="access_time" class="cursor-pointer">
              <q-popup-proxy dark transition-show="scale" transition-hide="scale">
                <q-time dark v-model="taskData.end_date_time" mask="YYYY-MM-DD HH:mm" format24h />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <!-- <div class="row">
          <p class="q-ma-sm">Percentage Completion</p>
          <q-slider dark v-model="taskData.percentage_completion" label label-always snap  :min=0 :max=100 />
        </div> -->
        <div class="row no-wrap">
          <q-checkbox  v-model="taskData.urgent"  label="Urgent" /> &nbsp;
          <q-checkbox  v-model="taskData.important"  label="Important" />
        </div>
      </q-card-section>
      <q-separator />

      <q-card-actions align="right">
        <q-btn flat no-caps label="Cancel" @click.native="cancelUpdate()" v-close-popup />
        <q-btn no-caps  label="Update" @click.native="updateTask(taskData)" color="grey-10" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import _ from 'underscore'
export default {
  name: 'UpdateTask',
  components: {
  },
  props: {
    taskData: Object,
    projectRef: String,
    showNotesModal: Boolean
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async updateTask (record) {
      let errorHappened
      console.log('REcord here %o', record)
      if (_.isUndefined(this.projectRef)) {
        console.log('user task update ')
        await this.$db.ref('/user-tasks/' + this.$auth.currentUser.uid + '/' + record.keyRef).update(record, function (error) {
          errorHappened = error
        })
        this.$store.dispatch('tasks/populateUserTasks', { db: this.$db, auth: this.$auth })
      } else {
        console.log('Group task update')
        await this.$db.ref('/projects/' + this.projectRef + '/tasks/' + record.keyRef).update(record, function (error) {
          errorHappened = error
        })
        this.$store.dispatch('groupTasks/populateGroupTasks', { db: this.$db, auth: this.$auth, projectRef: this.projectRef })
      }

      if (errorHappened) {
        this.$q.notify({
          message: 'Error occured',
          type: 'negative'
        })
      } else {
        this.$store.dispatch('tasks/populateUserTasks', { db: this.$db, auth: this.$auth })
        this.$q.notify({
          message: 'Task Updated',
          color: 'grey-9',
          textColor: 'white',
          icon: 'check'
        })
      }
      this.showModal = false
      this.$bus.$emit('setEdit', {})
    },
    async cancelUpdate () {
      this.$bus.$emit('setEdit', {})
    }
  },
  computed: {
    showModal: {
      get: function () {
        return this.showNotesModal === true
      },
      set: function (newValue) {
        // this.$bus.$emit('setEdit', { newValue })
      }
    }
  },

  mounted () {
  }

}
</script>

<style>
</style>
