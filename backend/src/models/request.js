const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const RequestSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Sender ID should be provided!'],
    },
    senderFullName: {
      type: String,
      required: [true, 'Fullname of sender should be provided!'],
    },
    message: {
      type: String,
      required: [true, 'Message should be provided!'],
    },
    requestType: {
      type: String,
      required: [true, 'Request Type should be provided!'],
    },
    replies: [
      {
        senderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        senderFullName: {
          type: String,
          required: true,
        },
        senderAddress: {
          city: {
            type: String,
            default: '',
          },
          state: {
            type: String,
            default: '',
          },
          postcode: { type: Number, default: '' },
          location: [],
        },
        message: {
          type: String,
          required: true,
        },
        photos: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Photo',
            autopopulate: true,
          },
        ],
      },
    ],
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo',
        autopopulate: true,
      },
    ],
    senderAddress: {
      city: {
        type: String,
        default: '',
      },
      state: {
        type: String,
        default: '',
      },
      postcode: { type: Number, default: '' },
      location: [],
    },
  },
  { timestamps: true }
)

class Request {
  async addReply(reply) {
    this.replies.push(reply)
    await this.save()
    return this
  }
}

RequestSchema.loadClass(Request)
RequestSchema.plugin(autopopulate)
module.exports = mongoose.model('Request', RequestSchema)
