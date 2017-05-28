const http = require('http')
const port = 4000
const handlers = require('./handlers')
let environment = process.env.NODE_ENV || 'development'
const config = require('./config/config')
const database = require('./config/database.config')
database(config[environment])

let server = http.createServer((req, res) => {
  for (let handler of handlers) {
    let nextHandler = handler(req, res)
    if (!nextHandler) {
      break
    }
  }
})

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
