class Photo {
  constructor(fileName) {
    this.id = undefined
    this.fileName = fileName
    this.taggedUsers = []
    this.likedBy = []
  }
}

module.exports = Photo
