<template>
  <q-page class="bg-grey-10" style="margin-top:0px">
    <q-card dark class="bg-grey-10" text-color="white" flat square>
      <q-card-section>
        <div class="text-h6">Filters</div>
      </q-card-section>
      <q-card-section>
        <q-select dark filled
            v-model = "filter_option"
            :options="options"
            options-cover
            @input="setFilter"
        />
      </q-card-section>
    </q-card>
    <div v-if="tasksList.length == 0" class="fixed-center text-white">
        <div class="text-h6">Relax, nothing here</div>
    </div>
      <q-card dark bordered class="bg-grey-9 my-card q-ma-sm" v-for="(record) in tasksList" v-bind:key="record.keyRef">
          <q-card-section class="q-pa-sm">
            <q-chip outline dense square text-color="white" >{{record.start_date_time  | formatDate}}</q-chip>
            <span v-show="record.end_date_time">
              - <q-chip dense  outline square text-color="white" >{{record.end_date_time   | formatDate}} </q-chip>
            </span>
            <q-chip outline dense square text-color="white" >
              {{record.percentage_completion}}%
            </q-chip>
            <q-btn square flat size="md" class= "float-right" icon="delete_outline" @click.native="deleteTask(record.keyRef)">
            </q-btn>
          </q-card-section>
          <q-card-section  class="q-pa-sm">
            <div class="text-body-1">
              {{record.title | limitText}}
            </div>
          </q-card-section>
        <q-card-section class="q-pa-sm" >
          <div class="text-body-1">{{record.summary}} </div>
          <div class="row justify-center q-mt-md">
            <q-btn-group outline>
              <q-btn flat no-caps label="Edit"  color="brown" text-color="white" @click.native="editTaskFn(record)"/>
              <q-btn flat no-caps label="Complete"  color="brown" text-color="white" @click.native="completeTask(record)"/>
              <q-btn flat no-caps label="+ Notes"  color="brown" text-color="white" @click.native="addNotesFn(record)"/>
              <q-btn flat no-caps    label="Delegate"  color="brown" text-color="white"/>
            </q-btn-group>
          </div>
          <span v-show="record.notes">
          <q-expansion-item
            expand-separator
            label="Notes"
            >
            <q-scroll-area style="height: 200px;">
              <q-timeline responsive dark color="secondary">
                <q-timeline-entry v-for="singleNote in record.notes"  v-bind:key="singleNote.added"
                  v-bind:subtitle="singleNote.added | formatDate"
                >
                  <div>
                    {{singleNote.text}}
                  </div>
                </q-timeline-entry>
              </q-timeline>
            </q-scroll-area>
          </q-expansion-item>
          </span>
        </q-card-section>
      </q-card>
    <UpdateTask v-bind:taskData="recordToManupulate" v-bind:showNotesModal="editTask" />
    <AddNotesModal v-bind:taskData="recordToManupulate"  v-bind:showNotesModal="showNotes"/>
    <q-dialog v-model="deleteConfirm" persistent>
      <q-card class="q-pa-md" text-color="white" flat square style="width: 300px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <q-avatar size="30px" icon="block" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you Sure ?</span>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat no-caps color="primary" label="Cancel" v-close-popup />
          <q-btn flat no-caps color="primary" label="Delete" @click="deleteTaskFn" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style>
</style>

<script>
import { date } from 'quasar'
import _ from 'underscore'
import UpdateTask from '../components/updateTask'
import AddNotesModal from '../components/addNotesModal'

