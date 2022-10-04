const Event = require('../models/Event')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// fetch all events ----------------------------
const getAllEvents = asyncHandler(async (req, res) => {
    const events = await Event.find().lean()

    // if no events found
    if (!events?.length) {
        return res.status(400).json({ message: 'No events found' })
    }

    const eventsWithUser = await Promise.all(events.map(async (event) => {
        const user = await User.findById(event.userId).lean().exec()
        return { ...event, name: user.name }
    }))

    res.json(eventsWithUser)
})

// fetch events belongs to a user ----------------------------
const getEventsByUser = asyncHandler(async (req, res) => {
    
    const events = await Event.find({ userId: req.user.id }).lean()

    // if no notes found
    if (!events?.length) {
        return res.status(400).json({ message: 'No events found for this user' })
    }

    const eventsWithUser = await Promise.all(events.map(async (event) => {
        const user = await User.findById(event.userId).lean().exec()
        return { ...event, name: user.name }
    }))

    res.json(eventsWithUser)
})

// create event ----------------------------
const createEvent = asyncHandler(async (req, res) => {
    const { userId, googleId, title, description, start, end } = req.body
    
    if (!title || !description || !start || !end) {
        return res.status(400).json({ message: 'All fields are required' })
    }
  
    const event = await Event.create({ userId, googleId, title, description, start, end })
  
    if (event) {
        return res.status(201).json({ message: 'New event created' })
    } else {
        return res.status(400).json({ message: 'Invalid event data received' })
    }
})

// update event ----------------------------
const updateEvent = asyncHandler(async (req, res) => {
    const { userId, title, description, start, end } = req.body

    // Confirm data
    if (!title || !description || !start || !end) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm event exists to update
    const event = await Event.findById(userId).exec()

    if (!event) {
        return res.status(400).json({ message: 'Event not found' })
    }

    // authorize to update event
    // if (event.userId.toString() !== req.user._id) {
    //     return res.status(401).json({ message: 'User not authorized to update this event' })
    // }

    event.title = title
    event.description = description
    event.start = start
    event.end = end

    const updatedEvent = await event.save()

    res.json(`${updatedEvent.title} event updated`)

})

// delete event ----------------------------
const deleteEvent = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Event ID required' })
    }

    // Confirm event exists to delete 
    const event = await Event.findById(id).exec()

    if (!event) {
        return res.status(400).json({ message: 'Event not found' })
    }

    // make sure the logged in user matches the event's user
    if (event.userId.toString() !== req.user.id) {
        res.status(401).json({ message: 'User not authorized' })
    }

    const result = await event.deleteOne()

    res.json({ message: `Event '${result.title}' deleted successfully` })

})

module.exports = {
    getAllEvents,
    getEventsByUser,
    createEvent,
    updateEvent,
    deleteEvent
}