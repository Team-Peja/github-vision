const Sequelize = require('sequelize');
const sequelize = require('../models/dbIndex');
const Session = require('../models/sessions');

const addSession = ( (req,res) => {
    console.log('in session testAdd req.body: \n ', req.body, '\n')
    Session.sync({force:false}).then(() =>{
    Session.create({
            login: req.body.login,
            sessionId: req.body.sessionId,
            expiration: req.body.expiration
        })
    })
})

const checkSession = ( (req,res) => {
    console.log('checkSession req.body: \n', req.body, '\n')
    Session.findOne({where:{login: req.body.login}}).then((data)=>{
        console.log(data)
    })
})
module.exports = { addSession, checkSession }
