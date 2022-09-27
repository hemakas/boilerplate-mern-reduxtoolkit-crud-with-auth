const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  allUsers,
  getMe,
  getUserById
} = require('../controllers/userController')

// auth middleware
const { protect } = require('../middleware/authMiddleware')

// localhost:5000/api/users/register user
router.route('/')
  .post(registerUser)

// localhost:5000/api/users/ get all users
// routes protected with auth middleware
router.route('/')
  .get(protect, allUsers)

// login user
router.route('/login')
  .post(loginUser)

// logged in user details
router.route('/me')
  .get(protect, getMe)

// logged in user details
router.route('/:id')
  .get(protect, getUserById)

module.exports = router