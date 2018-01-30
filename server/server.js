const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();
const axios = require('axios');
const authController = require('./auth/authController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/build', express.static(path.join(__dirname, '/../', 'build')));

app.get('/', (req, res) => res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&state=poop`));

app.get('/callback', (req, res) => {
  console.log(req.query.code, req.query.state);
  const code = req.query.code;
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  // possible to also supply state and redirect_uri at this step
  res.end();

  axios.post(
    'https://github.com/login/oauth/access_token',
    { client_id, client_secret, code },
    { headers: { 'Accept': 'application/json' }})
  .then(response => {
    const accessToken = response.data.access_token;

    axios.get(
      'https://api.github.com/repos/erikwlarsen/woven-images',
      { headers: { 'Authorization': `token ${accessToken}` }})
    .then(response => {
      console.log(response.data);
    })
    .catch(err => console.log('error: ', err));
  })
  .catch(err =>console.log('error: ', err));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(process.env.PORT || 3000);
