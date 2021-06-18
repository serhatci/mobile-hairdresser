/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-expressions */
const express = require('express')

const router = express.Router()

const faker = require('faker')

const Customer = require('../models/customer')
const Hairdresser = require('../models/hairdresser')
const User = require('../models/user')

/* GET home page. */
router.get('/', async (req, res) => {
  const customer = await Customer.findOne({})
  const hairdresser = await Hairdresser.findOne({})
  res.render('index', { customer, hairdresser })
})

/* Creates fake users in db for testing */
router.put('/:testUsers', async (req, res) => {
  if (req.params.testUsers === 'create-test-users') {
    try {
      for (let i = 0; i < 30; i += 1) {
        const name = 'I am fake'
        const surname = 'Only created for test purpose'
        const email = faker.internet.email()
        const password = faker.internet.password()

        i % 2
          ? await Customer.create({ name, surname, email, password })
          : await Hairdresser.create({ name, surname, email, password })
      }
      res.status(200).send('**** Test users are created! **** \n')
    } catch {
      res.status(500).send('**** Test users creation in DB is failed! **** \n')
    }
  }
})

/* Delete fake users in db for testing */
router.delete('/:testUsers', async (req, res) => {
  if (req.params.testUsers === 'delete-test-users') {
    try {
      await User.deleteMany({ name: 'I am fake', surname: 'Only created for test purpose' })
    } catch (err) {
      res.status(500).send('**** Test users deletion in DB is failed! **** \n')
    }
    res.status(200).send('**** Test users are deleted! **** \n')
  }
})

module.exports = router
