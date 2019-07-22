<template>
  <div>
    <q-card flat square>
      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label overline v-if="!isUndefined(task.start_date_time)">START &nbsp;: {{task.start_date_time | formatDate}}</q-item-label>
              <q-item-label overline v-else>
                START &nbsp;: Not set, you can set via edit
              </q-item-label>

              <q-item-label overline v-if="!isUndefined(task.end_date_time)">END &nbsp;&nbsp;&nbsp; : {{task.end_date_time | formatDate}}</q-item-label>
              <q-item-label overline v-else>
                END &nbsp;&nbsp;&nbsp; : Not set, you can set via edit
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
     <q-card-section class="q-pa-sm">
        <div class="text-justify">
          {{task.title}}
        </div>
      </q-card-section>
      <q-card-section class="q-pa-sm" >
        <div class="text-justify">{{task.summary}} </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-sm" >
          <q-btn-group spread>
            <q-btn no-caps label="Edit" color="grey-9" text-color="white"  @click.native="editTaskFn"/>
            <q-btn no-caps label="Add Notes" color="grey-9"  @click.native="addNotesFn"/>
            <q-btn no-caps label="Delete" color="grey-9" text-color="white" @click.native="deleteTask"/>
          </q-btn-group>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-sm" v-show="task.notes" >
        <!-- <q-expansion-item expand-separator label="Notes" > -->
          <!-- <q-scroll-area style="height: 100vh;"> -->
            <q-timeline responsive color="secondary">
              <q-timeline-entry v-for="singleNote in sortedNotesList"  v-bind:key="singleNote.added"
                v-bind:subtitle="singleNote.added | formatDate">
                <div>
                  {{singleNote.text}}
                </div>
              </q-timeline-entry>
            </q-timeline>
          <!-- </q-scroll-area> -->
        <!-- </q-expansion-item> -->
      </q-card-section>
    </q-card>
    <q-dialog v-model="deleteConfirm" persistent>
      <q-card  class="q-pa-md" flat square style="width: 300px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <q-avatar size="30px" icon="block" />
          <span class="q-ml-sm">Are you Sure ?</span>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat no-caps label="Cancel" v-close-popup />
          <q-btn no-caps color="red" label="Delete" @click="deleteTaskFn" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <UpdateTask v-bind:taskData="task" v-bind:projectRef="projectRef" v-bind:showNotesModal="editTask" />
    <AddNotesModal v-bind:taskData="task" v-bind:projectRef="projectRef" v-bind:showNotesModal="showNotes"/>
  </div>
</template>

<script>
import { date } from 'quasar'
import _ from 'underscore'
import UpdateTask from '../components/updateTask'
import AddNotesModal from '../components/addNotesModal'

export default {
  name: 'TaskDetail',
  props: {
    task: Object,
    projectRef: String
  },
  components: { UpdateTask, AddNotesModal },
  computed: {
    sortedNotesList: function () {
      return _.sortBy(this.task.notes, 'added').reverse()
    }
  },
  data () {
    return {
      deleteConfirm: false,
      showNotes: false,
      editTask: false,
      recordToManupulate: null
    }
  },
  filters: {
    formatDate: function (dateString) {
      if (_.isUndefined(dateString)) {
        return 'not set'
      } else {
        return date.formatDate(dateString, 'DD-MMM-YY @ h:mm A')
      }
    },
    limitText: function (input) {
      if (input.length < 30) {
        return input
      } else {
        return input.substring(0, 30) + ' ...'
      }
    }

  },
  methods: {
    isUndefined (data) {
      return _.isUndefined(data)
    },
    async deleteTask () {
      this.deleteConfirm = true
    },
    async deleteTaskFn () {
      let keyRef = this.task.keyRef
      if (_.isUndefined(this.projectRef)) {
        console.log('user task delete ')
        this.$db.ref('/user-tasks/' + this.$auth.currentUser.uid + '/' + keyRef).remove()
        this.$store.dispatch('tasks/taskDeleted', this.task)
      } else {
        console.log('Group delete task')
        this.$db.ref('/projects/' + this.projectRef + '/tasks/' + keyRef).remove()
        this.$store.dispatch('groupTasks/taskDeleted', this.task)
      }
      this.$q.notify({
        message: 'Task Deleted',
        color: 'grey-9',
        textColor: 'white',
        icon: 'check'
      })
      this.$router.push('home')
    },
    async editTaskFn () {
      this.editTask = true
    },
    async setEdit () {
      this.editTask = false
    },
    async addNotesFn () {
      this.showNotes = true
    },
    async setNotesVisibilityValue () {
      this.showNotes = false
    }
  },
  created () {
    this.$bus.$on('setNotesVisibility', this.setNotesVisibilityValue)
    this.$bus.$on('setEdit', this.setEdit)
    this.$bus.$emit('setTitleAndSlogan', { title: this.task.title, slogan: '' })
  },
  beforeDestroy () {
    this.$bus.$off('setNotesVisibility', this.setNotesVisibilityValue)
    this.$bus.$off('setEdit', this.setEdit)
  }
}

</script>

<style>
</style>
