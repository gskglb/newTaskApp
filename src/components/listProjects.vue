<template>
  <div class="q-pa-xs">
    <q-list v-if="groupsList.length !== 0" separator dark>
      <q-item-label header>Your Groups / Projects</q-item-label>
      <q-item clickable v-ripple v-for="(record) in groupsList" v-bind:key="record.keyRef" @click.native="projectDetail(record)">
        <q-item-section>
          <q-item-label>{{record.name}}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon color="primary" name="keyboard_arrow_right" />
        </q-item-section>
      </q-item>
    </q-list>

  </div>
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
      this.$router.push({ name: 'projectDetail', params: { project: record } })
    }
  }
}
</script>

<style>
</style>
