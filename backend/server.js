const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors');

// error handler middleware
const { errorHandler } = require('./middleware/errorMiddleware')

// db connection
const connectDB = require('./config/db')

// port definetion
const port = process.env.PORT || 5000

// connect to db
connectDB()

const app = express()

// custom error handler: overrides the default express error handler
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))