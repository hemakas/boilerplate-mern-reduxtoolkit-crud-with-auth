const asyncHandler = require('express-async-handler')

const Event = require('../models/Event')

// fetch all events
const allEvents = asyncHandler(async (req, res) => {
    const events = await Event.find()
    res.status(200).json(events)
})

// fetch events belongs to a user
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

// update event
const updateEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id)

    // check event
    if (!event) {
        res.status(400)
        throw new Error('Event not found')
    }

    // check user logged in
    if (!req.user.id) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the logged in user matches the event's user
    if (event.userId.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    // update event by id
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    // return updated event
    res.status(200).json(updatedEvent)
})

// delete event
const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id)

    // check event
    if (!event) {
      res.status(400)
      throw new Error('event not found')
    }
  
    // check user logged in
    if (!req.user.id) {
      res.status(401)
      throw new Error('User not found')
    }
  
    // make sure the logged in user matches the event's user
    if (event.userId.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }
  
    // delete event
    await event.remove()
  
    // return deleted event's id
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    allEvents,
    getEventsByUser,
    createEvent,
    updateEvent,
    deleteEvent
}