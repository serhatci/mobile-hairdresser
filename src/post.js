class Post {
  // Base class for posts
  constructor(user, postMessage, id) {
    this.user = user
    this.postMessage = postMessage
    this.id = id
    this.date = new Date()
  }
}

module.exports = Post
