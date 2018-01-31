const Sequelize = require('sequelize');
const sequelize = require('./dbIndex');
const Session = require('../models/sessions');

const testAdd = ( (req,res) => {
    console.log('sup')
    Session.sync({force: false}).then(() => {
        return Session.create({
            login: '1234',
            sessionId: '5678',
            expiration: Sequelize.NOW
        })
    })
})

module.exports = { testAdd }