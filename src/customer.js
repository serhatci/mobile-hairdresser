const User = require('./user')
const Request = require('./request')
const Reply = require('./reply')

class Customer extends User {
  constructor(name, surname, email, password) {
    super(name, surname, email, password)
    this.customerRequests = []
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

  writeCustomerRequest(type, title, message, ...photos) {
    return new Request(this, type, title, message, ...photos)
  }

  postRequest(request) {
    this.customerRequests.push(request)
  }

  writeReply(message, ...photos) {
    return new Reply(this, message, ...photos)
  }

  replyToCustomerRequest(request, reply) {
    request.replies.push(reply)
  }

  rateHairdresser(hairdresser, rating) {
    hairdresser.ratings.push(rating)
  }

  reviewHairdresser(hairdresser, review) {
    hairdresser.customerReviews.push(review)
  }
}

module.exports = Customer
