const mongoose = require('mongoose')

const { isAlphanumeric, isEmail } = require('validator')

const EmployerReferenceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: null,
    trim: true,
    validate: [isAlphanumeric, 'Name should contain letters & numbers only'],
  },
  shop: { type: String, default: null, trim: true },
  address: { type: String, default: null, trim: true },
  email: { type: String, trim: true, validate: [isEmail, 'Enter a valid email address'] },
  telephone: { type: Number, default: null, trim: true },
})

module.exports = mongoose.model('EmployerReference', EmployerReferenceSchema)
