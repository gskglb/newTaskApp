<template>
   <q-page padding>
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
    this.$bus.$emit('setTitleAndSlogan', { title: 'New Group', slogan: '' })
  }

}
</script>
