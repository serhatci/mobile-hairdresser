const mongoose = require('mongoose')

const CertificateSchema = new mongoose.Schema({
  fileName: String,
  title: String,
})

module.exports = mongoose.model('Certificate', CertificateSchema)
