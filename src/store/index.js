import Vue from 'vue'
import Vuex from 'vuex'

import tasks from './tasks'
import groupTasks from './groupTasks'
import user from './user'
import projects from './projects'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      tasks,
      groupTasks,
      user,
      projects
    }
  })

  return Store
}
