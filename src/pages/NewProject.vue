<template>
   <q-page padding class="bg-grey-10">
    <NewProject />
  </q-page>
</template>

<style>

</style>

<script>
import NewProject from '../components/newProject'

export default {
  name: 'PageIndex',
  components: { NewProject },

  methods: {
  },
  watch: {
  },

  data () {
    return {
    }
  },
  created () {
    this.$bus.$emit('setTitleAndSlogan', { title: 'New Project', slogan: '' })
  }

}
</script>
