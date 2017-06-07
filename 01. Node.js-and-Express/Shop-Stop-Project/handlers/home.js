const allModules = require('../custom_modules/all-needed-modules')
const Product = require('../models/Product')

module.exports.index = (req, res) => {
  const filePath = allModules.path.normalize(allModules.path.join(__dirname, '../views/home/index.pug'))
  allModules.fs.readFile(filePath, (err, data) => {
    if (err) {
      allModules.errorHandler.error404(res, 'Page not Found!')
      return
    }
    let queryData = req.query
    Product.find()
      .populate('category')
      .then((products) => {
        if (queryData.query) {
          products = products.filter(
            p => p.name.toLowerCase().includes(queryData.query))
        }
        let data = {products: products}
        if (req.query.error) {
          data.error = req.query.error
        } else if (req.query.success) {
          data.success = req.query.success
        }
        res.render('home/index', data)
      }).catch(err => console.log(err))
  })
}
