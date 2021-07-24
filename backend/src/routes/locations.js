const express = require('express')
const Location = require('../models/location')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const results = await Location.find({}, { city: 1, postcode: 1 }).sort({ city: 'asc' })
    res.send(results)
  } catch (err) {
    next(err)
  }
})

module.exports = router
