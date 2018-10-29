const User = require('../user/User');
let user = new User();

module.exports.register = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    user.register(JSON.parse(event.body))
        .then(session => callback(null, {
            statusCode: 200,
            body: JSON.stringify(session)
        })).catch(err => {
            return callback(null, {
                statusCode: err.statusCode || 500,
                headers: { 'Content-Type': 'text/plain' },
                body: err.message
            });
        });
};

module.exports.login = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    user.login(JSON.parse(event.body))
        .then(session => callback(null, {
            statusCode: 200,
            body: JSON.stringify(session)
        }))
        .catch(err => callback(null, {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify({ stack: err.stack, message: err.message })
        }));
};

module.exports.me = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    user.me(event.requestContext.authorizer.principalId)
        .then(session => callback(null, {
            statusCode: 200,
            body: JSON.stringify(session)
        }))
        .catch(err => callback(null, {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: { stack: err.stack, message: err.message }
        }));
};