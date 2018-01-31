const axios = require('axios');
const cryptoRandomString = require('crypto-random-string');
require('dotenv').config();
const initialQuery = require('../queries/initialQuery')
const bigQuery = require('../queries/bigQuery');


const checkCookie = (req, res, next) => {
  console.log(req.cookies);
  console.log('hi');
  res.send();
}

const login = (req, res, next) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&state=poop&scope=user%20public_repo%20repo%20repo_deployment%20repo:status%20read:repo_hook%20read:org%20read:public_key%20read:gpg_key`);
}

const setCookie = (req, res, login) => {
  res.cookie('login', login, { httpOnly: true, maxAge: 86400000 }); // 1 day
  res.cookie('session', cryptoRandomString(20), { httpOnly: true, maxAge: 86400000 });
  console.log('in setCookie')
  res.redirect('/storeCookie');
}

const storeCookie = (req, res, next) => {
  // integrate with pete on this
  console.log(req.cookies);
  console.log('hi');
  res.redirect('/');
}

const getToken = (req, res) => {
  const code = req.query.code;
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  axios.post(
    'https://github.com/login/oauth/access_token',
    { client_id, client_secret, code, redirect: 'http://localhost:1234/' },
    { headers: { 'Accept': 'application/json' }}
  )
  .then(response => {
    const accessToken = response.data.access_token;
    // const login = response.data.login;
    // setCookie(req, res, login);
    res.end();
    axios.post(
      'https://api.github.com/graphql',
      { query: initialQuery },
      { headers: { Authorization: `token ${accessToken}` }},
    )
    .then(response => {
      const userID = response.data.data.viewer.id;
      axios.post(
        'https://api.github.com/graphql',
        { query: bigQuery(userID) },
        { headers: { Authorization: `token ${accessToken}` }},
      )
      .then(response => {
        console.log(JSON.stringify(response.data, null, 2));
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log('error: ', err));
}


module.exports = { login, getToken, checkCookie, storeCookie };

