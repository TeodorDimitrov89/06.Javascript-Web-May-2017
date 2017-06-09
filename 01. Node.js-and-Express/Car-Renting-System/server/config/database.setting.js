// TODO: Връзка с базата и всякакви initial методи необходими при стартиране на приложението

const mongoose = require('mongoose')
const User = require('../models/User')
require('../models/Car')
mongoose.Promise = global.Promise

module.exports = (config) => {
  mongoose.connect(config.connectionString)
  let db = mongoose.connection
  db.once('open', (err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('MongoDB is Ready!')
    User.seedAdminUser()
  })
  db.on('err', (err) => {
    console.log(err)
  })
}
