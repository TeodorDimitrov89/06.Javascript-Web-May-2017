const User = require('mongoose').model('User')
const Car = require('mongoose').model('Car')
module.exports = {
  addGet: (req, res) => {
    res.render('cars/add')
  },
  addPost: (req, res) => {
    let carsData = req.body
    Car.create({
      model: carsData.model,
      image: carsData.image,
      pricePerDay: carsData.pricePerDay,
      color: carsData.color
    }).then((car) => {
      res.redirect('/')
    })
  },
  allGet: (req, res) => {
    let search = req.query.search
    let page = parseInt(req.query.page) || 1
    let pageSize = 2
    Car.find({}).count().then(c => {
      let pageCount = Math.round(c / pageSize)
      let query = Car.find({ 'isRented': false })
      if (search) {
        query = query.where('model').regex(new RegExp(search, 'i'))
      }
      if (res.locals.isAdmin) {
        Car.find({ model: new RegExp(search, 'i') })
          .then(cars => {
            res.render('cars/all', { cars: cars })
          })
      } else {
        query
          .skip((page - 1) * pageSize)
          .limit(pageSize)
          .then(cars => {
            let nextPage = page + 1
            let hasNextPage = cars.length > 0 && nextPage <= pageCount
            if (hasNextPage) {
              console.log(pageCount)
            }
            res.render('cars/all', {
              cars: cars,
              hasPrevPage: page > 1,
              hasNextPage: hasNextPage,
              prevPage: page - 1,
              nextPage: page + 1,
              pageCount: pageCount
            })
          })
      }
    })
  },
  rentGet: (req, res) => {
    let carId = req.params.id
    Car.findById(carId).then(car => {
      res.render('cars/rent', { car: car })
    })
  },
  rentPost: (req, res) => {
    let carId = req.params.id
    User.findById(req.user._id)
      .then(user => {
        user.cars.push(carId)
        user.save().then(() => {
          Car
            .findById(carId)
            .then(car => {
              car.isRented = true
              car.days = req.body.days
              car.rentedBy = req.user._id
              car.save()
              res.redirect('/')
            })
        })
      })
  },
  editGet: (req, res) => {
    let carId = req.params.id
    Car.findById(carId).then(car => {
      if (res.locals.isAdmin) {
        res.render('cars/edit', { car: car })
      } else {
        res.render('users/login', { globalError: 'Sorry, You are not authorize!' })
      }
    })
  },
  editPost: (req, res) => {
    let carData = req.body
    let carId = req.params.id
    Car.findByIdAndUpdate(carId).then(car => {
      User.findByIdAndUpdate(car.rentedBy).then(user => {
        car.model = carData.model
        car.image = carData.image
        car.pricePerDay = carData.pricePerDay
        car.color = carData.color
        if (car.isRented == false && carData.isRented == 'true') {
          car.isRented = carData.isRented
          user.cars.push(car)
          user.save()
          car.save()
          res.redirect('/')
        } else if (car.isRented == true && carData.isRented == 'false') {
          let index = user.cars.indexOf(car._id)
          user.cars.splice(index, 1)
          car.isRented = carData.isRented
          user.save()
          car.save()
          res.redirect('/')
        }
      })
    })
  }
}






//  editPost: (req, res) => {
//     let carData = req.body
//     let carId = req.params.id
//     User.findByIdAndUpdate(req.user._id).then(user => {
//       Car.findByIdAndUpdate(carId).then(car => {
//         car.model = carData.model
//         car.image = carData.image
//         car.pricePerDay = carData.pricePerDay
//         car.color = carData.color
//         if (car.isRented == false && carData.isRented == 'true') {
//           car.isRented = carData.isRented
//           user.cars.push(car)
//           user.save()
//           car.save()
//           res.redirect('/')
//         } else if (car.isRented == true && carData.isRented == 'false') {
//           let index = user.cars.indexOf(car._id)
//           user.cars.splice(index, 1)
//           car.isRented = carData.isRented
//           user.save()
//           car.save()
//           res.redirect('/')
//         }
//       })
//     })
//   }
