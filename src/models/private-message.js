const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const PrivateMessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
    },
    title: String,
    message: String,
  },
  { timestamps: true }
)

PrivateMessageSchema.plugin(autopopulate)
module.exports = mongoose.model('PrivateMessage', PrivateMessageSchema)
