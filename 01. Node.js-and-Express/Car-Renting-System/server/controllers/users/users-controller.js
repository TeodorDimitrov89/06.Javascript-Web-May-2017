const encryption = require('../../utilities/encryption')
const User = require('mongoose').model('User')
// const Car = require('mongoose').model('Car')

module.exports = {
  registerGet: (req, res) => {
    res.render('users/register')
  },
  registerPost: (req, res) => {
    let user = req.body
    // TODO: Add Validation:
    if (user.password !== user.confirmPassword) {
      user.globalError = 'Password do not match!'
      res.render('users/register', user)
    } else {
      let salt = encryption.generateSalt()
      let hashedPassword = encryption.generateHashedPassword(salt, user.password)
      User.create({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        salt: salt,
        hashedPass: hashedPassword
      }).then(user => {
        req.logIn(user, (err, user) => {
          if (err) {
            res.locals.globalError = err
            res.render('users/register', {globalError: 'Oooops 500'})
            return
          }
          res.redirect('/')
        })
      }).catch(() => {
        res.render('users/register', {
          globalError: "This username has already been taken, or contains invalid characters such as @,'& etc. Please pick another."})
      })
    }
  },
  loginGet: (req, res) => {
    res.render('users/login')
  },
  loginPost: (req, res) => {
    let reqUser = req.body
    User.findOne({ username: reqUser.username })
    .then(user => {
      if (!user) {
        res.locals.globalError = 'invalid user data'
        res.render('users/login')
      }
      let userSalt = user.salt
      let userHashedPass = user.hashedPass
      let reqHashedPass = encryption.generateHashedPassword(userSalt, reqUser.password)
      if (userHashedPass !== reqHashedPass) {
        res.render('users/login', {globalError: 'Invalid password or username'})
      } else {
        req.logIn(user, (err, user) => {
          if (err) {}
          res.redirect('/')
        })
      }
    })
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  },
  profileGet: (req, res) => {
    User.findById(req.user._id)
    .populate('cars')
    .then(cars => {
      res.render('users/me', {cars: cars.cars})
    })
  }
}
