/* eslint-disable consistent-return */
const express = require('express')

const router = express.Router()

const User = require('../models/user')
const Customer = require('../models/customer')
const Hairdresser = require('../models/hairdresser')

router.post('/', async (req, res, next) => {
  const { type, email, password, passwordConfirmation } = req.body
  if (type !== 'Customer' && type !== 'Hairdresser') return res.status(400).send({ message: 'User type is wrong' })
  if (password !== passwordConfirmation) return res.status(400).send({ message: 'Password confirmation is failed!' })
  if (email === '') return res.status(400).send({ message: 'Email can not be empty!' })
  if (password === '') return res.status(400).send({ message: 'Password can not be empty!' })

  try {
    const createdUser =
      type === 'Customer'
        ? await Customer.register({ email }, password)
        : await Hairdresser.register({ email }, password)

    res.send(createdUser)
  } catch (err) {
    if (err.name === 'UserExistsError') {
      return res.status(409).send({ message: 'This user already exists!' })
    }
    if (err.name === 'MongoError' && err.code === 11000) {
      return res.status(409).send({ message: 'This email belongs to a user!' })
    }
    if (err.name === 'ValidationError') {
      return res.status(422).send({ message: err.errors.email.message })
    }
    return next(err)
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
