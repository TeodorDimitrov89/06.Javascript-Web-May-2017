const fs = require('fs')
const url = require('url')
const path = require('path')
const database = require('../config/database')
const query = require('querystring')
const multiparty = require('multiparty')
const shortid = require('shortid')
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
    let form = new multiparty.Form()
    let product = {}
    form.on('part', (part) => {
      if (part.filename) {
        let fileName = shortid.generate()
        let filePath = path.normalize(path.join('./content/images', fileName + part.filename))
        let bodyFile = ''
        part.setEncoding('binary')
        part.on('data', (file) => {
          bodyFile += file
        })
        part.on('end', () => {
          product.image = filePath
          fs.writeFile(filePath, bodyFile, 'binary', (err) => {
            if (err) {
              throw err
            }
          })
        })
      } else {
        let bodyFile = ''
        part.setEncoding('utf-8')
        part.on('data', (data) => {
          bodyFile += data
        })
        part.on('end', () => {
          product[part.name] = bodyFile
        })
      }
    })
    form.on('close', () => {
      database.products.add(product)
      res.writeHead(302, {
        'Location': '/'
      })
      res.end()
    })
    form.parse(req)
  } else {
    continueWithNextHandle = true
    return continueWithNextHandle
  }
}

// const fs = require('fs')
// const url = require('url')
// const path = require('path')
// const database = require('../config/database')
// const query = require('querystring')
// let pathFile = path.normalize(path.join(__dirname, '../views/products/add.ejs'))
// module.exports = (req, res) => {
//   req.pathname = req.pathname || url.parse(req.url).pathname
//   let continueWithNextHandle = false
//   if (req.pathname === '/product/add' && req.method === 'GET') {
//     fs.readFile(pathFile, (err, data) => {
//       if (err) {
//         console.log(err)
//         res.writeHead(404, {'Content-Type': 'text/plain'})
//         res.write('Page not Found!')
//         res.end()
//         return
//       }
//       res.writeHead(200, {'Content-Type': 'text/html'})
//       res.write(data)
//       res.end()
//     })
//   } else if (req.pathname === '/product/add' && req.method === 'POST') {
//     let body = ''
//     req.on('data', (data) => {
//       body += data
//     })
//     req.on('end', () => {
//       let parsedBody = query.parse(body)
//       database.products.add(parsedBody)
//       fs.readFile('./views/home/index.ejs', (err, data) => {
//         if (err) {
//           console.log(err)
//           res.writeHead(404)
//           res.write('404 not found!')
//           res.end()
//           return
//         }
//         res.writeHead(302, {
//           'Location': '/'
//         })
//         res.end()
//       })
//     })
//   } else {
//     continueWithNextHandle = true
//     return continueWithNextHandle
//   }
// }