const User = require('./user')
const CustomerRequest = require('./request')

class Customer extends User {
  constructor(name, surname, email, password, id) {
    super(name, surname, email, password, id)
    this.customerRequests = []
    this.profilePhoto = undefined
  }

  addProfilePhoto(photo) {
    this.profilePhoto = photo
  }

  addPhotoToAdviceRequest(photo, adviceRequest) {
    adviceRequest.photos.push(photo)
  }

  writeCustomerRequest(type, message, id) {
    return new CustomerRequest(this, type, message, id)
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
