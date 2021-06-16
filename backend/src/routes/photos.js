/* eslint-disable consistent-return */
const express = require('express')

const router = express.Router()
const Photo = require('../models/photo')

/* POST create a photo */
router.post('/', async (req, res) => {
  if (!req.body) return res.sendStatus(400)

  const photoToCreate = {
    filename: req.body.filename,
    description: req.body.description,
  }

  try {
    const createdPhoto = await Photo.create(photoToCreate)
    res.send(createdPhoto)
  } catch {
    res.sendStatus(404)
  }
})

module.exports = router
