/* eslint-disable import/no-extraneous-dependencies */
const express = require('express')

const router = express.Router()

const Customer = require('../models/customer')
const Hairdresser = require('../models/hairdresser')

const hairdresser = new Hairdresser('David', 'Gilmour', 'david@pfloyd.com', '**********')
const customer = new Customer('Roger', 'Waters', 'roger@pfloyd.com', '**********')

const userArr = [hairdresser, customer]

/* GET users listing. */
router.get('/', (req, res) => {
  if (req.query.surname) {
    return res.send(userArr.find(user => user.surname === req.query.surname))
  }

  return res.render('users', {
    numberOfUsers: userArr.length,
    hairdresser: userArr[0].fullName,
    customer: userArr[1].fullName,
  })
})

router.get('/:userId', (req, res) => {
  const user = req.params.userId
  if (user) res.send(userArr[req.params.userId])
  else res.sendStatus(404)
})

module.exports = router
