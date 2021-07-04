/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express')

const Customer = require('../models/customer')

const router = express.Router()

router.post('/:customerId/request', async (req, res, next) => {
  const { customerId } = req.params
  if (!customerId) return res.status(400).send({ message: 'UserID can not be empty!' })

  try {
    const customer = await Customer.findById(customerId)

    const updatedCustomer = await customer.postRequest(req.body)
    res.status(200).send(updatedCustomer)
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      res.status(409).send({ message: 'This request already exists!' })
    } else if (err.name === 'ValidationError') {
      res.status(400).send({ message: err.errors })
    } else {
      next(err)
    }
  }
})

    const updatedCustomer = await customer.populate('customerRequests').execPopulate()
    res.status(200).send(updatedCustomer)
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      res.status(409).send({ message: 'This request already exists!' })
    } else if (err.name === 'ValidationError') {
      res.status(400).send({ message: err.errors })
    } else {
      next(err)
    }
  }
})

module.exports = router
