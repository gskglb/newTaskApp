<template>
  <div>
    <div v-if="tasksList.length == 0" class="fixed-center text-white">
        <div class="text-h6">Relax, nothing here</div>
    </div>
    <q-banner v-if="tasksList.length !== 0" inline-actions class="text-white bg-grey-9 q-mb-xs">
      Tap on the task for details.
    </q-banner>
    <q-list v-if="tasksList.length !== 0" bordered separator dark>
      <q-item clickable v-ripple v-for="(record) in tasksList" v-bind:key="record.keyRef" @click.native="taskDetail(record)">
        <q-item-section>
          <q-item-label overline>{{record.start_date_time | formatDate}}</q-item-label>
          <q-item-label>{{record.title | limitTitle}}</q-item-label>
          <q-item-label caption>{{record.summary | limitSummary}}</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-item-label caption>{{record.percentage_completion}} %</q-item-label>
        </q-item-section>
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
      tasksList = _.sortBy(tasksList, 'start_date_time')
      return tasksList
    },
    completedTasksList: function () {
      return this.$store.getters['tasks/completedTasksList']
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
    }
  },
  methods: {
    taskDetail (record) {
      this.$router.push({ name: 'taskDetail', params: { task: record } })
    }
  }

}
</script>
<style>
</style>
