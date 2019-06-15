<template>
  <q-page class="bg-grey-10" style="margin-top:0px">
    <TaskDetail v-bind:task="task" />
  </q-page>
</template>

<script>
import TaskDetail from '../components/taskDetail'

export default {
  name: 'TaskDetailPage',
  components: { TaskDetail },
  data () {
    return {
      task: this.$route.params.task
    }
  },
  created () {
    this.$bus.$emit('setTitleAndSlogan', { title: this.$route.params.task.title, slogan: '' })
  }
}
</script>

<style>
</style>
