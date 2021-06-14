const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const PhotoSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    taggedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
)

PhotoSchema.plugin(autopopulate)
module.exports = mongoose.model('Photo', PhotoSchema)
