let allModules = require('./all-needed-modules')
let saveImage = (req, res) => {
  let form = new allModules.formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (err) throw err
    let uploadFiles = files['upload']
    let uniqueID = allModules.shortid.generate()
    allModules.fs.mkdirSync(`./content/images/${uniqueID + uploadFiles.name}`)
    let imgPath = allModules.path.normalize(allModules.path.join(__dirname, `../content/images/${uniqueID + uploadFiles.name}/${uploadFiles.name}`))
    let imagePath = `./content/images/${uniqueID + uploadFiles.name}/${uploadFiles.name}`
    if (uploadFiles === '' || uploadFiles.name === '') {
      allModules.fs.readFile('./views/error-friendly-message.html', 'utf-8', (err, file) => {
        if (err) allModules.errorHandler.throwError(err)
        res.writeHead(200, {
          'Content-Type': 'text/html'
        })
        res.write(file)
        res.end()
      })
    } else {
      let source = allModules.fs.createReadStream(uploadFiles.path)
      let dest = allModules.fs.createWriteStream(imagePath)
      source.pipe(dest)
      source.on('error', (err) => {
        allModules.errorHandler.error404(err)
      })
      source.on('end', () => {
        res.writeHead(302, {
          'Location': '/all'
        })
        fields.id = allModules.database.length + 1
        fields.imagePath = imagePath
        fields.imgPath = imgPath
        allModules.database.push(fields)
        res.end()
      })
    }
  })
}

module.exports = {saveImage}
