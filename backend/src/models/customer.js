/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose')
const User = require('./user')

const CustomerSchema = new mongoose.Schema(
  {
    customerRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request',
      },
    ],
    hairdresserReviews: [
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
    },
  }
)

// BELOW METHODS WILL BE iMPLEMENTED LATER

// class Customer {
//   async addPhotoToAdviceRequest(photo, adviceRequest) {
//     adviceRequest.photos.push(photo)
//     await adviceRequest.save()
//   }

//   async reviewHairdresser(hairdresser, review) {
//     hairdresser.customerReviews.push(review)
//     await hairdresser.save()
//     this.hairdresserReviews.push(review)
//     await this.save()
//   }

//   async deleteHairdresserReview(hairdresser, review) {
//     const reviewIndex = hairdresser.customerReviews.indexOf(review)
//     hairdresser.customerReviews.splice(reviewIndex, 1)
//     await hairdresser.save()
//     this.hairdresserReviews.splice(reviewIndex, 1)
//     await this.save()
//   }
// }
// CustomerSchema.loadClass(Customer)

module.exports = User.discriminator('Customer', CustomerSchema, 'Customer')
