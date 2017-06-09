const mongoose = require('mongoose')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required!'
const carSchema = new mongoose.Schema({
  model: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  image: { type: String },
  pricePerDay: { type: Number, required: REQUIRED_VALIDATION_MESSAGE, min: 1500 },
  color: { type: String },
  date: { type: Date, default: Date.now() },
  isRented: { type: Boolean, default: false },
  days: { type: Number, min: 1, max: 7 },
  rentedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})
const Car = mongoose.model('Car', carSchema)
module.exports = Car
