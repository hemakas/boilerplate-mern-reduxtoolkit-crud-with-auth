const express = require('express')
const router = express.Router()
const eventController = require('../controllers/eventController')
const { protect } = require('../middleware/authMiddleware')

router.route('/')
    .get(protect, eventController.getAllEvents)
    .post(protect, eventController.createEvent)
    // .put(protect, eventController.updateEvent)
    .delete(protect, eventController.deleteEvent)

router.route('/user/:id')
    .get(protect, eventController.getEventsByUser)

router.route('/:id')
    .get(protect, eventController.getEventById)
    .put(eventController.updateEvent)

module.exports = router
 