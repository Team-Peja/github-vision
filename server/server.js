const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const favicon = require('serve-favicon');

const sequelize = require('./db/models/dbIndex');
const sessionsController = require('./db/controllers/sessionsController')

const app = express();

app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, '../build/assets/images', 'glasses.ico')));
app.use('/build', express.static(path.join(__dirname, '/../', 'build')));

app.get('/poop', sessionsController.testAdd)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

console.log('here we are, yo')
app.listen(process.env.PORT || 1234, () => {
  console.log('listening on port 1234!');
});

sequelize
  .authenticate()
  .then(() => {console.log('Connection established: successful')})
  .catch( err => {console.error('No luck connecting, here\'s my error:\n', err)});