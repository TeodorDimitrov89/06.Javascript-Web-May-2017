const encryption = require('../utilities/encryption')
const User = require('mongoose').model('User')
// const User = require('../models/User')

module.exports = {
  registerGet: (req, res) => {
    res.render('users/register')
  },
  registerPost: (req, res) => {
    let user = req.body
    // TODO: Add Validation:
    let userPass = new RegExp('^[A-Za-z0-9]{5,}$')
    if (!userPass.test(user.username)) {
      user.globalError = 'Username must be greater than 5 characters and must contain only alphanumeric symbols!'
      res.render('users/register', user)
    } else if (user.password !== user.confirmPassword) {
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
  profileGet: (req, res) => {
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  }
}
