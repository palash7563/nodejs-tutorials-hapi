var Hapi = require('hapi')
var Good = require('good')

// create new server instance
var server = new Hapi.Server()

// add server’s connection information
server.connection({
  host: 'localhost',
  port: 3000,
  router: {
    stripTrailingSlash: true
  }
})

// register plugins to server instance
server.register([
  {
    register: Good,
    options: {
      reporters: {
        console: [
          { module: 'good-squeeze', name: 'Squeeze', args: [ { log: '*', response: '*', request: '*' } ] },
          { module: 'good-console' },
          'stdout'
        ]
      }
    }
  },
  {
    register: require('./base-route')
  }
], function (err) {
  if (err) {
    throw err
  }

  server.log('info', 'Registered plugins')

  // start your server after plugin registration
  server.start(function (err) {
    if (err) {
      throw err
    }

    server.log('info', 'Server running at: ' + server.info.uri)
  })
})
