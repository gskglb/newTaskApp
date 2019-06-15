<template>
  <div>
    <q-card dark class="bg-grey-10" text-color="white" flat square>
     <q-card-section class="q-pa-sm">
    <q-banner dense rounded inline-actions class="text-white bg-red">
      <div class="text-h6 absolute-center">
        PC : {{project.participantCode}}
      </div>
    </q-banner>
      </q-card-section>
     <q-card-section class="q-pa-sm">
        <div class="text-h6 text-justify">
          {{project.name}}
        </div>
      </q-card-section>
      <q-card-section class="q-pa-sm" >
        <div class="text-body1 text-justify">{{project.description}} </div>
      </q-card-section>
      <q-separator dark />
    </q-card>

    <q-fab class="fixed" style="right: 18px; bottom: 18px" color="primary" direction="up" icon="add">
        <q-fab-action color="primary" icon="playlist_add" @click.native="addGroupTask" />
        <q-fab-action color="primary" icon="group_add" @click.native="addGroupMember" />
    </q-fab>

  </div>
</template>

<script>
export default {
  name: 'ProjectDetail',
  props: {
    project: Object
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
  },
  created () {
    this.$bus.$emit('setTitleAndSlogan', { title: this.project.name, slogan: '' })
  },
  beforeDestroy () {
  }
}

</script>

<style>
</style>
