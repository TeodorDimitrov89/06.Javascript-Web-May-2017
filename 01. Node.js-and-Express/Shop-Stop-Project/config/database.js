const fs = require('fs')
const path = require('path')
const dbPath = path.normalize(path.join(__dirname, '/database.json'))

let getProducts = () => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(dbPath)) { // Check if file not exist and if not create it!
      fs.writeFile(dbPath, '[]', (err) => { // Много е важно записването да стане асинхронно иначе ще забие при първото стартиране на страницата
        // It is very important to use writeFile not writeFileSync
        if (err) throw err
        return []
      })
    }
    fs.readFile(dbPath, (err, data) => {
      if (err) {
        reject(err)
      }
      return resolve(data)
    })
  })
}

let saveProducts = (products) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(dbPath, JSON.stringify(products, null, 2), 'utf8', (err) => {
      if (err) {
        reject(err)
      }
      return resolve()
    })
  })
}

module.exports.products = {}

module.exports.products.add = (product) => {
  getProducts()
    .then((products) => {
      product.id = JSON.parse(products).length + 1
      products = JSON.parse(products)
      products.push(product)
      return products
    })
    .then((products) => {
      return saveProducts(products)
    }).catch((err) => console.log(err))
}

module.exports.products.getAll = getProducts

module.exports.findByNameOrDescription = (products, queryString) => {
  return products.filter(p => {
    if (p.name.toLowerCase().indexOf(queryString.toLowerCase()) !== -1 || p.description.toLowerCase().indexOf(queryString.toLowerCase()) !== -1) {
      return p.name
    }
  })
}
