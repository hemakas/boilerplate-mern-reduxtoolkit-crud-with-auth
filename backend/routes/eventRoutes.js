const express = require('express')
const router = express.Router()
const {
    allEvents,
    getEventsByUser,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController')

// auth middleware
const { protect } = require('../middleware/authMiddleware')

// localhost:5000/api/events/ get all events, create event
// routes protected with auth middleware
router.route('/')
    .get(protect, allEvents)
    .post(protect, createEvent)

// localhost:5000/api/events/:id get events by user id
// routes protected with auth middleware
router.route('/:id')
    .get(protect, getEventsByUser)

// localhost:5000/api/events/:id update event, delete event
// routes protected with auth middleware
router.route('/:id')
    .put(protect, updateEvent)
    .delete(protect, deleteEvent)

module.exports = router
