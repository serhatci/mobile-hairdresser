const Post = require('./post')

class PostRequest extends Post {
  constructor(user, type, postMessage, id) {
    super(user, postMessage, id)
    this.type = type
    this.replies = []
    this.photos = [] // optional
  }
}

module.exports = PostRequest
