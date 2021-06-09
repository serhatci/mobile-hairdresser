const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const PhotoSchema = new mongoose.Schema(
  {
    fileName: String,
    description: String,
    taggedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true,
      },
    ],
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true,
      },
    ],
  },
  { timestamps: true }
)

PhotoSchema.plugin(autopopulate)
module.exports = mongoose.model('Photo', PhotoSchema)
