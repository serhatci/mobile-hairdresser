/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const express = require('express')

const router = express.Router()
const Request = require('../models/request')
const Location = require('../models/location')

router.get('/', async (req, res, next) => {
  let query = {}

  if (req.query.senderId) {
    query = { senderId: req.query.senderId }
  }

  if (req.query.replierId) {
    query = { 'replies.senderId': req.query.replierId }
  }

  if (req.query.city) {
    query = { 'eventAddress.city': req.query.city }
  }

  if (req.query.stateCode) {
    query = { 'eventAddress.stateCode': req.query.stateCode }
  }

  if (req.query.postcode) {
    query = { 'eventAddress.postcode': req.query.postcode }
  }

  if (req.query.requestType) {
    query = { requestType: req.query.requestType }
  }

  try {
    const user = await Request.find(query)
      .populate({
        path: 'replies.senderId',
        match: { type: 'Hairdresser' },
        select: '-messageBox,-email',
      })
      .limit(10)

    res.send(user)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const { senderId, senderFullName, requestType, eventAddress, message } = req.body

  if (requestType !== 'Hairdresser Request' && requestType !== 'Style Advice')
    return res.status(400).send({ message: 'Request type is wrong' })

  if (eventAddress === '') return res.status(400).send({ message: 'Address must be selected from autocomplete list!' })
  if (message === '') return res.status(400).send({ message: 'Message can not be empty!' })

  try {
    const fullAddress = await Location.find({ postcode: eventAddress.postcode }, { stateCode: 1, location: 1, _id: 0 })
    eventAddress.stateCode = fullAddress[0].stateCode
    eventAddress.location = fullAddress[0].location

    const requestToCreate = { senderId, senderFullName, requestType, eventAddress, message }
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

router.delete('/:requestId', async (req, res, next) => {
  const { requestId } = req.params

  if (!requestId) return res.status(400).send({ message: 'Request ID can not be empty!' })

  try {
    const deletedRequest = await Request.findByIdAndDelete(requestId)
    return res.send(deletedRequest)
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Provided requestId has wrong format!' })
    } else {
      next(err)
    }
  }
})

router.post('/:requestId/replies', async (req, res, next) => {
  const { requestId } = req.params
  const { senderId, senderFullName, senderType, senderCity, senderPostcode, message, photos } = req.body

  if (message === '') return res.status(400).send({ message: 'Message can not be empty!' })

  const replyToCreate = { senderId, senderFullName, senderType, senderCity, senderPostcode, message, photos }

  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      { $push: { replies: replyToCreate } },
      { new: true }
    ).populate({
      path: 'replies.senderId',
      match: { type: 'Hairdresser' },
      select: '-messageBox,-email',
    })

    if (!updatedRequest) throw Error('This request is no more active! Probably deleted by user.')

    const createdReply = updatedRequest.replies[updatedRequest.replies.length - 1]

    return res.send(createdReply)
  } catch (err) {
    if (err.name === 'ValidationError') {
      const invalidProperty = Object.keys(err.errors)[0]
      return res.status(422).send({ message: err.errors[invalidProperty].message })
    }
    if (err.name === 'Error') {
      return res.status(404).send({ message: err.message })
    }
    return next(err)
  }
})

router.delete('/:requestId/replies/:replyId', async (req, res, next) => {
  const { requestId, replyId } = req.params

  if (!requestId) return res.status(400).send({ message: 'Request ID can not be empty!' })
  if (!replyId) return res.status(400).send({ message: 'Reply ID can not be empty!' })

  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      { $pull: { replies: { _id: replyId } } },
      { new: true }
    )
    const deletedReply = updatedRequest.replies.filter(i => i._id == replyId)

    return res.send(deletedReply)
  } catch (err) {
    if (err.name === 'ValidationError') {
      const invalidProperty = Object.keys(err.errors)[0]
      return res.status(422).send({ message: err.errors[invalidProperty].message })
    }
    return next(err)
  }
})

module.exports = router
