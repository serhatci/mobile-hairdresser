const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const RequestSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    senderFullName: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    requestType: {
      type: String,
      required: true,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply',
        autopopulate: true,
      },
    ],
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo',
        autopopulate: true,
      },
    ],
    address: {
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

RequestSchema.plugin(autopopulate)
module.exports = mongoose.model('Request', RequestSchema)
