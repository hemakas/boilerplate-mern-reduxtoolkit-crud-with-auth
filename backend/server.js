const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors');

// error handler middleware
const { errorHandler } = require('./middleware/errorMiddleware')

// db connection
const connectDB = require('./config/db')

// port definition
const port = process.env.PORT || 5000

// connect to db
connectDB()

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// routes ==========================

// all events routes
app.use('/api/events', require('./routes/eventRoutes'));

// all user routes
app.use('/api/users', require('./routes/userRoutes'));

// routes ==========================

// custom error handler: overrides the default express error handler
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))