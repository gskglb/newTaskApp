<template>
  <q-page class="bg-grey-10" style="margin-top:0px">
    <AddTask />
    <FilterComponent />
    <ListTasks v-bind:filter_option="filter_option" />
  </q-page>
</template>

<style>
</style>

<script>
import ListTasks from '../components/listTasks'
import AddTask from '../components/addTask'
import FilterComponent from '../components/filter'

export default {
  name: 'HomePage',
  components: { ListTasks, AddTask, FilterComponent },

  data () {
    return {
      filter_option: '-1'
    }
  },

  methods: {
    setFilter: function (payload) {
      this.filter_option = payload.filterValue
    }
  },

  beforeMount () {
    this.$bus.$on('setFilter', this.setFilter)
    this.$store.dispatch('tasks/populateUserTasks', { db: this.$db, auth: this.$auth })
  },

  created () {
    this.$bus.$emit('setTitleAndSlogan', { title: 'Your tasks', slogan: '' })
  }
}
</script>
