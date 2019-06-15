<template>
  <q-page class="bg-grey-10" style="margin-top:0px">
  <q-fab
    class="fixed"
    style="right: 18px; bottom: 18px"
    color="primary"
    direction="up"
    icon="add">
      <q-fab-action
        color="primary"
        icon="playlist_add"
        @click.native="addTask"
      />
      <q-fab-action
        color="primary"
        icon="group_add"
        @click.native="addProject"
      />
    </q-fab>
    <SelfTaskSummary />
    <q-separator dark />
  </q-page>
</template>

<script>
import SelfTaskSummary from '../components/selfTaskSummary'

export default {
  name: 'HomePage',
  components: { SelfTaskSummary },
  methods: {
    async addTask () {
      this.$router.push('new')
    },
    async addProject () {
      this.$router.push('newProject')
    }
  },
  created () {
    this.$bus.$emit('setTitleAndSlogan', { title: 'Home', slogan: '' })
  }
}
</script>

<style>
</style>
