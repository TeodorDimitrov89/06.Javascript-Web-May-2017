// TODO: Всичко свързано с routes-a на приложението
const controllers = require('../controllers')
const auth = require('./auth')
module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/users/register', controllers.users.registerGet)
  app.post('/users/register', controllers.users.registerPost)
  app.get('/users/login', controllers.users.loginGet)
  app.post('/users/login', controllers.users.loginPost)
  app.get('/cars/add', auth.isInRole('Admin'), controllers.cars.addGet)
  app.post('/cars/add', auth.isInRole('Admin'), controllers.cars.addPost)
  app.get('/cars/all', controllers.cars.allGet)
  app.get('/cars/rent/:id', auth.isAuthenticated, controllers.cars.rentGet)
  app.post('/cars/rent/:id', auth.isAuthenticated, controllers.cars.rentPost)
  // /////////////////////////////////////////////////////
  app.get('/cars/edit/:id', controllers.cars.editGet)
  app.post('/cars/edit/:id', controllers.cars.editPost)
  // /////////////////////////////////////////////////////
  app.get('/users/me/', auth.isAuthenticated, controllers.users.profileGet)
  app.post('/users/logout', controllers.users.logout)
  app.all('*', (req, res) => {
    res.status(404)
    res.send('404, Not Found!')
    res.end()
  })
}
