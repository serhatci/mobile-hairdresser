const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const VideoSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  title: String,
  description: String,
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
})

VideoSchema.plugin(autopopulate)
module.exports = mongoose.model('Video', VideoSchema)
