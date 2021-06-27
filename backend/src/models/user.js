/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const { isAlphanumeric, isInt } = require('validator')

const PrivateMessage = require('./private-message')
const MessageBoxSchema = require('./message-box')
const Reply = require('./reply')

const UserSchema = new mongoose.Schema(
  {
    // Base class for Hairdresser and Customer
    firstName: {
      type: String,
      trim: true,
      validate: [isAlphanumeric, 'First name should contain letters & numbers only'],
    },
    middleName: {
      type: String,
      trim: true,
      validate: [isAlphanumeric, 'Middle name should contain letters & numbers only'],
    },
    lastName: {
      type: String,
      trim: true,
      validate: [isAlphanumeric, 'Last name should contain letters & numbers only'],
    },
    city: {
      type: String,
      trim: true,
      default: '',
    },
    state: {
      type: String,
      trim: true,
      default: '',
    },
    postcode: { type: String, default: '' },
    tel: {
      type: String,
      trim: true,
      validate: [isInt, 'Telephone should contain numbers only'],
    },
    repliedRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request',
      },
    ],
    profilePhoto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo',
    },
    messageBox: {
      type: MessageBoxSchema,
      default: {},
    },
  },
  {
    timestamps: true,
    discriminatorKey: 'type',
    toJSON: {
      virtuals: true,
    },
  }
)

// eslint-disable-next-line func-names
UserSchema.virtual('fullName').get(function () {
  return this.middleName
    ? `${this.firstName} ${this.middleName} ${this.lastName}`
    : `${this.firstName} ${this.lastName}`
})

class User {
  async addProfilePhoto(photo) {
    this.profilePhoto = photo
    await this.save()
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
UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
})
module.exports = mongoose.model('User', UserSchema)
