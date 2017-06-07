const mongoose = require('mongoose')
const CategorySchema = new mongoose.Schema({
  name: {type: mongoose.Schema.Types.String},
  recipe: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}]
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category
