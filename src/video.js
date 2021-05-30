class Video {
  constructor(fileName, title = '', description = '') {
    this.id = undefined
    this.createdAt = new Date()
    this.fileName = fileName
    this.title = title
    this.description = description
    this.taggedUsers = []
    this.likedBy = []
  }
}

module.exports = Video
