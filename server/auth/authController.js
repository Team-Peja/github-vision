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

const getToken = (req, res, next) => {
  console.log(req.query);
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
    console.log(response.data);
    axios.post(
      'https://api.github.com/graphql',
      { query: initialQuery },
      { headers: { Authorization: `token ${accessToken}` }},
    )
    .then(response => {
      res.locals.userId = response.data.data.viewer.id;
      res.locals.login = response.data.data.viewer.login;
      res.locals.accessToken = accessToken;
      next();
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log('error: ', err));
}

const queryDB = (req, res, next) => {
  console.log('in queryDB')
  axios.post(
    'https://api.github.com/graphql',
    { query: bigQuery(res.locals.userId) },
    { headers: { Authorization: `token ${res.locals.accessToken}` }},
  ).then(response => {
    const formattedQueryData = formatData(response.data.data.viewer);
    res.json(formattedQueryData);
  })
}

const formatData = json => {
  const result = {
    isLoggedIn: true,
    user: {},
    commits: [],
  }

  const login = json.login;
  const userId = json.id;
  const name = json.name;
  const avatarUrl = json.avatarUrl;
  const email = json.email;
  const userCreatedAt = json.createdAt;
  const userUpdatedAt = json.updatedAt;
  const followerCount = json.followers.totalCount;
  const followingCount = json.following.totalCount;
  const repositoryCount = json.repositories.totalCount;
  const repositories = json.repositories.nodes;

  repositories.forEach((repo) => {
    const repoId = repo.id;
    const repoName = repo.name;
    const repoForks = repo.forkCount;
    const repoLanguages = {
      totalSize: repo.languages.totalSize,
      languageDetails: repo.languages.edges.map(lang => {
        return {
          name: lang.node.name,
          size: lang.size,
        }
      }),
    }
    const repoCommitsCount = repo.ref.target.history.totalCount;
    const repoCommits = repo.ref.target.history.edges;

    repoCommits.forEach((commit) => {
      result.commits.push({
        sha: commit.node.id,
        added: commit.node.additions,
        deleted: commit.node.deletions,
        total: commit.node.deletions + commit.node.additions,
        date: commit.node.authoredDate,
        languages: repoLanguages,
        repoName: repoName,
        repoId: repoId,
        login: login,
      })
    })
  })
  
  result.user = {
    login: login,
    ghUniqueId: userId,
    avatarUrl: avatarUrl,
    email: email,
    publicRepos: repositoryCount,
    followers: followerCount,
    following: followingCount,
    createdAt: userCreatedAt,
    updatedAt: userUpdatedAt,
  }

  return result;
}


module.exports = { login, getToken, queryDB };

