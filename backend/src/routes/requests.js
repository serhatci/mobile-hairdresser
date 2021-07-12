/* eslint-disable consistent-return */
const express = require('express')

const router = express.Router()
const Request = require('../models/request')

router.get('/', async (req, res, next) => {
  let query = {}

  if (req.query.senderId) {
    query = { sender: req.query.senderId }
  }

  if (req.query.city) {
    query = { 'senderAddress.city': req.query.city }
  }

  if (req.query.stateCode) {
    query = { senderAddress: { stateCode: req.query.stateCode } }
  }

  if (req.query.postcode) {
    query = { senderAddress: { postcode: req.query.postcode } }
  }

  if (req.query.userType) {
    query.type = req.query.userType
  }

  try {
    const user = await Request.find(query)
    res.send(user)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const { senderId, senderFullName, requestType, senderAddress, message } = req.body

  if (requestType !== 'Hairdresser Request' && requestType !== 'Style Advice')
    return res.status(400).send({ message: 'Request type is wrong' })

  if (senderAddress === '') return res.status(400).send({ message: 'Address can not be empty!' })
  if (message === '') return res.status(400).send({ message: 'Message can not be empty!' })

  const requestToCreate = { senderId, senderFullName, requestType, senderAddress, message }

  try {
    const createdRequest = await Request.create(requestToCreate)
    return res.send(createdRequest)
  } catch (err) {
    if (err.name === 'ValidationError') {
      const invalidProperty = Object.keys(err.errors)[0]
      return res.status(422).send({ message: err.errors[invalidProperty].message })
    }
    return next(err)
  }
})

module.exports = router
