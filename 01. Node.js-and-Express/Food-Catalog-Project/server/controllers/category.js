const Category = require('../models/Category')
module.exports = {
  addGet: (req, res) => {
    res.render('category/add')
  },
  addPost: (req, res) => {
    let category = req.body
    Category.create(category)
    .then(() => {
      res.redirect('/')
    })
  },
  recipeByCategory: (req, res) => {
    let categoryName = req.params.category
    Category.findOne({name: categoryName})
    .populate('recipe')
    .then(category => {
      if (!category) {
        res.sendStatus(404)
        return
      }
      res.render('category/recipes', {category: category})
    }).catch(err => {
      console.log(err)
    })
  }
}
