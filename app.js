require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./db/connect')

// Package usage
app.use(express.json());
app.get('/', (req, res) => {
    res.status(200).send('<h1>Hello World</h1>')
})

//routes


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