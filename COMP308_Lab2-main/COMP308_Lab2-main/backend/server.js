const express = require('express')
const { urlencoded, json } = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const port = process.env.PORT || 5051
const { connectDB } = require('./config/db')
// const { errorHandler } = require('./middlewares/errorMiddleware')
const cors = require('cors')
const app = express()

// Connect to MongoDB database
connectDB()

// Tools 
app.use(json())
app.use(cors());
app.use(urlencoded({ extended: false }))
// app.use(errorHandler)

// Routers 
app.use('/api/student', require('./routes/studentRoutes'));

app.listen(port, () => console.log(`Server running on port: ${port}`.blue.underline))



