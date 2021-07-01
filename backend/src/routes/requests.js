/* eslint-disable consistent-return */
const express = require('express')

const router = express.Router()
const Request = require('../models/request')

router.post('/', async (req, res, next) => {
  const { sender, requestType, title, message } = req.body

  if (requestType !== 'Hairdresser Request' && requestType !== 'Style Advice')
    return res.status(400).send({ message: 'Request type is wrong' })

  if (sender === '') return res.status(400).send({ message: 'Sender ID can not be empty!' })
  if (title === '') return res.status(400).send({ message: 'Title can not be empty!' })
  if (message === '') return res.status(400).send({ message: 'Message can not be empty!' })

  const requestToCreate = { sender, requestType, title, message }

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
