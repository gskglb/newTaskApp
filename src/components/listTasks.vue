<template>
  <div>
    <div v-if="tasksList.length == 0" class="fixed-center text-white">
        <div class="text-h6">Relax, nothing here</div>
    </div>
    <!-- <q-banner v-if="tasksList.length !== 0" inline-actions class="text-white bg-grey-9 q-mb-xs">
      Tap on the task for details.
    </q-banner> -->
    <q-list v-if="tasksList.length !== 0"  dark>
      <q-item class="q-mb-xs" color="grey-9" clickable  v-ripple v-for="(record) in tasksList" v-bind:key="record.keyRef" @click.native="taskDetail(record)">
        <q-item-section avatar>
          <q-checkbox v-model=record.completed dark dense class="q-pa-xs" @input="checkUncheck(record)"/>
        </q-item-section>
        <q-item-section>
          <!-- <q-item-label overline>{{record.start_date_time | formatDate}}</q-item-label> -->
          <q-item-label v-if="!record.completed">{{record.title | limitTitle}}</q-item-label>
          <div v-else style="text-decoration: line-through">{{record.title | limitTitle}}</div>
        </q-item-section>
        <q-item-section side>
          <q-item-label>{{record | urgetImpIndicator}}</q-item-label>
        </q-item-section>
      <q-separator spaced dark />
      </q-item>
    </q-list>
  </div>
</template>

<script>
import _ from 'underscore'
import { date } from 'quasar'
export default {
  name: 'ListTasks',
  props: {
    filter_option: Object,
    includeClosed: Boolean,
    projectRef: String
  },
  data () {
    return {}
  },
  computed: {
    tasksList: function () {
      let tasksList = this.$store.getters['tasks/tasksList']
      let closedTaskList = this.$store.getters['tasks/completedTasksList']
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
      } else if (this.filter_option.value === '5') {
        tasksList = _.filter(closedTaskList, (element) => {
          return element.completed === true
        })
      }
      tasksList = _.sortBy(tasksList, 'start_date_time')
      return tasksList
    }
    // completedTasksList: function () {
    //   return this.$store.getters['tasks/completedTasksList']
    // }
  },
  filters: {
    formatDate: function (dateString) {
      if (dateString !== null || dateString !== 'undefined') {
        return date.formatDate(dateString, 'DD-MMM-YY : h:mm A')
      } else {
        return 'Not Defined'
      }
    },
    limitTitle: function (input) {
      if (input.length < 30) {
        return input
      } else {
        return input.substring(0, 30) + ' ...'
      }
    },
    limitSummary: function (input) {
      if (input.length < 100) {
        return input
      } else {
        return input.substring(0, 100) + ' ...'
      }
    },
    urgetImpIndicator: function (record) {
      let indicator = ''
      if (record.urgent) {
        indicator = indicator.concat('Urgent ')
      }
      if (record.important) {
        indicator = indicator.concat('Imp')
      }
      return indicator
    }
  },
  methods: {
    taskDetail (record) {
      this.$router.push({ name: 'taskDetail', params: { task: record } })
    },
    async checkUncheck (record) {
      console.log(record.completed)
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
          color: 'grey-9',
          textColor: 'white',
          icon: 'check'
        })
      }
    }
  }

}
</script>
<style>
</style>
