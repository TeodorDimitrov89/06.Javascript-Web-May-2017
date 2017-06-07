const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = Schema({
  name: { type: Schema.Types.String, require: true, unique: true },
  products: [ { type: Schema.Types.ObjectId, ref: 'Product' } ]
})

let Category = mongoose.model('Category', categorySchema)

module.exports = Category
