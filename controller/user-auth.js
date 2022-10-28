const { BadRequestError, UnauthenticatedError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')


const signUp = async (req, res) => {
    //Create User
    const user = await User.create({ ...req.body })

    //Generate token
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({
        user: { user: user.name },
        token
    })
}

const logIn = async (req, res) => {
    //Validate email and password
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    //Check if email exists in DB
    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('Invalid credentials')
    }

    //Compare password
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    //Generate token
    const token = await user.createJWT()
    res.status(StatusCodes.OK).json({
        user: { user: user.name },
        token
    })
}


module.exports = {
    signUp,
    logIn
}