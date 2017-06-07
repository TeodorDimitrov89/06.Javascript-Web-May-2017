// TODO: Home Controller...
const Recipe = require('../models/Recipe')
module.exports = {
  index: (req, res) => {
    Recipe.find({})
    .populate('category') // Тука използвам populate за да мога да взема name-a на категорията и да я използвам в read more
    .limit(4)
    .then(recipes => {
      res.render('home/home', {recipes: recipes})
    })
  },
  contactUs: (req, res) => {
    res.render('home/contact-us')
  }
}
