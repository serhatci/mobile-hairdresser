const PrivateMessage = require('./private-message')
const MessageBox = require('./message-box')

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
    this.messageBox = new MessageBox()
  }

  get fullName() {
    return `${this.name} ${this.surname}`
  }

  uploadPhotoToPost(photo, post) {
    post.photos.push(photo)
  }

  likePhoto(photo) {
    photo.likedBy.push(this)
  }

  unlikePhoto(photo) {
    const photoIndex = photo.likedBy.indexOf(photo)
    photo.likedBy.splice(photoIndex, 1)
  }

  tagPhoto(photo, user) {
    photo.taggedUsers.push(user)
  }

  likeVideo(video) {
    video.likedBy.push(this)
  }

  sendPrivateMessage(receiver, title, message) {
    const privateMessage = new PrivateMessage(this, receiver, title, message)
    receiver.messageBox.receiveMessage(privateMessage)
    this.messageBox.storeSentMessage(privateMessage)
  }

  deletePrivateMessage(privateMessage) {
    this.messageBox.deleteSeenMessage(privateMessage)
  }

  readPrivateMessage(privateMessage) {
    this.messageBox.tagMessageAsSeen(privateMessage)
  }

  unreadPrivateMessage(privateMessage) {
    this.messageBox.tagMessageAsUnSeen(privateMessage)
  }

  recallPrivateMessage(privateMessage) {
    privateMessage.receiver.messageBox.deleteUnseenMessage(privateMessage)
    this.messageBox.deleteSeenMessage(privateMessage)
  }
}

module.exports = User
