const port = 1999
const config = require('./config/config')
const express = require('express')
const app = express()
let environment = process.env.NODE_ENV || 'development'
const database = require('./config/database.config')

database(config[environment])

require('./config/express')(app, config[environment])

require('./config/routes')(app)

app.listen(port)
console.log('Server running')
