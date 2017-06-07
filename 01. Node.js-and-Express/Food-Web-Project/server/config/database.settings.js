// TODO: Тука трябва да настроя базата как да работи
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const User = require('../models/User')
require('../models/Recipe')
require('../models/Comment')
module.exports = (config) => {
  mongoose.connect(config.connectionString)
  let db = mongoose.connection
  db.once('open', (err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Database is ready!')
    User.seedAdminUser()
  })
  db.on('err', (err) => {
    console.log(err)
  })
}
