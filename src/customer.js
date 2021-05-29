const User = require('./user')
const CustomerRequest = require('./request')

class Customer extends User {
  constructor(name, surname, email, password) {
    super(name, surname, email, password)
    this.customerRequests = []
    this.profilePhoto = undefined
  }

  addProfilePhoto(photo) {
    this.profilePhoto = photo
  }

  addPhotoToAdviceRequest(photo, adviceRequest) {
    adviceRequest.photos.push(photo)
  }

  writeCustomerRequest(type, message) {
    return new CustomerRequest(this, type, message)
  }

  postRequest(request) {
    this.customerRequests.push(request)
  }

  rateHairdresser(hairdresser, rating) {
    hairdresser.ratings.push(rating)
  }

  reviewHairdresser(hairdresser, review) {
    hairdresser.customerReviews.push(review)
  }
}

module.exports = Customer
