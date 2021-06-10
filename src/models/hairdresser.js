const mongoose = require('mongoose')

const User = require('./user')
const EmployerReference = require('./employer-reference')

const HairdresserSchema = new mongoose.Schema({
  availability: String, // [weekdays, weekends, after 7 pm, etc... ]
  experience: String, // [less than 1 year, 1 year, 2 year, etc... ]
  serviceArea: String, // perimeter in km around a location
  employerReferences: [],
  portfolioVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      autopopulate: true,
    },
  ],
  portfolioPhotos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo',
      autopopulate: true,
    },
  ],
  certificates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Certificate',
      autopopulate: true,
    },
  ],
  customerReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
      autopopulate: true,
    },
  ],
})

class Hairdresser {
  get portfolio() {
    return {
      fullname: this.fullName,
      email: this.email,
      serviceArea: this.serviceArea,
      availability: this.availability,
      experience: this.experience,
      portfolioVideos: this.portfolioVideos,
      portfolioPhotos: this.portfolioPhotos,
      customerReviews: this.customerReviews,
      ratings: this.ratings,
      certificates: this.certificates,
      employerReferences: this.employerReferences,
    }
  }

  uploadPhotoToPortfolio(photo) {
    this.portfolioPhotos.push(photo)
  }

  uploadVideoToPortfolio(video) {
    this.portfolioVideos.push(video)
  }

  deletePhotoFromPortfolio(photo) {
    this.portfolioPhotos = this.portfolioPhotos.filter(p => p !== photo)
  }

  deleteVideoFromPortfolio(video) {
    this.portfolioVideos = this.portfolioVideos.filter(p => p !== video)
  }

  addEmployerReference(employerName, shopName, employerAddress, employerEmail, employerTelephone) {
    this.employerReferences.push({
      name: employerName,
      shop: shopName,
      address: employerAddress,
      email: employerEmail,
      telephone: employerTelephone,
    })
  }

  deleteEmployerReference(reference) {
    const referenceIndex = this.employerReferences.indexOf(reference)
    this.employerReferences.splice(referenceIndex, 1)
  }

  tagVideo(video, user) {
    video.taggedUsers.push(user)
  }

  unTagVideo(video, user) {
    const userIndex = video.taggedUsers.indexOf(user)
    video.taggedUsers.splice(userIndex, 1)
  }

  uploadCertificate(certificate) {
    this.certificates.push(certificate)
  }

  deleteCertificate(certificate) {
    const certificateIndex = this.certificates.indexOf(certificate)
    this.certificates.splice(certificateIndex, 1)
  }
}

HairdresserSchema.loadClass(Hairdresser)
module.exports = User.discriminator('Hairdresser', HairdresserSchema, 'Hairdresser')
