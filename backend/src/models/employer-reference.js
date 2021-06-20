const mongoose = require('mongoose')

const { isAlphanumeric, isEmail, isInt } = require('validator')

const EmployerReferenceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: [isAlphanumeric, 'Name should contain letters & numbers only'],
  },
  shop: { type: String, trim: true },
  address: { type: String, trim: true },
  email: { type: String, trim: true, validate: [isEmail, 'Enter a valid email address'] },
  tel: {
    type: String,
    trim: true,
    validate: [isInt, 'Telephone should contain numbers only'],
  },
})

module.exports = mongoose.model('EmployerReference', EmployerReferenceSchema)
