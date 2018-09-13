const User = require('./User');
let user = new User();
module.exports.getUsers = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  user.getAll(callback);
};