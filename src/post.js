class Post {
  // Base class for posts
  constructor(user, message) {
    this.user = user
    this.message = message
    this.id = undefined
    this.date = new Date()
  }
}

module.exports = Post
