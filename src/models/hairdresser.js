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
    },
  ],
  portfolioPhotos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo',
    },
  ],
  certificates: [],
  customerReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
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

  async uploadPhotoToPortfolio(photo) {
    this.portfolioPhotos.push(photo)
    await this.save()
  }

  async uploadVideoToPortfolio(video) {
    this.portfolioVideos.push(video)
    await this.save()
  }

  async deletePhotoFromPortfolio(photo) {
    this.portfolioPhotos = this.portfolioPhotos.filter(p => p !== photo)
    await this.save()
  }

  async deleteVideoFromPortfolio(video) {
    this.portfolioVideos = this.portfolioVideos.filter(p => p !== video)
    await this.save()
  }

  async addEmployerReference(employerName, shopName, employerAddress, employerEmail, employerTelephone) {
    const reference = new EmployerReference({
      name: employerName,
      shop: shopName,
      address: employerAddress,
      email: employerEmail,
      telephone: employerTelephone,
    })
    this.employerReferences.push(reference)
    await this.save()
  }

  async deleteEmployerReference(reference) {
    const referenceIndex = this.employerReferences.indexOf(reference)
    this.employerReferences.splice(referenceIndex, 1)
    await this.save()
  }

  async tagVideo(video, user) {
    video.taggedUsers.push(user)
    await video.save()
  }

  async unTagVideo(video, user) {
    const userIndex = video.taggedUsers.indexOf(user)
    video.taggedUsers.splice(userIndex, 1)
    await video.save()
  }

  async uploadCertificate(certificate) {
    this.certificates.push(certificate)
    await this.save()
  }

  async deleteCertificate(certificate) {
    const certificateIndex = this.certificates.indexOf(certificate)
    this.certificates.splice(certificateIndex, 1)
    await this.save()
  }
}

HairdresserSchema.loadClass(Hairdresser)
module.exports = User.discriminator('Hairdresser', HairdresserSchema, 'Hairdresser')
