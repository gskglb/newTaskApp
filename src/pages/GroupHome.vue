<template>
  <q-page style="margin-top:0px">
    <div class="q-pa-xs">
      <JoinGroup />
    </div>
    <q-separator dark />
    <GroupsList />
  </q-page>
</template>

<script>
// import SelfTaskSummary from '../components/selfTaskSummary'
import GroupsList from '../components/listGroups'
import JoinGroup from '../components/joinGroup'
export default {
  name: 'HomePage',
  components: { GroupsList, JoinGroup },
  created () {
    this.$bus.$emit('setTitleAndSlogan', { title: 'Home', slogan: '' })
  }
}
</script>

<style>
</style>
