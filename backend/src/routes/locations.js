const express = require('express')
const Location = require('../models/location')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const results = await Location.find({}, { city: 1, state: 1, postcode: 1, location: 1 })
    res.send(results)
  } catch (err) {
    next(err)
  }
})

module.exports = router
