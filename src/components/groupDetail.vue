<template>
  <div>
    <q-card dark class="bg-grey-10" color="white" flat square>
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
        // this.$store.dispatch('groupTasks/populateGroupTasks', { db: this.$db, auth: this.$auth, project: this.project })
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
