const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();
const axios = require('axios');
const authController = require('./auth/authController');
const favicon = require('serve-favicon');

const sequelize = require('./db/models/dbIndex');
const sessionsController = require('./db/controllers/sessionsController');
const usersController = require('./db/controllers/usersController');
const commitsController = require('./db/controllers/commitsController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, '../build/assets/images', 'glasses.ico')));
app.use('/build', express.static(path.join(__dirname, '/../', 'build')));

/* ------------ START Postgres routes section ---------- */
sequelize
  .authenticate()
  .then(() => {console.log('Connection established: successful')})
  .catch( err => {console.error('No luck connecting, here\'s my error:\n', err)});
app.get('/internaldata/session', sessionsController.addSession)
// app.get('/internaldata/commits', sessionsController.bulkCommit)

app.post('/internaldata/userlogin', usersController.findOrCreate)

/* ------------ END postgres routes section ------------ */

// app.get('/', authController.checkCookie, dbController.read);

app.get('/login', authController.login);

app.get('/callback', authController.getToken);

app.get('/storeCookie', authController.storeCookie);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(process.env.PORT || 1234, () => {
  console.log('listening on port 1234!');
});
