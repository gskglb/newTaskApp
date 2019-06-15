import Vue from 'vue'
import Vuex from 'vuex'

import tasks from './tasks'
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
      user,
      projects
    }
  })

  return Store
}
