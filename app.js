require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const userAuthRouter = require('./routes/user-auth')
const AuthenticateUser = require('./middleware/user-authorization')
const playerRouter = require('./routes/players')

// Package usage
app.use(express.json());
app.get('/', (req, res) => {
    res.status(200).send('<h1>Hello World</h1>')
})

//routes
app.use('/api/v1/user-auth', userAuthRouter)
app.use('/api/v1/players', AuthenticateUser, playerRouter)


//error Handlers
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 8000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()