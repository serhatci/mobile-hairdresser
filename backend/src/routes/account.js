const express = require('express')

const router = express.Router()

const Customer = require('../models/customer')

router.get('/session', (req, res) => {
  res.send(req.sessions)
})

/* POST a new customer . */
router.post('/customer', async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  try {
    const createdCustomer = new Customer({ firstName, lastName, email })
    await createdCustomer.setPassword(password)
    await createdCustomer.save()

    res.send(createdCustomer)
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      res.status(409).send({ msg: 'This user already exists!' })
    } else if (err.name === 'ValidationError') {
      res.status(400).send({ msg: err.errors })
    } else {
      res.status(500).send({ msg: 'Database query error!' })
    }
  }
})

module.exports = router
