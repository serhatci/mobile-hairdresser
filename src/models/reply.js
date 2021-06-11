const mongoose = require('mongoose')

const Post = require('./post')

const ReplySchema = new mongoose.Schema({
  photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo',
      autopopulate: true,
    },
  ],
})

module.exports = Post.discriminator('Reply', ReplySchema)
