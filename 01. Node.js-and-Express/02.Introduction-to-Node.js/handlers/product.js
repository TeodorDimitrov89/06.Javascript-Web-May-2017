const fs = require('fs')
const url = require('url')
const path = require('path')
const database = require('../config/database')
const query = require('querystring')
let pathFile = path.normalize(path.join(__dirname, '../views/products/add.ejs'))
module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname
  let continueWithNextHandle = false
  if (req.pathname === '/product/add' && req.method === 'GET') {
    fs.readFile(pathFile, (err, data) => {
      if (err) {
        console.log(err)
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.write('Page not Found!')
        res.end()
        return
      }
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.write(data)
      res.end()
    })
  } else if (req.pathname === '/product/add' && req.method === 'POST') {
    let body = ''
    req.on('data', (data) => {
      body += data
    })
    req.on('end', () => {
      let parsedBody = query.parse(body)
      database.products.add(parsedBody)
      fs.readFile('./views/home/index.ejs', (err, data) => {
        if (err) {
          console.log(err)
          res.writeHead(404)
          res.write('404 not found!')
          res.end()
          return
        }
        res.writeHead(302, {
          'Location': '/'
        })
        res.end()
      })
    })
  } else {
    continueWithNextHandle = true
    return continueWithNextHandle
  }
}
