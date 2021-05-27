const Post = require('./post')

class PostReply extends Post {
  constructor(user, postMessage, id) {
    super(user, postMessage, id)
    this.photos = [] // optional
  }
}

module.exports = PostReply
