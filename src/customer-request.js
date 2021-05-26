const UserPost = require('./user-post')

class CustomerRequest extends UserPost {
  constructor(user, type, postMessage, id) {
    super(user, postMessage, id)
    this.type = type
    this.replies = []
    this.photos = [] // optional
  }
}

module.exports = CustomerRequest