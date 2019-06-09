<template>
  <q-dialog v-model="showModal">
    <q-card flat square v-if="taskData !== null">
      <q-card-section>
        <div class="text-h6">Add Note</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-input type="textarea" v-model="notesText" no-border/>
      </q-card-section>
      <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="Cancel" @click.native="cancel" v-close-popup />
          <q-btn flat label="Update" color="primary" @click.native="addNotes" v-close-popup />
        </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'AddNotesModal',
  props: {
    taskData: Object,
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
        console.log(this.showNotesModal)
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
      await this.$db.ref('/user-tasks/' + this.$auth.currentUser.uid + '/' + this.taskData.keyRef).update(this.taskData, function (error) {
        errorHappened = error
      })
      if (errorHappened) {
        this.$q.notify({
          message: 'Error occured',
          type: 'negative'
        })
      } else {
        this.$q.notify({
          message: 'Notes Updated',
          color: 'primary',
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
