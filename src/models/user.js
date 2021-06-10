const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const PrivateMessage = require('./private-message')
const MessageBoxSchema = require('./message-box')
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
      },
    ],
    messageBox: {
      type: MessageBoxSchema,
      default: {},
    },
  },
  { timestamps: true, discriminatorKey: 'type' }
)

class User {
  get fullName() {
    return `${this.name} ${this.surname}`
  }

  async uploadPhotoToPost(photo, post) {
    post.photos.push(photo)
    await post.save()
  }

  async likePhoto(photo) {
    photo.likedBy.push(this)
    await photo.save()
  }

  async unlikePhoto(photo) {
    const photoIndex = photo.likedBy.indexOf(photo)
    photo.likedBy.splice(photoIndex, 1)
    await photo.save()
  }

  async tagPhoto(photo, user) {
    photo.taggedUsers.push(user)
    await photo.save()
  }

  async unTagPhoto(photo, user) {
    const userIndex = photo.taggedUsers.indexOf(user)
    photo.taggedUsers.splice(userIndex, 1)
    await photo.save()
  }

  async likeVideo(video) {
    video.likedBy.push(this)
    await video.save()
  }

  async unlikeVideo(video) {
    const videoIndex = video.likedBy.indexOf(video)
    video.likedBy.splice(videoIndex, 1)
    await video.save()
  }

  async replyRequest(request, message, ...photos) {
    const reply = new Reply(this, message, ...photos)
    request.replies.push(reply)
    await request.save()

    if (this.repliedRequests.find(r => r === request)) {
      this.repliedRequests.push(request)
      await this.save()
    }
  }

  async deleteReply(request, reply) {
    const replyIndex = request.replies.indexOf(reply)
    request.replies.splice(replyIndex, 1)
    await request.save()

    if (this.repliedRequests.find(r => r === request)) {
      this.repliedRequests.push(request)
      await request.save()
    }
  }

  async sendPrivateMessage(receiver, title, message) {
    const privateMessage = await PrivateMessage.create(this, receiver, title, message)
    receiver.messageBox.receiveMessage(privateMessage)
    this.messageBox.storeSentMessage(privateMessage)
  }

  async deletePrivateMessage(privateMessage) {
    this.messageBox.deleteSeenMessage(privateMessage)
  }

  async readPrivateMessage(privateMessage) {
    this.messageBox.setMessageAsSeen(privateMessage)
  }

  async unreadPrivateMessage(privateMessage) {
    this.messageBox.setMessageAsUnSeen(privateMessage)
  }

  async recallPrivateMessage(privateMessage) {
    privateMessage.receiver.messageBox.deleteUnseenMessage(privateMessage)
    this.messageBox.deleteSeenMessage(privateMessage)
  }
}

UserSchema.loadClass(User)
UserSchema.plugin(autopopulate)
module.exports = mongoose.model('User', UserSchema)
