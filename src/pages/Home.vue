<template>
  <q-page class="bg-grey-10" style="margin-top:0px">
    <q-card dark class="bg-grey-10" text-color="white" flat square>
      <q-card-section>
        <q-bar class="bg-grey-10 text-white">
          <div class="text-h6">Filters</div>
          <q-space />
          <q-btn no-caps color="grey-9" label="New Task" @click="$router.push('new')" />
        </q-bar>
      </q-card-section>
      <q-card-section>
        <q-select dark
            v-model = "filter_option"
            :options="options"
            @input="setFilter"
        />
      </q-card-section>
    </q-card>
    <ListTasks v-bind:filter_option="filter_option" />
  </q-page>
</template>

<style>
</style>

<script>
import ListTasks from '../components/listTasks'

export default {
  name: 'PageIndex',
  components: { ListTasks },

  data () {
    return {
      filter_start_date_time: '-1',
      filter_priority: '-1',
      filter_selected_priority: 'All',
      filter_option: { label: 'Urgent and Important - Do it now', value: '1' },
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
