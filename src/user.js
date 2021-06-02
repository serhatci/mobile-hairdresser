const PrivateMessage = require('./private-message')
const MessageBox = require('./message-box')
const Reply = require('./reply')

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
    this.repliedRequests = []
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

  unTagPhoto(photo, user) {
    const userIndex = photo.taggedUsers.indexOf(user)
    photo.taggedUsers.splice(userIndex, 1)
  }

  likeVideo(video) {
    video.likedBy.push(this)
  }

  unlikeVideo(video) {
    const videoIndex = video.likedBy.indexOf(video)
    video.likedBy.splice(videoIndex, 1)
  }

  replyRequest(request, message, ...photos) {
    const reply = new Reply(this, message, ...photos)
    request.replies.push(reply)

    if (this.repliedRequests.find(r => r === request)) return
    this.repliedRequests.push(request)
  }

  deleteReply(request, reply) {
    const replyIndex = request.replies.indexOf(reply)
    request.replies.splice(replyIndex, 1)

    if (this.repliedRequests.find(r => r === request)) return
    this.repliedRequests.push(request)
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
    this.messageBox.setMessageAsSeen(privateMessage)
  }

  unreadPrivateMessage(privateMessage) {
    this.messageBox.setMessageAsUnSeen(privateMessage)
  }

  recallPrivateMessage(privateMessage) {
    privateMessage.receiver.messageBox.deleteUnseenMessage(privateMessage)
    this.messageBox.deleteSeenMessage(privateMessage)
  }
}

module.exports = User
