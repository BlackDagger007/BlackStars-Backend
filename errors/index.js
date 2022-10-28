const NotFoundError = require('./not-found')
const BadRequestError = require('./bad-request')
const CustomAPIError = require('./custom-error')
const UnauthenticatedError = require('./unauthenticated')

module.exports = {
    NotFoundError,
    BadRequestError,
    CustomAPIError,
    UnauthenticatedError
}