const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

// register user
router.post('/', registerUser)

// login user
router.post('/login', loginUser)

// logged in user
router.get('/me', protect, getMe)

module.exports = router