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
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      unique: true,
    },
    start: {
      type: Date,
      default: new Date()
    },
    end: {
      type: Date,
      default: new Date()
    },
    completed: {
      type: Boolean,
      default: false
    }
    
  }, { timestamps: true })

module.exports = mongoose.model('Event', eventSchema)
