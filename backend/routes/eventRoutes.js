const express = require('express')
const router = express.Router()
const {
    allEvents,
    getEventsByUser,
    createEvent
} = require('../controllers/eventController')

// get all events
router.get('/', allEvents)

// get evnets by user id
router.get('/:id', getEventsByUser)

// create event
router.post('/', createEvent)

module.exports = router
