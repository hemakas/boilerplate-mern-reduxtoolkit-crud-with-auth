const express = require('express')
const router = express.Router()
const userController =  require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.route('/')
  .get(protect, userController.getAllUsers)
  .post(protect, userController.registerUser)
  .patch(protect, userController.updateUser)

router.route('/login')
  .post(userController.loginUser)

router.route('/me')
  .get(protect, userController.getMe)

router.route('/:id')
  .get(protect, userController.getUserById)
  .delete(protect, userController.deleteUser)

module.exports = router