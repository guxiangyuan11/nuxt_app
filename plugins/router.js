export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    if (process.client) {
      // do something
    }
    next()
  })
}
