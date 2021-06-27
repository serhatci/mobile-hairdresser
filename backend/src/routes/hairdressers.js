/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express')
const Hairdresser = require('../models/hairdresser')

const router = express.Router()

router.get('/', async (req, res) => {
  let query = {}

  if (req.query.city) {
    query = { 'address.city': req.query.city }
  }

  if (req.query.state) {
    query = { 'address.state': req.query.state }
  }

  if (req.query.postcode) {
    query = { 'address.postcode': req.query.postcode }
  }

  try {
    const hairdresser = await Hairdresser.find(query).limit(10)
    res.send(hairdresser)
  } catch {
    res.status(500).send({ msg: 'Database query error!' })
  }
})

router.get('/:hairdresserId', async (req, res) => {
  const { hairdresserId } = req.params

  try {
    const hairdresser = await Hairdresser.findById(hairdresserId)
    res.send(hairdresser)
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ msg: 'Provided HairdresserId has wrong format!' })
    } else {
      res.status(500).send({ msg: 'Database query error!' })
    }
  }
})

router.post('/', async (req, res) => {
  const hairdresserToCreate = req.body

  try {
    const createdHairdresser = await Hairdresser.create(hairdresserToCreate)
    res.send(createdHairdresser)
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

router.put('/:hairdresserId', async (req, res) => {
  const { hairdresserId } = req.params

  try {
    await Hairdresser.findByIdAndUpdate(hairdresserId, req.body, { runValidators: true })
    const updatedHairdresser = await Hairdresser.findById(hairdresserId)

    if (updatedHairdresser === null) throw new Error('HairdresserId does not exist in database!')

    res.send(updatedHairdresser)
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ msg: 'Provided HairdresserId has wrong format!' })
    } else if (err.name === 'ValidationError') {
      res.status(400).send({ msg: err.errors })
    } else if (err.name === 'Error') {
      res.status(400).send({ msg: err.message })
    } else {
      res.status(500).send({ msg: 'Database query error!' })
    }
  }
})

router.delete('/:hairdresserId', async (req, res) => {
  const { hairdresserId } = req.params

  try {
    const deletedHairdresser = await Hairdresser.findByIdAndDelete(hairdresserId)

    if (deletedHairdresser === null) throw new Error('HairdresserId does not exist in database!')

    res.send(deletedHairdresser)
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ msg: 'Provided HairdresserId has wrong format!' })
    } else if (err.name === 'Error') {
      res.status(400).send({ msg: err.message })
    } else {
      res.status(500).send({ msg: 'Database query error!' })
    }
  }
})

module.exports = router
