const mongoose = require('mongoose')

const CertificateSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  title: String,
})

module.exports = mongoose.model('Certificate', CertificateSchema)
