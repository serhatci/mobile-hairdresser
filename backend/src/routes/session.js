/* eslint-disable consistent-return */
const express = require('express')
const passport = require('passport')
const validator = require('validator')

const router = express.Router()

router.get('/', (req, res) => {
  res.send(req.user)
})

router.post('/', (req, res, next) => {
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
      return res.status(401).send({ message: 'Authentication failed!' })
    }

    req.login(user, e => {
      if (err) {
        return next(e)
      }
      return res.send(req.user)
    })
  })(req, res, next)
})

router.delete('/', async (req, res, next) => {
  await req.logout()

  req.session.regenerate(err => {
    if (err) return next(err)

    return res.sendStatus(200)
  })
})

module.exports = router
