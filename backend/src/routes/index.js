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
  if (req.query.create == 'testUsers') {
    try {
      for (let i = 0; i < 30; i += 1) {
        const firstName = 'TestUser'
        const lastName = 'OnlyCreatedForTestPurpose'
        const email = faker.internet.email()
        const password = faker.internet.password()

        if (i % 2) {
          const customer = new Customer({ firstName, lastName, email })
          await customer.setPassword(password)
          await customer.save()
        } else {
          const hairdresser = new Hairdresser({ firstName, lastName, email })
          await hairdresser.setPassword(password)
          await hairdresser.save()
        }
      }

      const city = 'Heilbronn'
      const state = 'BW'
      const postcode = 74076

      await User.updateMany({ firstName: 'TestUser', lastName: 'OnlyCreatedForTestPurpose' }, { city, state, postcode })
      res.status(200).send('**** Test users are created! **** \n')
    } catch (err) {
      res.status(400).send(`**** Test users creation in DB is failed! **** \n ${err}`)
    }
  }
})

/* Delete fake users in db for testing */
router.delete('/', async (req, res) => {
  if (req.query.delete == 'testUsers') {
    try {
      await User.deleteMany({ lastName: 'OnlyCreatedForTestPurpose' })
      res.status(200).send('**** Test users are successfully deleted! **** \n')
    } catch (err) {
      res.status(500).send('**** Test users deletion in DB is failed! **** \n')
    }
  }
})

module.exports = router
