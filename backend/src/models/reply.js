const mongoose = require('mongoose')

const ReplySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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
