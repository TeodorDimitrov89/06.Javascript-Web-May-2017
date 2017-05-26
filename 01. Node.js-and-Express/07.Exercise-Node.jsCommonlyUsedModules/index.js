let http = require('http')
let port = 2224

let handlers = require('./handlers')

let server = http.createServer((req, res) => {
  for (let handler of handlers) {
    let next = handler(req, res)
    if (!next) {
      break
    }
  }
})

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
