const Post = require('./post')

class Reply extends Post {
  photos = []

  constructor(user, message, id, photo) {
    super(user, message, id)
    this.photos = [...photo] /// optional
  }
}

module.exports = Reply
