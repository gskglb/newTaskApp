// import something here

// "async" is optional
export default async ({ app, router, Vue }) => {
  let bus = new Vue()
  Object.defineProperties(Vue.prototype, { $bus: { get: function () {
    return bus
  } } })
}
