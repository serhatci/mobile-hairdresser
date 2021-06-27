const express = require('express')

const router = express.Router()

const Customer = require('../models/customer')
const Hairdresser = require('../models/hairdresser')

router.get('/session', (req, res) => {
  res.send(req.sessions)
})

router.post('/user', async (req, res, next) => {
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

    return res.send(createdUser)
  } catch (err) {
    if (err.name === 'UserExistsError') {
      return res.status(409).send({ message: 'This user already exists!' })
    }
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: err.errors })
    }
    return next(err)
  }
})

module.exports = router
