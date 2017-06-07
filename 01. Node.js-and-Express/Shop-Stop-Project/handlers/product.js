const allModules = require('../custom_modules/all-needed-modules')
const Product = require('../models/Product')
const Category = require('../models/Category')

module.exports.addGet = (req, res) => {
  let pathFile = allModules.path.normalize(allModules.path.join(__dirname, '../views/products/add.pug'))
  allModules.fs.readFile(pathFile, (err, data) => {
    if (err) {
      allModules.errorHandler.error404(res, 'Page not Found!')
      return
    }
    Category.find()
      .then((categories) => {
        res.render('products/add', {categories: categories})
        res.end()
      })
  })
}

module.exports.addPost = (req, res) => {
  let productObj = req.body // Should return object key -> value
  productObj.image = '\\' + req.file.path
  Product.create(productObj)
    .then((product) => {
      Category
        .findById(productObj.category)
        .then(category => {
          category.products.push(product._id)
          category.save()
        })
      res.redirect('/')
      res.end()
    })
}

module.exports.editGet = (req, res) => {
  let productId = req.params.id
  Product
    .findById(productId)
    .then(product => {
      if (!product) {
        res.sendStatus(404)
        return
      }
      Category.find()
        .then((categories) => {
          res.render('products/edit', {
            product: product,
            categories: categories
          })
        })
    })
}

module.exports.editPost = (req, res) => {
  console.log(req.body)
  let productId = req.params.id
  let editedProduct = req.body
  Product
    .findById(productId)
    .then(product => {
      if (!product) {
        res.redirect(`/?error=${encodeURIComponent('error=Product was not found!')}`)
        return
      }
      product.name = editedProduct.name
      product.description = editedProduct.description
      product.price = editedProduct.price
      if (req.file) {
        product.image = '\\' + req.file.path
      }
      let categoryId = editedProduct.category
      if (product.category !== categoryId) {
        Category
          .findById(product.category)
          .then(currentCategory => {
            Category
              .findById(categoryId)
              .then(newCategory => {
                let index = currentCategory.products.indexOf(product._id)
                if (index >= 0) {
                  currentCategory.products.splice(index, 1)
                }
                currentCategory.save()
                newCategory.products.push(product._id)
                newCategory.save()
                product.category = editedProduct.category
                product.save()
                  .then(() => {
                    res.redirect('/?success=' +
                      encodeURIComponent('Product was edited successfully'))
                  })
              })
          })
      } else {
        product.save()
          .then(() => {
            res.redirect('/?success=' +
              encodeURIComponent('Product was edited successfully'))
          })
      }
    })
}

module.exports.delGet = (req, res) => {
  let id = req.params.id
  Product
    .findById(id)
    .then(product => {
      res.render('products/delete', {product: product})
    })
}

module.exports.delPost = (req, res) => {
  let productId = req.params.id
  Product
    .findById(productId)
    .then(currentProduct => {
      Category
        .findById(currentProduct.category)
        .then(currentCategory => {
          let imagePath = currentProduct.image
          let index = currentCategory.products.indexOf(productId)
          if (index >= 0) {
            currentCategory.products.splice(index, 1)
          }
          currentCategory.save()
          Product
            .findByIdAndRemove(productId)
            .then(() => {
              allModules.fs.unlink(allModules.path.join('.', imagePath), () => {
                res.redirect('/?success=' +
                  encodeURIComponent('Product was deleted successfully'))
              })
            })
        })
    })
}
