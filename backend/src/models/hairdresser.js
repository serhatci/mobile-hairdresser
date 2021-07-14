/* eslint-disable no-param-reassign */
const mongoose = require('mongoose')

const { isURL } = require('validator')

const User = require('./user')
const EmployerReference = require('./employer-reference')

const HairdresserSchema = new mongoose.Schema(
  {
    about: { type: String, maxLength: 300, default: 'Please check my portfolio for more info.', trim: true }, // short info about hairdresser
    languages: { type: [], default: ['Deutsch'] },
    website: { type: String, trim: true, validate: [isURL, 'Requires a valid URL'] },
    facebook: { type: String, trim: true, validate: [isURL, 'Requires a valid URL'] },
    instagram: { type: String, trim: true, validate: [isURL, 'Requires a valid URL'] },
    availability: {
      type: String,
      default: 'Anytime',
      enum: { values: ['Anytime', 'Weekdays', 'Weekends'], message: '{VALUE} is not supported' },
    },
    experienceInYears: {
      type: Number,
      min: [0, 'Years of experience should not be negative'],
      max: [70, 'Years of experience should have a logical value'],
      default: 0,
    },
    serviceArea: { type: Number, default: 0 }, // perimeter in km around a location
    employerReferences: [],
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
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password
        // eslint-disable-next-line no-underscore-dangle
        delete ret.__v
      },
      virtuals: true,
    },
  }
)

// eslint-disable-next-line func-names
HairdresserSchema.virtual('averageRating').get(function () {
  if (this.customerReviews.length !== 0) {
    const totalRating = this.customerReviews.reduce((a, b) => a + b.rating, 0)
    return totalRating / this.customerReviews.length
  }
  return 0
})

class Hairdresser {
  async uploadPhotoToPortfolio(photo) {
    this.portfolioPhotos.push(photo)
    await this.save()
  }

  async deletePhotoFromPortfolio(photo) {
    this.portfolioPhotos = this.portfolioPhotos.filter(p => p !== photo)
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
