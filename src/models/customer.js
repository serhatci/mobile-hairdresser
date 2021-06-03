const User = require('./user')
const Request = require('./request')
const Review = require('./review')

class Customer extends User {
  constructor(name, surname, email, password) {
    super(name, surname, email, password)
    this.customerRequests = []
    this.hairdresserReviews = []
    this.profilePhoto = undefined
  }

  get info() {
    return {
      fullname: this.fullName,
      email: this.email,
      requests: this.customerRequests,
      profilePhoto: this.profilePhoto,
    }
  }

  addProfilePhoto(photo) {
    this.profilePhoto = photo
  }

  addPhotoToAdviceRequest(photo, adviceRequest) {
    adviceRequest.photos.push(photo)
  }

  postRequest(type, title, message, ...photos) {
    const request = new Request(this, type, title, message, ...photos)
    this.customerRequests.push(request)
  }

  deleteRequest(request) {
    const requestIndex = this.customerRequests.indexOf(request)
    this.customerRequests.splice(requestIndex, 1)
  }

  reviewHairdresser(hairdresser, message, rating) {
    const review = new Review(this, message, rating)
    hairdresser.customerReviews.push(review)
    this.hairdresserReviews.push(review)
  }

  deleteHairdresserReview(hairdresser, review) {
    const reviewIndex = hairdresser.customerReviews.indexOf(review)
    hairdresser.customerReviews.splice(reviewIndex, 1)
    this.hairdresserReviews.splice(reviewIndex, 1)
  }
}

module.exports = Customer
