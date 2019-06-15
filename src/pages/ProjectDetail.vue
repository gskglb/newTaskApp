<template>
  <q-page class="bg-grey-10" style="margin-top:0px">
    <ProjectDetail v-bind:project="project" />
  </q-page>
</template>

<script>
import ProjectDetail from '../components/projectDetail'

export default {
  name: 'TaskDetailPage',
  components: { ProjectDetail },
  data () {
    return {
      project: this.$route.params.project
    }
  },
  created () {
    this.$bus.$emit('setTitleAndSlogan', { title: this.$route.params.project.name, slogan: '' })
  }
}
</script>

<style>
</style>
