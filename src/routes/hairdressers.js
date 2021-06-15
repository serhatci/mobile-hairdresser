/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express')

const router = express.Router()

const Hairdresser = require('../models/hairdresser')

/* GET hairdressers by filters . */
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
    res.sendStatus(404)
  }
})

/* GET hairdresser by ID . */
router.get('/:hairdresserId', async (req, res) => {
  const { hairdresserId } = req.params
  if (!hairdresserId) return res.sendStatus(400)

  try {
    const hairdresser = await Hairdresser.findById(hairdresserId)
    res.send(hairdresser)
  } catch {
    res.sendStatus(404)
  }
})

/* POST a new hairdresser . */
router.post('/', async (req, res) => {
  const hairdresserToCreate = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
  }

  try {
    const createdHairdresser = await Hairdresser.create(hairdresserToCreate)
    res.send(createdHairdresser)
  } catch {
    res.sendStatus(404)
  }
})

/* UPDATE a hairdresser . */
router.put('/:hairdresserId', async (req, res) => {
  const { hairdresserId } = req.params
  if (!hairdresserId) return res.sendStatus(400)

  try {
    await Hairdresser.findByIdAndUpdate(hairdresserId, req.body)
    const updatedHairdresser = await Hairdresser.findById(hairdresserId)
    res.send(updatedHairdresser)
  } catch {
    res.sendStatus(404)
  }
})

/* DELETE a hairdresser . */
router.delete('/:hairdresserId', async (req, res) => {
  const { hairdresserId } = req.params
  if (!hairdresserId) return res.sendStatus(400)

  try {
    const deletedHairdresser = await Hairdresser.findByIdAndDelete(hairdresserId)
    res.send(deletedHairdresser)
  } catch {
    res.sendStatus(404)
  }
})

/* POST hairdresser a photoId his portfolio. */
router.post('/:hairdresserId/photos', async (req, res) => {
  const { hairdresserId } = req.params
  const photoId = req.body

  if (!hairdresserId || !photoId) return res.sendStatus(400)

  try {
    const hairdresser = await Hairdresser.findById(hairdresserId)
    hairdresser.uploadPhotoToPortfolio(photoId)
    res.send(photoId)
  } catch (err) {
    res.sendStatus(404)
  }
})

module.exports = router
