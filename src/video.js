class Video {
  constructor(fileName, title, description, id) {
    this.id = id
    this.fileName = fileName
    this.title = title
    this.description = description
    this.taggedUsers = []
    this.likedBy = []
  }
}

module.exports = Video
