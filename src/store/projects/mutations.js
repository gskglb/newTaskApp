export function projectAdded (state, project) {
  let index = state.projectsList.findIndex(element => element.keyRef === project.key)
  if (index < 0) {
    state.projectsList.push(project.val())
  }
}

export function projectDeleted (state, project) {
  let index = state.projectsList.findIndex(element => element.keyRef === project.key)
  state.projectsList.splice(index, 1)
}

export function projectChanged (state, project) {
  let index = state.projectsList.findIndex(element => element.keyRef === project.key)
  if (project.val().completed !== true) {
    state.projectsList.splice(index, 1, project.val())
  } else {
    state.projectsList.splice(index, 1)
    state.completedprojectsList.push(project.val())
    console.log('project has become completed')
  }
}

export function firstAssign (state, projectList) {
  state.projectsList = projectList
}

export function flush (state) {
  state.projectsList = []
}
