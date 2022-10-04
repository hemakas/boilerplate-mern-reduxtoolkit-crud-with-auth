const express = require('express')
const router = express.Router()
const eventController = require('../controllers/eventController')
const { protect } = require('../middleware/authMiddleware')

router.route('/')
    .get(protect, eventController.getAllEvents)
    .post(protect, eventController.createEvent)
    .patch(protect, eventController.updateEvent)
    .delete(protect, eventController.deleteEvent)

router.route('/:id')
    .get(protect, eventController.getEventsByUser)

module.exports = router
