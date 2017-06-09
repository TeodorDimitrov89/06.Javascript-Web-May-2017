const express = require('express')
const environment = process.env.NODE_ENV || 'development'
const config = require('./server/config/config')[environment]
const app = express()

require('./server/config/database.setting')(config)
require('./server/config/express')(app, config)
require('./server/config/routes')(app)
require('./server/config/passport')()
app.listen(config.port)
console.log('Server listening on port ' + config.port)
