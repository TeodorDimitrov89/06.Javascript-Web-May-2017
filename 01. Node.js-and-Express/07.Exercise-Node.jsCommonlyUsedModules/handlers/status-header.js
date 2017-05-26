let allModules = require('../custom_modules/all-needed-modules')
let template = './views/status.html'

module.exports = (req, res) => {
  if (req.headers['statusheader'] && req.headers['statusheader'] === 'Full') {
    allModules.fs.readFile(template, (err, template) => {
      if (err) {
        allModules.errorHandler.throwError(err)
      }
      let count = allModules.database.length
      res.writeHead(200, {'Content-Type': 'text/html'})
      template = template.toString()
      res.write(allModules.mustache.render(template, {count: count}, {menu: allModules.menu}))
      res.end()
    })
  } else {
    return true
  }
}
