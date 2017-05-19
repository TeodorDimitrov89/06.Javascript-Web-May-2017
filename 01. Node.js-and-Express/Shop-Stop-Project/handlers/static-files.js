const fs = require('fs')
const url = require('url')
const path = require('path')

function getContentType (url) {
  let contentType = { 'Content-Type': 'text/plain' }
  if (url.endsWith('.css')) {
    contentType = { 'Content-Type': 'text/css' }
  } else if (url.endsWith('.html')) {
    contentType = { 'Content-Type': 'text/html' }
  } else if (url.endsWith('.ejs')) {
    contentType = { 'Content-Type': 'text/html' }
  }
  return contentType
}

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname
  let continueWithNextHandler = false
  if (req.pathname.startsWith('/content/') && req.method === 'GET') {
    let filePath = path.normalize(path.join(__dirname, `..${req.pathname}`))
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        })
        res.write('Resource not found!')
        res.end()
        return
      }
      let contentType = getContentType(req.pathname)
      res.writeHead(200, contentType)
      res.write(data)
      res.end()
    })
  } else {
    continueWithNextHandler = true
    return continueWithNextHandler
  }
}
