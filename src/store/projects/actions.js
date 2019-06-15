export function projectAdded ({ commit }, newProject) {
  commit('projectAdded', newProject)
}

export function projectDeleted ({ commit }, project) {
  commit('projectDeleted', project)
}

export function projectChanged ({ commit }, project) {
  commit('projectChanged', project)
}

export function flush ({ commit }) {
  return new Promise((resolve, reject) => {
    commit('flush')
    resolve()
  })
}
