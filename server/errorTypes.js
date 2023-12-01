
exports.errorNames = {
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    USER_ALREADY_EXIST: 'USER_ALREADY_EXIST',
    UNATHORIZED: 'UNATHORIZED',
    INVALID_DATA: 'INVALID_DATA',
}



exports.errorData = {
    UNATHORIZED: {
        message: 'you are not authorized',
        statusCode: 401
    },
    INVALID_DATA: {
        message: 'invalid data',
        statusCode: 400
    },
}
