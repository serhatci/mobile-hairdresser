const mongoose = require('mongoose')

const EmployerReferenceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shop: String,
  address: String,
  email: String,
  telephone: String,
})

module.exports = EmployerReferenceSchema
