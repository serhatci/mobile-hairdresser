class Photo {
  constructor(fileName, description) {
    this.id = undefined
    this.fileName = fileName
    this.description = description
    this.taggedUsers = []
    this.likedBy = []
  }
}

module.exports = Photo
