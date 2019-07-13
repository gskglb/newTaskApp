<template>
  <q-page class="bg-grey-10" style="margin-top:0px">
    <AddTask v-bind:project="project" />
    <ProjectDetail v-bind:project="project" />
  </q-page>
</template>

<script>
import ProjectDetail from '../components/projectDetail'
import AddTask from '../components/addTask'
export default {
  name: 'ProjectDetailPage',
  components: { ProjectDetail, AddTask },

  data () {
    return {
      id: this.$route.params.id,
      project: this.$route.params.project
    }
  },
  created () {
    this.$bus.$emit('setTitleAndSlogan', { title: this.project.name, slogan: '' })
  }
}
</script>

<style>
</style>
