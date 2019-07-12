<template>
    <q-list>
      <div class="row">
        <div class="col-4">
          <q-item-label header>Groups</q-item-label>
        </div>
        <div class="col-8  q-pa-sm">
          <q-btn no-caps outline size="sm" class="float-right  q-pa-xs" color="grey-9" label="New Group" @click="newGroup" />
        </div>
      </div>
      <q-item clickable v-ripple v-for="(record) in groupsList" v-bind:key="record.keyRef" @click.native="projectDetail(record)">
        <q-item-section>
          <q-item-label>{{record.name}}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon color="grey-9" name="keyboard_arrow_right" />
        </q-item-section>
      </q-item>
    </q-list>
</template>

<script>
export default {
  name: 'GroupsList',
  data () {
    return {}
  },
  computed: {
    groupsList: function () {
      return this.$store.getters['projects/projectsList']
    }
  },
  methods: {
    projectDetail (record) {
      console.log('router push called %o', record)
      // this.$router.push({ path: `/projectDetail/${record.participantCode}`, params: { project: record } })
      this.$router.push({ name: 'projectDetail', params: { id: record.participantCode, project: record } })
    },
    async newGroup () {
      this.$router.push('newProject')
    }
  }
}
</script>

<style>
</style>
