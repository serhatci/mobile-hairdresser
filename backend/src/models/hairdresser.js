/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose')

const { isURL } = require('validator')

const User = require('./user')

const HairdresserSchema = new mongoose.Schema(
  {
    about: { type: String, maxLength: 300, trim: true },
    website: { type: String, trim: true, validate: [isURL, 'Website requires a valid URL'] },
    facebook: { type: String, trim: true, validate: [isURL, 'Facebook requires a valid URL'] },
    instagram: { type: String, trim: true, validate: [isURL, 'Instagram requires a valid URL'] },
    availability: {
      type: String,
      default: 'Available at anytime',
    },
    experienceInYears: {
      type: Number,
      trim: true,
      validate: [Number.isInteger, 'Only integer numbers are allowed!'],
      min: [0, 'Years of experience should not be negative'],
      max: [70, 'Years of experience should have a logical value'],
      default: 0,
    },
    serviceArea: {
      type: Number,
      trim: true,
      validate: [Number.isInteger, 'Only integer numbers are allowed!'],
      default: 0,
      min: [0, 'Service area can not be negative'],
      max: [1000, 'Service area should have a logical value'],
    }, // perimeter in km around a location
    portfolioPhotos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo',
      },
    ],
    certificates: [],
    customerReviews: [
      {
        reviewer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: [true, 'Reviewer Id should be provided!'],
        },
        rating: {
          type: Number,
          required: [true, 'Rating should be provided!'],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.customerReviews
        // eslint-disable-next-line no-underscore-dangle
        delete ret.__v
      },
      virtuals: true,
    },
  }
)

// BELOW METHODS WILL BE IMPLEMENTED LATER

// // eslint-disable-next-line func-names
// HairdresserSchema.virtual('averageRating').get(function () {
//   if (this.customerReviews.length == 0) return 0

//   const totalRating = this.customerReviews.reduce((a, b) => a + b.rating, 0)
//   return totalRating / this.customerReviews.length
// })

// HairdresserSchema.virtual('numberOfReviews').get(function () {
//   return this.customerReviews.length
// })

// class Hairdresser {
//   async uploadPhotoToPortfolio(photo) {
//     this.portfolioPhotos.push(photo)
//     await this.save()
//   }

//   async deletePhotoFromPortfolio(photo) {
//     this.portfolioPhotos = this.portfolioPhotos.filter(p => p !== photo)
//     await this.save()
//   }

//   async deleteEmployerReference(reference) {
//     const referenceIndex = this.employerReferences.indexOf(reference)
//     this.employerReferences.splice(referenceIndex, 1)
//     await this.save()
//   }

//   async uploadCertificate(certificate) {
//     this.certificates.push(certificate)
//     await this.save()
//   }

//   async deleteCertificate(certificate) {
//     const certificateIndex = this.certificates.indexOf(certificate)
//     this.certificates.splice(certificateIndex, 1)
//     await this.save()
//   }
// }

// HairdresserSchema.loadClass(Hairdresser)
module.exports = User.discriminator('Hairdresser', HairdresserSchema, 'Hairdresser')
