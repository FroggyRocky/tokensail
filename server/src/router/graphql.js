const router = require('express').Router();
const {graphqlHTTP} = require('express-graphql');
const schema = require('../../schema.js');
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const {errorNames, errorData} = require('../../errorTypes')

function getErrorData(errorName) {
    return errorData[errorName]
}
const root = {
    login: authController.login,
    auth: authController.auth,
    getUserTopActions: userController.getUserRecentWalletActions,
}

router.use('/graphql', graphqlHTTP((req, res, params) => ({
    schema: schema,
    rootValue: root,
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