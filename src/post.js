class Post {
  // Base class for posts
  id = undefined

  date = new Date()

  constructor(user, message) {
    this.user = user
    this.message = message
  }
}

module.exports = Post
