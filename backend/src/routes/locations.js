const express = require('express')
const Location = require('../models/location')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const results = await Location.find({}, { place: 1, zipcode: 1, _id: 0 })
    res.send(results)
  } catch (err) {
    next(err)
  }
})

module.exports = router
