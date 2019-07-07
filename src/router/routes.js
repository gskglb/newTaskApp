
const routes = [
  {
    path: '/login',
    component: () => import('layouts/NoLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/signUp',
    component: () => import('layouts/NoLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SignUp.vue') }
    ]
  },
  {
    path: '/profile',
    component: () => import('layouts/NoLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '', component: () => import('pages/Profile.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: 'newProject', component: () => import('pages/NewProject.vue') },
      { path: 'new', component: () => import('pages/NewTask.vue') },
      { path: 'newGroupTask', component: () => import('pages/NewGroupTask.vue') },
      { path: 'home', name: 'home', component: () => import('pages/Home.vue') },
      { path: 'group_home', name: 'group_home', component: () => import('pages/GroupHome.vue') },
      { path: 'taskDetail', name: 'taskDetail', component: () => import('pages/TaskDetail') },
      { path: 'projectDetail', name: 'projectDetail', component: () => import('pages/ProjectDetail') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
