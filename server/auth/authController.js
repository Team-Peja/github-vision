const axios = require('axios');
const cryptoRandomString = require('crypto-random-string');
const octokit = require('@octokit/rest')();
require('dotenv').config();
const { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

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
    axios.get(
      'https://api.github.com/user',
      { headers: { Authorization: `token ${accessToken}` }}
    )
    // .then(response => getData(response, accessToken))
    .then(response => {
      const login = response.data.login;
      setCookie(req, res, login);
      // octokit.repos.getStatsCommitActivity({ owner: login, repo:'imageprocessingapp' })
      //   .then();
      axios.post(
        'https://api.github.com/graphql',
        { query },
        { headers: { Authorization: `token ${accessToken}` }},
      )
      .then(response => console.log(JSON.stringify(response.data, null, 2)))
    })
    .catch(err => console.log('error: ', err));
  })
  .catch(err => console.log('error: ', err));
}

const query =
`query {
  viewer {
    login
    name
      repositories(last: 100) {
        nodes {
          name
      }
    }
  }
}`


const getData = (response, accessToken) => {
  const data = [];
  const login = response.data.login;
  
  axios.get(
    response.data.repos_url,
    { headers: { Authorization: `token ${accessToken}` }}
  )
  .then(response => {
    response.data.forEach(repo => {
      axios.get(
        repo.commits_url.slice(0, -6),
        { headers: { Authorization: `token ${accessToken}` }}
      )
      .then(response => {
        response.data.forEach(commit => {
          axios.get(
            commit.url,
            { headers: { Authorization: `token ${accessToken}` }}
          )
          .then(response => {
            if (response.data.author && login === response.data.author.login) {
              data.push({
                sha: response.data.sha,
                author: response.data.author.login,
                stats: response.data.stats
              });
              // console.log('total additions: ', data.reduce((acc, val) => {
              //   return acc.stats.additions + val.stats.additions;
              // }, 0));
              data.forEach(commit => console.log(commit.stats))
            }
          })
          .catch(err => console.log(err));
        })
      })
      .catch(err => console.log(err))
    })
  })
  .catch(err => console.log(err));
}


module.exports = { login, getToken, checkCookie, storeCookie };

