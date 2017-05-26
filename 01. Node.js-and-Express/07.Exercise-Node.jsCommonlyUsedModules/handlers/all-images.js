let allModules = require('../custom_modules/all-needed-modules')
let template = './views/all-images.html'

module.exports = (req, res) => {
  let partialView = {menu: allModules.menu, style: allModules.style}
  if (req.pathname === '/all') {
    let filterDataBase = allModules.database.filter(img => {
      if (!img['private']) {
        return img
      }
    })
    allModules.fs.readFile(template, (err, template) => {
      if (err) {
        allModules.errorHandler.throwError(err)
      }
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      template = template.toString()
      res.write(allModules.mustache.render(template, {images: filterDataBase}, partialView))
      res.end()
    })
  } else {
    return true
  }
}
