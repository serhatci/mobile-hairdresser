const express = require('express')

const router = express.Router()

router.get('/session', (req, res) => {
  res.send(req.sessions)
})

module.exports = router
