<template>
      <!-- <q-list>
        <q-item-label header>Groups</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
      </q-list> -->
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label>
            <div class="text-subtitle2">
            Quick Menu
            </div>
          </q-item-label>
        </q-item-section>
        <!-- <q-item-section side>
          <q-icon color="grey-9" name="keyboard_arrow_right" />
        </q-item-section> -->
      </q-item>

      <q-item clickable v-ripple @click.native="$router.push('home')">
        <q-item-section>
          <q-item-label>Home</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon color="grey-9" name="keyboard_arrow_right" />
        </q-item-section>
      </q-item>
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
      this.$router.push({ name: 'projectDetail', params: { project: record } })
    },
    async newGroup () {
      this.$router.push('newProject')
    }
  }
}
</script>

<style>
</style>
