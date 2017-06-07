const homeController = require('./home')
const recipeController = require('./recipe')
const categoryController = require('./category')
const usersController = require('./users')
const commentController = require('./comments')
const adminController = require('./admins')
module.exports = {
  home: homeController,
  recipe: recipeController,
  category: categoryController,
  users: usersController,
  comment: commentController,
  admins: adminController
}
