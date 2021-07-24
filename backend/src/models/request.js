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
          stateCode: {
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
        createdAt: { type: Date, default: Date.now },
      },
    ],
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo',
        autopopulate: true,
      },
    ],
    eventAddress: {
      city: {
        type: String,
        default: '',
      },
      stateCode: {
        type: String,
        default: '',
      },
      postcode: { type: Number, default: '' },
      location: [],
    },
  },
  { timestamps: true }
)

RequestSchema.plugin(autopopulate)
module.exports = mongoose.model('Request', RequestSchema)
