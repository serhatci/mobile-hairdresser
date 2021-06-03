const Post = require('./post')

class Review extends Post {
  constructor(user, message, rating) {
    super(user, message)
    this.rating = rating
  }
}

module.exports = Review
