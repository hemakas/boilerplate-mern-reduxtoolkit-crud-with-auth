const mongoose = require('mongoose')

const eventSchema = mongoose.Schema(
  {
    // foreign key
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    googleId: {
      type: String,
      required: true
    }, 
    title: {
      type: String,
      default: 'N/A',
    },
    description: {
      type: String,
      default: 'N/A'
    },
    start: {
      type: Date,
      default: new Date()
    },
    end: {
      type: Date,
      default: new Date()
    },
    isCompleted: {
      type: Boolean,
      default: false
    }
    
  }, { timestamps: true })

module.exports = mongoose.model('Event', eventSchema)
