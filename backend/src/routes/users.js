/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express')
const User = require('../models/user')

const router = express.Router()

router.get('/', async (req, res) => {
  let query = {}

  if (req.query.city) {
    query = { city: req.query.city }
  }

  if (req.query.state) {
    query = { state: req.query.state }
  }

  if (req.query.postcode) {
    query = { postcode: req.query.postcode }
  }

  if (req.query.userType) {
    query.type = req.query.userType
  }

  try {
    const user = await User.find(query).limit(8)
    res.send(user)
  } catch (err) {
    res.status(500).send({ message: 'Database query error!' })
  }
})

router.get('/:userId', async (req, res) => {
  const { userId } = req.params

  try {
    const user = await User.findById(userId)
    res.send(user)
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Provided UserId has wrong format!' })
    } else {
      res.status(500).send({ message: 'Database query error!' })
    }
  }
})

// router.post('/', async (req, res) => {
//   const userToCreate = req.body

//   try {
//     const createdUser = await User.create(userToCreate)
//     res.send(createdUser)
//   } catch (err) {
//     if (err.name === 'MongoError' && err.code === 11000) {
//       res.status(409).send({ message: 'This user already exists!' })
//     } else if (err.name === 'ValidationError') {
//       res.status(400).send({ message: err.errors })
//     } else {
//       res.status(500).send({ message: 'Database query error!' })
//     }
//   }
// })

router.put('/:userId', async (req, res) => {
  const { userId } = req.params

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
      res.status(500).send({ message: 'Database query error!' })
    }
  }
})

router.delete('/:userId', async (req, res) => {
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
      res.status(500).send({ message: 'Database query error!' })
    }
  }
})

module.exports = router