export default {
  name: 'PageIndex',
  components: { UpdateTask, AddNotesModal },

  data () {
    return {
      deleteConfirm: false,
      filter_start_date_time: '-1',
      filter_priority: '-1',
      filter_selected_priority: 'All',
      filter_option: { label: 'Urgent and Important - Do it now', value: '1' },
      showNotes: false,
      editTask: false,
      recordToManupulate: null,
      options: [
        { label: 'All Open Tasks', value: '-1' },
        { label: 'Urgent and Important - Do it now', value: '1' },
        { label: 'Important but Not urgent - Do it later', value: '2' },
        { label: 'Urgent but not important - Delegate', value: '3' },
        { label: 'Neither urgent not important - Drop', value: '4' }
      ]
    }
  },

  methods: {
    async completeTask (record) {
      record.completed = true
      record.percentage_completion = 100
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
          message: 'Hurray... ',
          color: 'blue-grey-14',
          textColor: 'white',
          icon: 'check'
        })
      }
    },
    async deleteTask (record) {
      this.deleteConfirm = true
      this.recordToManupulate = record
    },
    async deleteTaskFn () {
      let keyRef = this.recordToManupulate.keyRef
      this.$db.ref('/user-tasks/' + this.$auth.currentUser.uid + '/' + keyRef).remove()
    },

    async editTaskFn (record) {
      this.recordToManupulate = record
      this.editTask = true
    },
    async addNotesFn (record) {
      this.recordToManupulate = record
      this.showNotes = true
    },
    async setFilterDate (val) {
      this.filter_start_date_time = val
    },
    async setFilter (val) {
      this.filter_option = val
    },
    async clearFilters () {
      this.filter_start_date_time = '-1'
      this.filter_priority = '-1'
    },
    async defaultFilters () {
      this.filter_start_date_time = Date.now()
    },
    async setNotesVisibilityValue () {
      this.showNotes = false
    },
    async setEdit (newValue) {
      console.log('me called why')
      this.editTask = false
    }
  },
  watch: {
  },

  computed: {
    tasksList: function () {
      let tasksList = this.$store.getters['tasks/tasksList']
      if (this.filter_option.value === '1') {
        tasksList = _.filter(tasksList, (element) => {
          return element.urgent === true && element.important === true
        })
      } else if (this.filter_option.value === '2') {
        tasksList = _.filter(tasksList, (element) => {
          return element.urgent === false && element.important === true
        })
      } else if (this.filter_option.value === '3') {
        tasksList = _.filter(tasksList, (element) => {
          return element.urgent === true && element.important === false
        })
      } else if (this.filter_option.value === '4') {
        tasksList = _.filter(tasksList, (element) => {
          return element.urgent === false && element.important === false
        })
      } else if (this.filter_option.value === '0') {
        tasksList = _.filter(tasksList, (element) => {
          return element.completed === true
        })
      }
      // if (this.filter_start_date_time !== '-1') {
      //   tasksList = _.filter(tasksList, (element) => {
      //     return date.formatDate(element.start_date_time, 'DDMMYYYY') === date.formatDate(this.filter_start_date_time, 'DDMMYYYY')
      //   })
      // }
      tasksList = _.sortBy(tasksList, 'start_date_time')
      return tasksList
    },
    completedTasksList: function () {
      return this.$store.getters['tasks/completedTasksList']
    },
    filterDateKey: function () {
      return date.formatDate(this.filter_start_date_time, 'DD-MM-YYYY')
    },
    sortedNotes: function (notes) {
      return _.sortBy(notes, 'added')
    }
  },

  filters: {
    formatDate: function (dateString) {
      if (dateString !== null || dateString !== 'undefined') {
        return date.formatDate(dateString, 'DD-MMM-YY : h:mm A')
      } else {
        return 'Not Defined'
      }
    },

    limitText: function (input) {
      if (input.length < 30) {
        return input
      } else {
        return input.substring(0, 30) + ' ...'
      }
    },

    delayCheck: function (startDateTime) {
      let timeStamp = Date.now()
      let taskDate = new Date(startDateTime)
      let diff = date.getDateDiff(timeStamp, taskDate, 'seconds')
      if (diff > 0) {
        return true
      } else {
        return false
      }
    }
  },

  created () {
    this.$bus.$on('setNotesVisibility', this.setNotesVisibilityValue)
    this.$bus.$on('setEdit', this.setEdit)
    this.$bus.$emit('setTitleAndSlogan', { title: 'Tasks', slogan: '' })
  }

}
</script>
