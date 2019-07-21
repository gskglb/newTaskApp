<template>
  <q-dialog v-model="showModal" persistent >
    <q-card dark class="q-pa-md bg-grey-9" flat square v-if="taskData !== null" style="width: 300px; max-width: 80vw;">
      <q-card-section dark>
        <div class="text-h6">Add Note</div>
        <q-input dark type="textarea" v-model="notesText"/>
      </q-card-section>
        <q-card-actions dark align="right">
          <q-btn flat label="Cancel" @click.native="cancel" v-close-popup />
          <q-btn label="Update" color="grey-10" @click.native="addNotes" v-close-popup />
        </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import _ from 'underscore'
export default {
  name: 'AddNotesModal',
  props: {
    taskData: Object,
    projectRef: String,
    showNotesModal: Boolean
  },
  data () {
    return {
      notesText: ''
    }
  },
  computed: {
    showModal: {
      get: function () {
        return this.showNotesModal === true
      },
      set: function (newValue) {
        // this.$bus.$emit('setNotesVisibility', { newValue })
      }
    }
  },
  methods: {
    async cancel () {
      this.showModal = false
      this.notesText = ''
      this.$bus.$emit('setNotesVisibility')
    },
    async addNotes () {
      if (this.taskData.notes == null) {
        this.taskData.notes = []
      }
      this.taskData.notes.push({ 'text': this.notesText, 'added': new Date() })
      let errorHappened

      if (_.isUndefined(this.projectRef)) {
        await this.$db.ref('/user-tasks/' + this.$auth.currentUser.uid + '/' + this.taskData.keyRef).update(this.taskData, function (error) {
          errorHappened = error
        })
      } else {
        console.log('adding notes to group data')
        await this.$db.ref('/projects/' + this.projectRef + '/tasks/' + this.taskData.keyRef).update(this.taskData, function (error) {
          errorHappened = error
        })
      }
      if (errorHappened) {
        this.$q.notify({
          message: 'Error occured',
          type: 'negative'
        })
      } else {
        this.$q.notify({
          message: 'Notes Updated',
          color: 'grey-10',
          textColor: 'white',
          icon: 'check'
        })
      }
      this.showModal = false
      this.notesText = ''
      this.$bus.$emit('setNotesVisibility')
    }
  }
}
</script>

<style>
</style>
