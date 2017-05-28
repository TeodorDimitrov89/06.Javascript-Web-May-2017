const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productSchema = Schema({
  name: { type: Schema.Types.String, require: true },
  description: { type: Schema.Types.String },
  price: {
    type: Schema.Types.Number,
    min: 0,
    max: Number.MAX_VALUE,
    default: 0
  },
  image: { type: Schema.Types.String },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  isBought: { type: Schema.Types.Boolean, default: false }
})
let Product = mongoose.model('Product', productSchema)

module.exports = Product
