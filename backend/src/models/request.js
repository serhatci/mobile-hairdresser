const mongoose = require('mongoose')

const RequestSchema = new mongoose.Schema(
  {
    petitioner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
    },
    requestType: {
      type: String,
      required: true,
    },
    title: {
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
  },
  { timestamps: true }
)

module.exports = mongoose.model('Request', RequestSchema)
