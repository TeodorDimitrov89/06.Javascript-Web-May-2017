const controllers = require('../controllers')
let multer = require('multer')
let upload = multer({ dest: './public/images' })
const auth = require('./auth')
module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/contact-us', controllers.home.contactUs)
  // Add Recipe
  app.get('/recipe/add', auth.isAuthenticated, controllers.recipe.addGet)
  app.post('/recipe/add', auth.isAuthenticated, upload.single('image'), controllers.recipe.addPost)
  // ///////////////////////////////////////////////////////
  // List all Recipes
  app.get('/recipe/all', auth.isAuthenticated, controllers.recipe.listGet)
  // ///////////////////////////////////////////////////////
  // Edit Recipe
  app.get('/recipe/edit/:id', auth.isAuthenticated, controllers.recipe.editGet)
  app.post('/recipe/edit/:id', auth.isAuthenticated, upload.single('image'), controllers.recipe.editPost)
  // Delete Recipe
  app.get('/recipe/delete/:id', auth.isInRole('Admin'), controllers.recipe.deleteGet)
  app.post('/recipe/delete/:id', auth.isInRole('Admin'), controllers.recipe.deletePost)
  // ///////////////////////////////////////////////////////
  app.get('/category/add', auth.isAuthenticated, controllers.category.addGet)
  app.post('/category/add', auth.isAuthenticated, controllers.category.addPost)
  app.get('/category/:category/recipe', auth.isAuthenticated, controllers.category.recipeByCategory)
  // ///////////////////////Register User/////////////////////////////////
  app.get('/users/register', controllers.users.registerGet)
  app.post('/users/register', controllers.users.registerPost)
  // ///////////////////////Login User/////////////////////////////////
  app.get('/users/login', controllers.users.loginGet)
  app.post('/users/login', controllers.users.loginPost)
  app.post('/users/logout', controllers.users.logout)
  // Recipe Details
  app.get('/recipe/details/:id', auth.isAuthenticated, controllers.recipe.detailsGet)
  // Comments
  app.get('/comment/addComment/:id', auth.isAuthenticated, controllers.comment.commentGet)
  app.post('/comment/addComment/:id', auth.isAuthenticated, controllers.comment.commentPost)
  // Admins
  app.get('/admins/add/', auth.isInRole('Admin'), controllers.admins.addGet)
  app.post('/admins/add/', auth.isInRole('Admin'), controllers.admins.addPost)
}
