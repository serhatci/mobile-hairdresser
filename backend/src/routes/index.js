/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-expressions */
const express = require('express')

const router = express.Router()

const faker = require('faker')

const Customer = require('../models/customer')
const Hairdresser = require('../models/hairdresser')
const User = require('../models/user')

router.get('/', async (req, res) => {
  const customer = await Customer.findOne({})
  const hairdresser = await Hairdresser.findOne({})
  res.send([customer, hairdresser])
})

/* Creates fake users in db for testing */
router.post('/', async (req, res) => {
  if (req.query.testUsers == 'Yes') {
    try {
      for (let i = 0; i < 25; i += 1) {
        const email = `_TestEmail_${faker.internet.email()}`
        const password = faker.internet.password()

        if (i % 2) {
          await Customer.register({ email }, password)
        } else {
          await Hairdresser.register({ email }, password)
        }
      }

      const city = 'Heilbronn'
      const state = 'BW'
      const postcode = 74076

      await User.updateMany({ email: { $regex: /_TestEmail_/, $options: 'g' } }, { city, state, postcode })
      res.status(200).send('**** Test users are created! **** \n')
    } catch (err) {
      res.status(400).send(`**** Test users creation in DB is failed! **** \n ${err}`)
    }
  }
})

router.delete('/', async (req, res) => {
  if (req.query.testUsers === 'Yes') {
    try {
      await User.deleteMany({ email: { $regex: /_TestEmail_/, $options: 'g' } })

      res.status(200).send('Test users are deleted!')
    } catch (err) {
      if (err.name === 'Error') {
        res.status(400).send({ msg: err.message })
      } else {
        res.status(500).send({ msg: 'Database query error!' })
      }
    }
  }
})

module.exports = router
