const Sequelize = require('sequelize');
const sequelize = require('../models/dbIndex');
const Session = require('../models/sessions');

const testAdd = ( (req,res) => {
    console.log('sup')
    Session.sync({force:false}).then(() =>{
    Session.create({
            login: '1234',
            sessionId: '5678',
            // expiration: Sequelize.NOW
        })
    })
})

module.exports = { testAdd }
