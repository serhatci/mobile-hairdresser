const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const PrivateMessage = require('./private-message')
const MessageBox = require('./message-box')
const Reply = require('./reply')

const UserSchema = new mongoose.Schema(
  {
    // Base class for Hairdresser and Customer
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: String,
    tel: String,
    repliedRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request',
        autopopulate: true,
      },
    ],
    messageBox: {
      type: MessageBox,
      default: {},
    },
  },
  { timestamps: true, discriminatorKey: 'type' }
)

class User {
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

UserSchema.loadClass(User)
UserSchema.plugin(autopopulate)
module.exports = mongoose.model('User', UserSchema)
