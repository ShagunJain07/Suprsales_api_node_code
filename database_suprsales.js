const mongoose = require('mongoose');

const db1URL = 'mongodb://0.0.0.0:27017/suprsales_db_prd'; // Connection URL for the first database

mongoose.connect(db1URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Database 2'))
  .catch((error) => console.error('Error connecting to Database 1:', error));

module.exports = mongoose.connection;