<template>
  <div>
    <q-card dark class="bg-grey-10" text-color="white" flat square>
      <q-list dark bordered>
      <q-bar class="bg-grey-10 text-white">
        <div>
          Your Tasks
        </div>
        <q-space />
        <q-btn no-caps flat color="primary" label="Create New Task" @click="newTask" />
      </q-bar>
        <q-item to="/list">
        <!-- <q-item-section avatar>
          <q-icon color="primary" name="alarm" />
        </q-item-section> -->
        <q-item-section> Open tasks</q-item-section>
        <q-item-section side>
          <q-item-label caption>
            <q-avatar dark size="20px" color="primary" text-color="white">{{openTasksCount}}</q-avatar>
            <q-icon color="primary" name="keyboard_arrow_right" />
          </q-item-label>
        </q-item-section>
        </q-item>
        <q-item to="/done">
        <!-- <q-item-section avatar>
          <q-icon color="primary" name="check" />
        </q-item-section> -->
          <q-item-section>Completed tasks</q-item-section>
        <q-item-section side>
          <q-item-label caption>
            <q-avatar dark size="20px" color="primary" text-color="white">{{completedTasksCount}}</q-avatar>
            <q-icon color="primary" name="keyboard_arrow_right" />
          </q-item-label>
        </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'SelfTaskSummary',
  data () {
    return {}
  },
  computed: {
    openTasksCount: function () {
      return this.$store.getters['tasks/tasksList'].length
    },
    completedTasksCount: function () {
      return this.$store.getters['tasks/completedTasksList'].length
    }
  },
  methods: {
    async newTask () {
      this.$router.push('new')
    }
  }
}
</script>

<style>
</style>
