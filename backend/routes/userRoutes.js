const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser
} = require('../controllers/userController')
// const { protect } = require('../middleware/authMiddleware')

// register user
router.post('/', registerUser)

// login user
router.post('/login', loginUser)

module.exports = router