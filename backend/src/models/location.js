const mongoose = require('mongoose')

const LocationSchema = new mongoose.Schema({
  country_code: {
    type: String,
    required: true,
  },
  postcode: {
    type: Number,
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
  state_code: {
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
  community_code: {
    type: Number,
  },
  location: [],
})

module.exports = mongoose.model('Location', LocationSchema)
