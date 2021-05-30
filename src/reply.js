const Post = require('./post')

class Reply extends Post {
  constructor(user, message, ...photos) {
    super(user, message)
    this.photos = [...photos] /// optional
  }
}

module.exports = Reply
