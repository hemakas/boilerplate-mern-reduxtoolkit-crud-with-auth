const asyncHandler = require('express-async-handler')

const Event = require('../models/Event')

// fetch all events
const allEvents = asyncHandler(async (req, res) => {
    const events = await Event.find()
    res.status(200).json(events)
})

// fetch all events belongs to a particular user
const getEventsByUser = asyncHandler(async (req, res) => {
    const events = await Event.find({ userId: req.user.id })
    res.status(200).json(events)
})

// create event
const createEvent = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.description || !req.body.start || !req.body.end) {
        res.status(400)
        throw new Error('Please add title, description, start and end details')
    }
  
    const event = await Event.create({
        userId: req.user.id,
        googleId: req.body.googleId,
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
    })
  
    res.status(200).json(event)
})

module.exports = {
    allEvents,
    getEventsByUser,
    createEvent
}