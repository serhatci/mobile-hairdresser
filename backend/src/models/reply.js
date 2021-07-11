const mongoose = require('mongoose')

const ReplySchema = new mongoose.Schema(
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
  { timestamps: true }
)

module.exports = mongoose.model('Reply', ReplySchema)
