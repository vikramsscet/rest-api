const User = require('../user/User');
let user = new User();
let util = require('../util/Utility');
module.exports.register = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    user.register(JSON.parse(event.body))
        .then(session => callback(null, util.setResponse(200,session))).catch(err => {
            return callback(null, util.setResponse(err.statusCode || 500, err.message, { 'Content-Type': 'text/plain' }));
        });
};

module.exports.login = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    user.login(JSON.parse(event.body))
        .then(session => callback(null, util.setResponse(200,session)))
        .catch(err => callback(null, util.setResponse(err.statusCode || 500,{ stack: err.stack, message: err.message },{ 'Content-Type': 'text/plain' })));
};

module.exports.me = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    user.me(event.requestContext.authorizer.principalId)
        .then(session => callback(null, util.setResponse(200,session)))
        .catch(err => callback(null, util.setResponse(err.statusCode || 500,{ stack: err.stack, message: err.message },{ 'Content-Type': 'text/plain' })));
};