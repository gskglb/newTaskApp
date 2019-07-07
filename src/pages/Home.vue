<template>
  <q-page class="bg-grey-10" style="margin-top:0px">
    <q-card dark class="bg-grey-10" text-color="white" flat square>
      <q-card-section>
        <AddTask />
      </q-card-section>
    </q-card>
    <q-card dark class="bg-grey-10" text-color="white" flat square>
      <q-card-section>
        <!-- <q-bar class="bg-grey-10 text-white"> -->
        <q-select dark v-model = "filter_option" :options="options"  @input="setFilter"  />
          <!-- <q-space />
          <q-btn no-caps color="grey-9" label="New" @click="$router.push('new')" /> -->
        <!-- </q-bar> -->
      </q-card-section>
      <q-card-section>
      </q-card-section>
    </q-card>
    <ListTasks v-bind:filter_option="filter_option" />
  </q-page>
</template>

<style>
</style>

<script>
import ListTasks from '../components/listTasks'
import AddTask from '../components/addTask'
export default {
  name: 'PageIndex',
  components: { ListTasks, AddTask },

  data () {
    return {
      filter_start_date_time: '-1',
      filter_priority: '-1',
      filter_selected_priority: 'All',
      filter_option: { label: 'All Open Tasks', value: '-1' },
      options: [
        { label: 'All Open Tasks', value: '-1' },
        { label: 'Urgent and Important', value: '1' },
        { label: 'Important but Not urgent', value: '2' },
        { label: 'Urgent but not important', value: '3' },
        { label: 'Neither urgent not important', value: '4' }
      ]
    }
  },

  methods: {
    async setFilter (val) {
      this.filter_option = val
    }
  },
  watch: {
  },

  computed: {
  },

  filters: {
  },

  created () {
    this.$bus.$emit('setTitleAndSlogan', { title: 'Tasks', slogan: '' })
  }
}
</script>
