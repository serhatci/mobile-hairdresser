/* eslint-disable no-param-reassign */
const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const User = require('./user')

const CustomerSchema = new mongoose.Schema(
  {
    customerRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request',
        autopopulate: true,
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

class Customer {
  get info() {
    return {
      fullname: this.fullName,
      email: this.email,
      requests: this.customerRequests,
      profilePhoto: this.profilePhoto,
    }
  }

  async addPhotoToAdviceRequest(photo, adviceRequest) {
    adviceRequest.photos.push(photo)
    await adviceRequest.save()
  }

  async postRequest(request) {
    this.customerRequests.push(request)
    await this.save()
    return this
  }

  async deleteRequest(requestId) {
    // eslint-disable-next-line no-underscore-dangle
    const index = this.customerRequests.findIndex(item => item._id == requestId)
    this.customerRequests.splice(index, 1)
    await this.save()
    return this
  }

  async reviewHairdresser(hairdresser, review) {
    hairdresser.customerReviews.push(review)
    await hairdresser.save()
    this.hairdresserReviews.push(review)
    await this.save()
  }

  async deleteHairdresserReview(hairdresser, review) {
    const reviewIndex = hairdresser.customerReviews.indexOf(review)
    hairdresser.customerReviews.splice(reviewIndex, 1)
    await hairdresser.save()
    this.hairdresserReviews.splice(reviewIndex, 1)
    await this.save()
  }
}

CustomerSchema.loadClass(Customer)
CustomerSchema.plugin(autopopulate)
module.exports = User.discriminator('Customer', CustomerSchema, 'Customer')
