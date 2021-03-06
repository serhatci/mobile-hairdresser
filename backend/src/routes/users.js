/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express')

const router = express.Router()

const User = require('../models/user')
const Hairdresser = require('../models/hairdresser')
const Location = require('../models/location')

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
    const userArr = await User.find(query, { messageBox: 0 }).limit(10)
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
  if (userAddress.city === '' || userAddress.city === undefined)
    return res.status(400).send({ message: 'Address can not be empty!' })

  try {
    const fullAddress = await Location.find({ postcode: userAddress.postcode }, { stateCode: 1, location: 1, _id: 0 })
    userAddress.stateCode = fullAddress[0].stateCode
    userAddress.location = fullAddress[0].location

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, address: userAddress },
      { new: true, runValidators: true }
    )

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

router.patch('/:userId/portfolio/:key', async (req, res, next) => {
  const { userId, key } = req.params
  const { value } = req.body

  let updateKey = {}

  if (key == 'about') {
    updateKey = { about: value }
  }

  if (key == 'website') {
    updateKey = { website: value || undefined }
  }

  if (key == 'facebook') {
    updateKey = { facebook: value }
  }

  if (key == 'instagram') {
    updateKey = { instagram: value }
  }

  if (key == 'availability') {
    updateKey = { availability: value }
  }

  if (key == 'experienceInYears') {
    updateKey = { experienceInYears: value }
  }

  if (key == 'serviceArea') {
    updateKey = { serviceArea: value }
  }

  try {
    const updatedUser = await Hairdresser.findByIdAndUpdate(userId, updateKey, { new: true, runValidators: true })

    if (updatedUser === null) throw new Error('UserId does not exist in database!')

    res.send(updatedUser)
  } catch (err) {
    if (err.kind === 'ObjectId') {
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

module.exports = router
