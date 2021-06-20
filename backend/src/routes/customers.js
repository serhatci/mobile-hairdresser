/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express')
const Customer = require('../models/customer')

const router = express.Router()

/* GET customers by filters . */
router.get('/', async (req, res) => {
  let query = {}

  if (req.query.city) {
    query = { 'address.city': req.query.city }
  }

  if (req.query.state) {
    query = { 'address.state': req.query.state }
  }

  if (req.query.postcode) {
    query = { 'address.postcode': req.query.postcode }
  }

  try {
    const customer = await Customer.find(query).limit(10)
    res.send(customer)
  } catch {
    res.status(500).send({ msg: 'Database query error!' })
  }
})

/* GET customer by ID . */
router.get('/:customerId', async (req, res) => {
  const { customerId } = req.params

  try {
    const customer = await Customer.findById(customerId)
    res.send(customer)
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ msg: 'Provided CustomerId has wrong format!' })
    } else {
      res.status(500).send({ msg: 'Database query error!' })
    }
  }
})

/* POST a new customer . */
router.post('/', async (req, res) => {
  const customerToCreate = req.body

  try {
    const createdCustomer = await Customer.create(customerToCreate)
    res.send(createdCustomer)
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      res.status(409).send({ msg: 'This user already exists!' })
    } else if (err.name === 'ValidationError') {
      res.status(400).send({ msg: err.errors })
    } else {
      res.status(500).send({ msg: 'Database query error!' })
    }
  }
})

/* UPDATE a customer . */
router.put('/:customerId', async (req, res) => {
  const { customerId } = req.params

  try {
    await Customer.findByIdAndUpdate(customerId, req.body, { runValidators: true })
    const updatedCustomer = await Customer.findById(customerId)
    res.send(updatedCustomer)
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ msg: 'Provided CustomerId does not exists in database!' })
    } else if (err.name === 'ValidationError') {
      res.status(400).send({ msg: err.errors })
    } else {
      res.status(500).send({ msg: 'Database query error!' })
    }
  }
})

/* DELETE a customer . */
router.delete('/:customerId', async (req, res) => {
  const { customerId } = req.params
  if (!customerId) return res.sendStatus(400)

  try {
    const deletedCustomer = await Customer.findByIdAndDelete(customerId)
    res.send(deletedCustomer)
  } catch {
    res.sendStatus(404)
  }
})

module.exports = router
