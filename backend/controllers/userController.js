const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')

const User = require('../models/User')

// register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, level } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    level
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
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

// get all users
const allUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
  res.status(200).json(users)
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
  registerUser,
  loginUser,
  allUsers,
  getMe,
  getUserById
}
  
  