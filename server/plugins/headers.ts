export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', (response) => {
    if (response.headers) {
      delete response.headers['server']
      delete response.headers['x-powered-by']
    }
  })
})
