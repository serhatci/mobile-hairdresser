/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const autopopulate = require('mongoose-autopopulate')

const { isEmail, isAlphanumeric, isInt } = require('validator')
const MessageBoxSchema = require('./message-box')
// const PrivateMessage = require('./private-message')

const UserSchema = new mongoose.Schema(
  {
    // Base class for Hairdresser and Customer
    email: {
      type: String,
      trim: true,
      validate: [isEmail, 'Email is not valid!'],
    },
    firstName: {
      type: String,
      trim: true,
      default: '',
      validate: [
        input => {
          if (input === '') return true
          return isAlphanumeric(input)
        },
        'First name should contain letters & numbers only',
      ],
    },
    lastName: {
      type: String,
      trim: true,
      default: '',
      validate: [
        input => {
          if (input === '') return true
          return isAlphanumeric(input)
        },
        'Last name should contain letters & numbers only',
      ],
    },
    address: {
      city: {
        type: String,
        default: '',
      },
      stateCode: {
        type: String,
        default: '',
      },
      postcode: { type: Number, default: 0 },
      location: [],
    },
    tel: {
      type: String,
      trim: true,
      validate: [isInt, 'Telephone should contain numbers only'],
    },
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
      transform(doc, ret) {
        delete ret.hash
        delete ret.salt
        delete ret.__v
      },
      virtuals: true,
    },
  }
)

// eslint-disable-next-line func-names
UserSchema.virtual('fullName').get(function () {
  if (this.firstName || this.lastName) {
    return `${this.firstName} ${this.lastName}`
  }
  return 'Anonymous'
})

// THIS METHODS WILL BE IMPLEMENTED LATER

// class User {
//   async addProfilePhoto(photo) {
//     this.profilePhoto = photo
//     await this.save()
//   }

//   async uploadPhotoToPost(photo, post) {
//     post.photos.push(photo)
//     await post.save()
//   }

//   async likePhoto(photo) {
//     photo.likedBy.push(this)
//     await photo.save()
//   }

//   async unlikePhoto(photo) {
//     const photoIndex = photo.likedBy.indexOf(photo)
//     photo.likedBy.splice(photoIndex, 1)
//     await photo.save()
//   }

//   async tagPhoto(photo, user) {
//     photo.taggedUsers.push(user)
//     await photo.save()
//   }

//   async unTagPhoto(photo, user) {
//     const userIndex = photo.taggedUsers.indexOf(user)
//     photo.taggedUsers.splice(userIndex, 1)
//     await photo.save()
//   }

//   async sendPrivateMessage(receiver, title, message) {
//     const privateMessage = await PrivateMessage.create(this, receiver, title, message)
//     receiver.messageBox.receiveMessage(privateMessage)
//     this.messageBox.storeSentMessage(privateMessage)
//   }

//   async deletePrivateMessage(privateMessage) {
//     this.messageBox.deleteSeenMessage(privateMessage)
//   }

//   async readPrivateMessage(privateMessage) {
//     this.messageBox.setMessageAsSeen(privateMessage)
//   }

//   async unreadPrivateMessage(privateMessage) {
//     this.messageBox.setMessageAsUnSeen(privateMessage)
//   }

//   async recallPrivateMessage(privateMessage) {
//     privateMessage.receiver.messageBox.deleteUnseenMessage(privateMessage)
//     this.messageBox.deleteSeenMessage(privateMessage)
//   }
// }
// UserSchema.loadClass(User)

UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
})
UserSchema.plugin(autopopulate)
module.exports = mongoose.model('User', UserSchema)
