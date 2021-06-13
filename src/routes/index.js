const express = require('express')

const router = express.Router()

require('../models/photo')
require('../models/video')
require('../models/certificate')
const Customer = require('../models/customer')
const Hairdresser = require('../models/hairdresser')

/* GET home page. */
router.get('/', async (req, res) => {
  const customer = await Customer.findById('60c15f21b98f7435f0949f1c')
  const hairdresser = await Hairdresser.findById('60c15f21b98f7435f0949f1b')
  res.render('index', { customer, hairdresser })
})

module.exports = router
