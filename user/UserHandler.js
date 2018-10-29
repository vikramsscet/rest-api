const User = require('./User');
let user = new User();
module.exports.getUsers = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  user.getAll().then(users => callback(null, {
    statusCode: 200,
    body: JSON.stringify(users)
  }))
  .catch(err => callback(null, {
    statusCode: err.statusCode || 500,
    headers: { 'Content-Type': 'text/plain' },
    body: 'Could not fetch the users.'
  }));
};