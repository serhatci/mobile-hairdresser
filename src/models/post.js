const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const PostSchema = new mongoose.Schema(
  {
    // Base schema for Request, Reply, Review
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true, discriminatorKey: 'type' }
)

PostSchema.plugin(autopopulate)
module.exports = mongoose.model('Post', PostSchema)
