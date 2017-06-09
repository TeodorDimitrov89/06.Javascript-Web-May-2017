// TODO: Тук мисля че трябва да настроя Environment-a dev or production
const path = require('path')
module.exports = {
  development: {
    rootPath: path.normalize(path.join(__dirname, '../../')),
    port: process.env.PORT || 1444,
    connectionString: 'mongodb://localhost:27017/carRentingSystem'
  },
  production: {}
}
