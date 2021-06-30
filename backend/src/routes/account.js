/* eslint-disable consistent-return */
const express = require('express')
const passport = require('passport')
const validator = require('validator')

const router = express.Router()

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

router.get('/session', (req, res) => {
  res.send(req.user)
})

router.post('/session', (req, res, next) => {
  const { email, password } = req.body
  if (email === '') return res.status(400).send({ message: 'Email can not be empty!' })
  if (password === '') return res.status(400).send({ message: 'Password can not be empty!' })
  if (!validator.isEmail(email)) return res.status(400).send({ message: 'Email is not valid!' })

  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err) // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.send(401, { message: 'Authentication failed!' })
    }
    req.login(user, e => {
      if (err) {
        return next(e)
      }
      return res.send(req.user)
    })
  })(req, res, next)
})

router.delete('/session', async (req, res, next) => {
  await req.logout()

  req.session.regenerate(err => {
    if (err) return next(err)

    return res.sendStatus(200)
  })
})

module.exports = router
