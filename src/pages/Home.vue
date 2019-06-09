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
      />
    </q-fab>
    <q-card dark class="bg-grey-10" text-color="white" flat square>
      <q-list dark bordered>
        <q-item-label header>Your Tasks</q-item-label>
        <q-item to="/list">
        <q-item-section avatar>
          <q-icon color="primary" name="alarm" />
        </q-item-section>
        <q-item-section>Open</q-item-section>
        <q-item-section side>
          <q-item-label caption>
            <q-chip dense>
              <q-avatar dark size="20px" color="primary" text-color="white">{{openTasksCount}}</q-avatar>
              Task(s)
            </q-chip>
          </q-item-label>
        </q-item-section>
        </q-item>
        <q-item to="/done">
        <q-item-section avatar>
          <q-icon color="primary" name="check" />
        </q-item-section>
          <q-item-section>Completed</q-item-section>
        <q-item-section side>
          <q-item-label caption>
            <q-chip dense>
              <q-avatar dark size="20px" color="primary" text-color="white">{{completedTasksCount}}</q-avatar>
              Task(s)
            </q-chip>
          </q-item-label>
        </q-item-section>
        </q-item>
      </q-list>
    </q-card>
    <q-separator dark />
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  computed: {
    openTasksCount: function () {
      return this.$store.getters['tasks/tasksList'].length
    },
    completedTasksCount: function () {
      return this.$store.getters['tasks/completedTasksList'].length
    }

  },
  methods: {
    async addTask () {
      this.$router.push('new')
    }
  },
  created () {
    this.$bus.$emit('setTitleAndSlogan', { title: 'Home', slogan: '' })
  }
}
</script>

<style>
</style>
