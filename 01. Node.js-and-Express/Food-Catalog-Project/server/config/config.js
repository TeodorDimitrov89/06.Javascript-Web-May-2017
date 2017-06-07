// Настройвам Evnironment тука

const path = require('path')
module.exports = {
  development: {
    rootPath: path.normalize(path.join(__dirname, '../../')),
    port: 1121,
    connectionString: 'mongodb://localhost:27017/recipe'
  },
  production: {
  }
}
