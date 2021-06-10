const mongoose = require('mongoose')

const Post = require('./post')

const ReviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
})

module.exports = Post.discriminator('Review', ReviewSchema)
