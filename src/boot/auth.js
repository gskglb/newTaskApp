// import something here

// "async" is optional
export default async ({ app, router, Vue }) => {
  Vue.prototype.$auth.onAuthStateChanged(function (user) {
    if (user) {
      console.log(user.email)
      router.push('home')
    } else {
      console.log('No auth user found')
    }
  })
}
