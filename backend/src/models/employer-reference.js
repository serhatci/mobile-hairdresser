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
  shop: { Type: String, default: null, trim: true },
  address: { Type: String, default: null, trim: true },
  email: { Type: String, default: null, trim: true, validate: [isEmail, 'Enter a valid email address'] },
  telephone: { Type: Number, default: null, trim: true },
})

module.exports = EmployerReferenceSchema
