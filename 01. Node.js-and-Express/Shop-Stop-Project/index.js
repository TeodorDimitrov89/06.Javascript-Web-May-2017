const http = require('http')
const port = 4000
let handlers = require('./handlers')
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
