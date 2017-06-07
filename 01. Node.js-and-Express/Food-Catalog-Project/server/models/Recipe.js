const mongoose = require('mongoose')
const RecipeSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.String },
  description: { type: mongoose.Schema.Types.String },
  image: { type: mongoose.Schema.Types.String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  comments: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'} ]
})
let Recipe = mongoose.model('Recipe', RecipeSchema)
module.exports = Recipe
