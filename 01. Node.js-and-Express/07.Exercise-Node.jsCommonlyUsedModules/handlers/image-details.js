let template = './views/image-details.html'
let allModules = require('../custom_modules/all-needed-modules')

let filter = (database, id) => {
  return database.filter(i => {
    if (i.id === Number(id)) {
      return i
    }
  })
}

module.exports = (req, res) => {
  if (req.pathname.startsWith('/images/details')) {
    let id = req.pathname.split('/')[3]
    let filterDataBase = filter(allModules.database, id)
    console.log(filterDataBase)
    if (filterDataBase[0]) {
      allModules.fs.readFile(template, (err, template) => {
        if (err) {
          allModules.throwError(err)
        }
        res.writeHead(200, {'Content-Type': 'text/html'})
        template = template.toString()
        res.write(allModules.mustache.render(template, filterDataBase[0], {menu: allModules.menu, style: allModules.style}))
        res.end()
      })
    } else {
      let message = 'No such image'
      allModules.errorHandler.error404(res, message)
    }
  } else if (req.pathname.startsWith('/details/downloads')) {
    let id = req.pathname.split('/')[3]
    let downloadFile = filter(allModules.database, id)
    if (downloadFile[0]) {
      let fileName = downloadFile[0].name
      let readStream = allModules.fs.createReadStream(downloadFile[0].imgPath)
      res.writeHead(200, {
        'Content-Disposition': `attachment; filename=${fileName}.jpg.gz`
      })
      // Тука трябва да gzip-на преди да сваля файла
      let gzip = allModules.zlib.createGzip()
      readStream.pipe(gzip).pipe(res)
    }
  } else {
    return true
  }
}
