// import something here

// "async" is optional
export default async ({ app, router, Vue }) => {
  Vue.prototype.$auth.onAuthStateChanged(function (user) {
    if (user) {
      router.push('home')
    } else {
    }
  })
}
