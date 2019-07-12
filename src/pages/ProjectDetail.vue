<template>
  <q-page class="bg-grey-10" style="margin-top:0px">
    <ProjectDetail v-bind:project="project" />
  </q-page>
</template>

<script>
import ProjectDetail from '../components/projectDetail'

export default {
  name: 'ProjectDetailPage',
  components: { ProjectDetail },

  data () {
    return {
      id: this.$route.params.id,
      project: this.$route.params.project
    }
  },
  created () {
    console.log(this.project)
    this.$bus.$emit('setTitleAndSlogan', { title: this.project.name, slogan: '' })
  }
}
</script>

<style>
</style>
