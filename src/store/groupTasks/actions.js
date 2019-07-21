export function taskAdded ({ commit }, newTask) {
  commit('taskAdded', newTask)
}

export function taskDeleted ({ commit }, task) {
  commit('taskDeleted', task)
}

export function taskChanged ({ commit }, task) {
  commit('taskChanged', task)
}

export function flush ({ commit }) {
  return new Promise((resolve, reject) => {
    commit('flush')
    resolve()
  })
}

export function populateGroupTasks ({ dispatch, commit }, payload) {
  console.log('Fetching tasks for %o', payload.projectRef)
  dispatch('flush')
  return new Promise((resolve, reject) => {
    // fetch tasks from backend .. in this case firebase
    payload.db.ref('/projects/' + payload.projectRef + '/tasks/').once('value').then(function (snapshot) {
      if (snapshot.val() !== null) {
        let tasks = snapshot
        tasks.forEach(element => {
          dispatch('taskAdded', element.val())
        })
      }
    })
    resolve()
  })
}
