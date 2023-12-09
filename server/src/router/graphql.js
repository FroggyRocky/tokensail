const router = require('express').Router();
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema.js');
const authController = require('../controllers/authController');
const {errorData} = require('../../errorTypes')

function getErrorData(errorName) {
    return errorData[errorName]
}


router.use('/graphql', graphqlHTTP((req, res, params) => ({
    schema: schema,
    graphiql: true,
    customFormatErrorFn: (err) => {
        const error = getErrorData(err.message)
        if(!error) {
            return {
                message: err.message || 'An error occurred',
                statusCode: 500

            }
        }
        return {
            message: error.message,
            statusCode: error.statusCode
        }
    },
    context: authController.authMiddleware(req, res, params)
})));

module.exports = router;