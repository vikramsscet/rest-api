const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let isConnected;

module.exports = connectToDatabase = () => {
  if (isConnected) {
    //custom-console
    console.log('=> using existing database connection',process.env.DB);
    return Promise.resolve();
  }

  console.log('=> using new database connection', process.env.DB);
  return mongoose.connect(process.env.DB)
    .then(db => { 
      isConnected = db.connections[0].readyState;
    });
};