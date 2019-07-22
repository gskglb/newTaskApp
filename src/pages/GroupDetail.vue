<template>
  <q-page style="margin-top:0px">
    <AddTask v-bind:project="project" />
    <GroupDetail v-bind:project="project" />
    <ListTasks v-bind:projectRef="this.project.keyRef"/>
  </q-page>
</template>

<script>
import GroupDetail from '../components/groupDetail'
import ListTasks from '../components/listTasks'
import AddTask from '../components/addTask'
export default {
  name: 'GroupTaskDetail',
  components: { GroupDetail, ListTasks, AddTask },

  data () {
    return {
      id: this.$route.params.id,
      project: this.$route.params.project
    }
  },
  created () {
    this.$bus.$emit('setTitleAndSlogan', { title: this.project.name, slogan: '' })
    this.$store.dispatch('groupTasks/populateGroupTasks', { db: this.$db, auth: this.$auth, projectRef: this.project.keyRef })
  }
}
</script>

<style>
</style>
