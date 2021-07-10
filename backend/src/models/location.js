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
    required: true,
  },
  province_code: {
    type: String,
    required: true,
  },
  community: {
    type: String,
    required: true,
  },
  community_code: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('Location', LocationSchema)
