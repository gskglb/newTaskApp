<template>
  <q-select filled v-model = "filter_option" :options="options"  @input="setFilter" class="q-pa-md" />
</template>

<script>
export default {
  name: 'FilterComponent',
  data () {
    return {
      filter_option: { label: 'All Open Tasks', value: '-1' },
      options: [
        { label: 'All Open Tasks', value: '-1' },
        { label: 'Urgent and Important', value: '1' },
        { label: 'Important but Not urgent', value: '2' },
        { label: 'Urgent but not important', value: '3' },
        { label: 'Neither urgent not important', value: '4' },
        { label: 'Closed Tasks', value: '5' }
      ]
    }
  },
  methods: {
    async setFilter (val) {
      this.filter_option = val
      this.$bus.$emit('setFilter', { filterValue: this.filter_option.value })
    }
  }
}
</script>

<style>
</style>
