/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express')

const router = express.Router()

const Customer = require('../models/customer')

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
    res.sendStatus(404)
  }
})

/* GET customer by ID . */
router.get('/:customerId', async (req, res) => {
  const { customerId } = req.params
  if (!customerId) return res.sendStatus(400)

  try {
    const customer = await Customer.findById(customerId)
    res.send(customer)
  } catch {
    res.sendStatus(404)
  }
})

/* POST a new customer . */
router.post('/', async (req, res) => {
  const customerToCreate = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
  }

  try {
    const createdCustomer = await Customer.create(customerToCreate)
    res.send(createdCustomer)
  } catch {
    res.sendStatus(404)
  }
})

/* UPDATE a customer . */
router.put('/:customerId', async (req, res) => {
  const { customerId } = req.params
  if (!customerId) return res.sendStatus(400)

  try {
    await Customer.findByIdAndUpdate(customerId, req.body)
    const updatedCustomer = await Customer.findById(customerId)
    res.send(updatedCustomer)
  } catch {
    res.sendStatus(404)
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
