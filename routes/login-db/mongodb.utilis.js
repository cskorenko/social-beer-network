const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = {
  connect,
  disconnect,
  createEventListeners
};

function connect() {
  // const uri = 'mongodb://libraryuser:library123@ds229435.mlab.com:29435/cslibrary';
  const uri = 'mongodb://localhost/beerNetwork';

  mongoose.connect(uri, { useMongoClient: true});
}

function disconnect() {
  mongoose.disconnect()
}

function createEventListeners() {
  mongoose.connection.on('connected', () => {
    console.log('Connect to Database');
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Database connection closed');
  });

  mongoose.connection.on('error', (err) => {
    console.log(`There was an issue connectiong to the database: ${err}`);
  });
}
