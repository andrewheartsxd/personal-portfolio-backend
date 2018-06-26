// modules ======================================
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const routes = require('./app/routes');
const mongoose = require('mongoose');
// configuration ================================
const db = require('./config/db');

const port = process.env.PORT || 3000;

mongoose.connect(db.url, { useMongoClient: true });

mongoose.connection.on('error', () => {
  console.log('Could not connect to the database. Exiting now...');
  process.exit();
});

mongoose.connection.once('open', () => {
  console.log('Successfully connected to the database');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// app.use(express.static(__dirname + '/public'));
app.use('/api', routes);

app.use((err, req, res, next) => {
  res.status(500);
  console.error(err);
  res.json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});

// expose app
module.exports = app;
