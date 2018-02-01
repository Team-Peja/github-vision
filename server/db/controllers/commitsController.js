const Sequelize = require('sequelize');
const sequelize = require('../models/dbIndex');
const Commit = require('../models/commits');

const bulkCommit = ( (req,res) => {
    console.log('in addCommit')
    Commit.sync({force:false}).then(() =>{
    Commit.bulkCreate([{
        sha: req.body.sha,
        login: req.body.login,
        repo: req.body.repo,
        date: req.body.date,
        total: req.body.total,
        added: req.body.added,
        deleted: req.body.deleted,
        languages: req.body.languages,
        repoId: req.body.repoId
        }]).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
        return User.findAll();
      }).then(repos => {
        console.log(repos) // ... in order to get the array of user objects
      })
    })
})

// const findCommit = ( (req,res) => {
//     Commit.findAll({
//         where: {login: '1234'},
//         attributes
//     })
// })
module.exports = { bulkCommit }
