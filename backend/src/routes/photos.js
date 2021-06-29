/* eslint-disable consistent-return */
const express = require('express')

const router = express.Router()
const Photo = require('../models/photo')

router.post('/', async (req, res, next) => {
  if (!req.body) return res.sendStatus(400)

  const photoToCreate = {
    filename: req.body.filename,
    description: req.body.description,
  }

  try {
    const createdPhoto = await Photo.create(photoToCreate)
    res.send(createdPhoto)
  } catch (err) {
    return next(err)
  }
})

module.exports = router
