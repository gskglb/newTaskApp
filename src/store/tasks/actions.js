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

export function populateUserTasks ({ dispatch, commit }, payLoad) {
  return new Promise((resolve, reject) => {
    // fetch tasks from backend .. in this case firebase
    payLoad.db.ref('/user-tasks/' + payLoad.auth.currentUser.uid + '/').once('value').then(function (snapshot) {
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
