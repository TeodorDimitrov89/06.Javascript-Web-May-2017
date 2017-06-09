const homeController = require('./home/home-controller')
const usersController = require('./users/users-controller')
const carsController = require('./cars/cars-controller')
module.exports = {
  home: homeController,
  users: usersController,
  cars: carsController
}
