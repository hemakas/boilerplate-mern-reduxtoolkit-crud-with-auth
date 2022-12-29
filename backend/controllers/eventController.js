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

// get a single event by id ----------------------------
const getEventById = asyncHandler(async (req, res) => {
    // const id = req.params.id
    const { id } = req.body

    // check if id is valid
    // if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    //     return res.status(404).json({ message: 'Invalid Id' })
    // }

    const event = await Event.findOne({ _id: id })

    // if no event found
    if (event) {
        res.json({
            _id: event.id,
            userId: event.userId,
            googleId: event.googleId,
            title: event.title,
            description: event.description,
            start: event.start,
            end: event.end,
            isCompleted: event.isCompleted
        })
    } else {
        return res.status(400).json({ message: 'o event found for this ID' })
    }
})

// fetch events belongs to a user ----------------------------
const getEventsByUser = asyncHandler(async (req, res) => {

    const events = await Event.find({ userId: req.user.id })

    // if no notes found
    res.status(200).json(events)
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
    const event = await Event.findById(req.params.id)

    if (!event) {
        return res.status(400).json({ message: 'Event not found' })
    }

    const { userId, title, description, start, end } = req.body

    const updateEvent = await Event.findByIdAndUpdate(
        req.params.id,
        { 
            userId,
            title,
            description,
            start,
            end,
        },
        {
            new: true
        }
    ) 

    res.json(`Event with Id "${updateEvent._id}" updated`)

})

// delete event ----------------------------
const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id)

    if (!event) {
        return res.status(400).json({ message: 'Event not found' })
    }

    // make sure the logged in user matches the event's user
    if (event.userId.toString() !== req.user.id) {
        res.status(401).json({ message: 'User not authorized' })
    }

    const result = await event.remove()

    res.status(200).json({ message: `Event '${result.title}' deleted successfully` })

})

module.exports = {
    getAllEvents,
    getEventById,
    getEventsByUser,
    createEvent,
    updateEvent,
    deleteEvent
}