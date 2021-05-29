class User {
  // Base class for Hairdresser and Customer
  constructor(name, surname, email, password) {
    this.name = name
    this.surname = surname
    this.email = email
    this.password = password
    this.id = undefined
    this.createdAt = new Date()
    this.address = ''
    this.tel = ''
    this.privateMessages = []
  }

  get fullName() {
    return `${this.name} ${this.surname}`
  }

  uploadPhoto(photo) {
    this.photos.push(photo)
  }

  likePhoto(photo) {
    photo.likedBy.push(this)
  }

  tagPhoto(photo, user) {
    photo.taggedUsers.push(user)
  }

  likeVideo(video) {
    video.likedBy.push(this)
  }

  sendPM(user, message) {
    user.privateMessages.push(message)
  }
}

module.exports = User
