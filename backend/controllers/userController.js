const User = require('../models/User')
const Event = require('../models/Event')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

// get all users ----------------------------
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').lean()
  if (!users?.length) {
    return res.status(400).json({ message: 'No users found' })
  }
  res.json(users)
})

// register user / create new user ----------------------------
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, level } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // Check if user exists
  const userExists = await User.findOne({ email }).lean().exec()

  if (userExists) {
    res.status(409).json({ message: 'User already exists' })
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    "password": hashedPassword,
    level
  })

  if (user) {
    return res.status(201).json({ message: 'New user created' })
  } else {
    return res.status(400).json({ message: 'Invalid user data received' })
  }

  // if (user) {
  //   res.status(201).json({
  //     _id: user.id,
  //     name: user.name,
  //     email: user.email,
  //     token: generateToken(user._id),
  //   })
  // } else {
  //   res.status(400).json({ message: 'Invalid user data' })
  // }
})

// update user ----------------------------
const updateUser = asyncHandler(async (req, res) => {
  const { id, name, email, password, level } = req.body

  if (!id || !name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const user = await User.findById(id).exec()

  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }

  // Check if user exists
  const userExists = await User.findOne({ email }).lean().exec()

  if (userExists && userExists?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate email' })
  }

  user.name = name
  user.email = email
  user.level = level

  if(password) {
    // Hash password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
  }

  const updatedUser = await user.save()

  res.json({ message: `${updatedUser.name} updated` })
})

// delete user ----------------------------
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }

  // Does the user still have assigned notes?
  const event = await Event.findOne({ userId: req.params.id }).lean().exec()
  if (event) {
    return res.status(400).json({ message: 'User has events' })
  }

  const result = await user.deleteOne()

  res.json({ message: `User named ${result.name} deleted successfully` })
})

// user login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// get logged in user data
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Generate JSON web token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

// get user by id
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }

  const user = await User.find({ _id: id });
  res.status(200).json(user)
})

module.exports = {
  getAllUsers,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  getMe,
  getUserById
}
  
  