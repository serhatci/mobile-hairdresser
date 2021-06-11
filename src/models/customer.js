const mongoose = require('mongoose')

const User = require('./user')
const Request = require('./request')
const Review = require('./review')

const CustomerSchema = new mongoose.Schema({
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
  profilePhoto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo',
    autopopulate: true,
  },
})

class Customer {
  get info() {
    return {
      fullname: this.fullName,
      email: this.email,
      requests: this.customerRequests,
      profilePhoto: this.profilePhoto,
    }
  }

  async addProfilePhoto(photo) {
    this.profilePhoto = photo
    await this.save()
  }

  async addPhotoToAdviceRequest(photo, adviceRequest) {
    adviceRequest.photos.push(photo)
    await adviceRequest.save()
  }

  async postRequest(type, title, message, ...photos) {
    const request = await Request.create(this, type, title, message, ...photos)
    this.customerRequests.push(request)
    await this.save()
  }

  async deleteRequest(request) {
    const requestIndex = this.customerRequests.indexOf(request)
    this.customerRequests.splice(requestIndex, 1)
    await this.save()
  }

  async reviewHairdresser(hairdresser, message, rating) {
    const review = await Review.create(this, message, rating)
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
module.exports = User.discriminator('Customer', CustomerSchema, 'Customer')
