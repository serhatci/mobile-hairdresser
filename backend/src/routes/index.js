const express = require('express')

const router = express.Router()

const Customer = require('../models/customer')
const Hairdresser = require('../models/hairdresser')

/* GET home page. */
router.get('/', async (req, res) => {
  const customer = await Customer.findOne({})
  const hairdresser = await Hairdresser.findOne({})
  res.render('index', { customer, hairdresser })
})

module.exports = router
