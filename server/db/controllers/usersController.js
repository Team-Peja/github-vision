const Sequelize = require('sequelize');
const sequelize = require('../models/dbIndex');
const User = require('../models/users');

const addUser = ( (req,res) => {
    console.log('in addUser')
    User.sync({force:false}).then(() =>{
    User.create({
            // login: '1234',
            // sessionId: '5678',
            // // expiration: Sequelize.NOW
        })
    })
})

const findOrCreate = ( (req,res) => {
    User
    .findOrCreate(({where: {
        login:          req.body.login,
        ghUniqueId:     req.body.ghUniqueId,
        avatarUrl:      req.body.avatarUrl,
        email:          req.body.email,
        publicRepos:    req.body.publicRepos,
        followers:      req.body.followers,
        following:      req.body.following,
        createdAt:      req.body.createdAt,
        updatedAt:      req.body.updatedAt,
    }}))
    .spread((user, created) => {
        if(created){
            console.log('created: ',created)
        }else{
            console.log(user.get({
            plain: true
            }))
        }
    })
})


module.exports = { findOrCreate }
