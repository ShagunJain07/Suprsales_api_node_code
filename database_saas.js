const mongoose = require('mongoose');

const db2URL = 'mongodb://0.0.0.0:27017/suprsales_saas'; // Connection URL for the first database

mongoose.connect(db2URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Database 1'))
  .catch((error) => console.error('Error connecting to Database 1:', error));

module.exports = mongoose.connection;