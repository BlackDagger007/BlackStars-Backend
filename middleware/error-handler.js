const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = async (err, req, res, next) => {
    let customError = {
        msg: err.message || 'Something went wrong, please try again later',
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    }

    // Validation Error
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors).map((item) => item.message).join(',')
        customError.statusCode = StatusCodes.BAD_REQUEST
    } else if (err.name == 'AxiosError') {
        customError.msg = 'Payment Failed'
        customError.statusCode = StatusCodes.BAD_REQUEST
    }

    // Duplication Error
    if (err.code || err.code === 11000) {
        try {
            customError.msg = `${Object.keys(err.keyPattern)} already exists, choose another one`
        } catch (e) {
            customError.statusCode = StatusCodes.BAD_REQUEST
        }
    }

    res.status(customError.statusCode).json(customError.msg)
}

module.exports = errorHandlerMiddleware