<template>
  <div>
    <q-card flat square>
     <q-card-section class="q-pa-sm">
     <div class="h6">
        Participant Code : {{this.project.participantCode}}
      </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'GroupDetail',
  props: {
    project: Object
  },
  watch: {
    $props: {
      handler (newVal, oldVal) {
        console.log(newVal)
        // this.$store.dispatch('groupTasks/populateGroupTasks', { db: this.$db, auth: this.$auth, projectRef: this.project.keyRef })
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
    }
  },
  filters: {
  },
  methods: {
    async addGroupTask () {
      this.$router.push('newGroupTask')
    }
  }
}

</script>

<style>
</style>
