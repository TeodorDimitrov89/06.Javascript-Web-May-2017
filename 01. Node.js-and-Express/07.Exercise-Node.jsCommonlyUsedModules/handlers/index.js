let homeHandler = require('./home')
let faviconHandler = require('./favicon')
let addImageHandler = require('./add-image')
let allImagesHandler = require('./all-images')
let imageDetailsHandler = require('./image-details')
let statusHeaderHandler = require('./status-header')
let staticHandler = require('./static-files')

module.exports = [statusHeaderHandler, homeHandler, faviconHandler, addImageHandler, allImagesHandler, imageDetailsHandler, staticHandler]
