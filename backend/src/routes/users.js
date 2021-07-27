/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express')
const User = require('../models/user')

const router = express.Router()

router.get('/', async (req, res, next) => {
  let query = {}

  if (req.query.city) {
    query = { 'address.city': req.query.city }
  }

  if (req.query.stateCode) {
    query = { 'address.stateCode': req.query.stateCode }
  }

  if (req.query.postcode) {
    query = { 'address.postcode': req.query.postcode }
  }

  if (req.query.userType) {
    query.type = req.query.userType
  }

  try {
    const userArr = await User.find(query)
    res.send(userArr)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params

  try {
    const user = await User.findById(userId)
    res.send(user)
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Provided UserId has wrong format!' })
    } else {
      next(err)
    }
  }
})

router.patch('/:userId', async (req, res, next) => {
  const { userId } = req.params
  const { firstName, lastName, userAddress } = req.body

  if (firstName === '') return res.status(400).send({ message: 'First name can not be empty!' })
  if (lastName === '') return res.status(400).send({ message: 'Last name can not be empty!' })
  if (userAddress.city === '') return res.status(400).send({ message: 'Address can not be empty!' })

  try {
    await User.findByIdAndUpdate(userId, req.body, { runValidators: true })
    const updatedUser = await User.findById(userId)

    if (updatedUser === null) throw new Error('UserId does not exist in database!')

    res.send(updatedUser)
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Provided UserId has wrong format!' })
    } else if (err.name === 'ValidationError') {
      const invalidProperty = Object.keys(err.errors)[0]
      res.status(422).send({ message: err.errors[invalidProperty].message })
    } else if (err.name === 'Error') {
      res.status(400).send({ message: err.message })
    } else {
      next(err)
    }
  }
})

router.delete('/:userId', async (req, res, next) => {
  const { userId } = req.params

  try {
    const deletedUser = await User.findByIdAndDelete(userId)

    if (deletedUser === null) throw new Error('UserId does not exist in database!')

    res.send(deletedUser)
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Provided UserId has wrong format!' })
    } else if (err.name === 'Error') {
      res.status(400).send({ message: err.message })
    } else {
      next(err)
    }
  }
})

module.exports = router
