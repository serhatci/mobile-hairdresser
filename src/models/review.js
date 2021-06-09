const mongoose = require('mongoose')

const Post = require('./post')

const ReviewSchema = new mongoose.Schema({
  rating: Number,
})

module.exports = Post.discriminator('Review', ReviewSchema)
