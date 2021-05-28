class Post {
  // Base class for posts
  constructor(user, message, id) {
    this.user = user
    this.message = message
    this.id = id
    this.date = new Date()
  }
}

module.exports = Post
