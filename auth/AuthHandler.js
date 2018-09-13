const User = require('../user/User');
let user = new User();

module.exports.register = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    user.register(JSON.parse(event.body), callback);
};

module.exports.login = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    user.login(JSON.parse(event.body), callback);
};

module.exports.me = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    user.me(event.requestContext.authorizer.principalId, callback);
};