const mongoose = require('mongoose')

const Post = require('./post')

const RequestSchema = new mongoose.Schema({
  requestType: String,
  title: String,
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
})

module.exports = Post.discriminator('Request', RequestSchema)
