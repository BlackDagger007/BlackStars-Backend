const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req, res, next) => {
    //Validate authHeader
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication Invalid')
    }

    //Retrieve token
    const token = authHeader.split(' ')[1]

    //Validate token
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {
            userID: payload.userID,
            name: payload.userName
        }
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid')
    }
}

module.exports = auth