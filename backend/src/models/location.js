const mongoose = require('mongoose')

const LocationSchema = new mongoose.Schema({
  countryCode: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  stateCode: {
    type: String,
    required: true,
  },
  province: {
    type: String,
  },
  province_code: {
    type: String,
  },
  community: {
    type: String,
  },
  communityCode: {
    type: Number,
  },
  location: [],
})

module.exports = mongoose.model('Location', LocationSchema)
