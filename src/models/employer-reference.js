const mongoose = require('mongoose')

const EmployerReferenceSchema = new mongoose.Schema({
  name: String,
  shop: String,
  address: String,
  email: String,
  telephone: String,
})

module.exports = mongoose.model('EmployerReference', EmployerReferenceSchema)
