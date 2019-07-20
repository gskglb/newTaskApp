export function taskAdded (state, task) {
  let index = state.tasksList.findIndex(element => element.keyRef === task.keyRef)
  if (index >= 0) {
    state.tasksList.splice(index, 1)
  }
  let cindex = state.completedTasksList.findIndex(element => element.keyRef === task.keyRef)
  if (cindex >= 0) {
    state.completedTasksList.splice(cindex, 1)
  }
  if (task.completed !== true) {
    state.tasksList.push(task)
  } else {
    state.completedTasksList.push(task)
  }
}

export function taskDeleted (state, task) {
  let index = state.tasksList.findIndex(element => element.keyRef === task.keyRef)
  if (index >= 0) {
    state.tasksList.splice(index, 1)
  }
  let cindex = state.completedTasksList.findIndex(element => element.keyRef === task.keyRef)
  if (cindex >= 0) {
    state.completedTasksList.splice(cindex, 1)
  }
}

export function taskChanged (state, task) {
  // let index = state.tasksList.findIndex(element => element.keyRef === task.key)
  // if (task.val().completed !== true) {
  //   state.tasksList.splice(index, 1, task.val())
  // } else {
  //   state.tasksList.splice(index, 1)
  //   state.completedTasksList.push(task.val())
  // }
}

export function firstAssign (state, taskList) {
  state.tasksList = taskList
}

export function flush (state) {
  state.tasksList = []
  state.completedTasksList = []
}
