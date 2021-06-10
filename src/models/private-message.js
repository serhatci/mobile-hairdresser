const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const PrivateMessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
      required: true,
    },
    title: String,
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

PrivateMessageSchema.plugin(autopopulate)
module.exports = mongoose.model('PrivateMessage', PrivateMessageSchema)
