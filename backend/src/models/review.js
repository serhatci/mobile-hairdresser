const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema(
  {
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hairdresser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

ReviewSchema.index({ reviewer: 1, hairdresser: 1 }, { unique: true })
module.exports = mongoose.model('Review', ReviewSchema)
