const Sequelize = require('sequelize');
const sequelize = require('../models/dbIndex');
const Commit = require('../models/commits');

const addCommit = ( (req,res) => {
    console.log('in addCommit')
    Commit.sync({force:false}).then(() =>{
    Commit.create({
            // login: '1234',
            // sessionId: '5678',
            // // expiration: Sequelize.NOW
        })
    })
})

module.exports = { addCommit }
