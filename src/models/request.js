const Post = require('./post')

class Request extends Post {
  constructor(user, type, title, message, ...photos) {
    super(user, message)
    this.type = type
    this.title = title
    this.replies = []
    this.photos = [...photos] // optional
  }
}

module.exports = Request
