'use strict'
const Sequelize = require('sequelize');
const sequelize = require('./dbIndex.js');


const Session = sequelize.define('session', {
    login: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    sessionId: {
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.STRING
    },
    accessToken: {
        type: Sequelize.STRING
    },
    expiration: {
        type: Sequelize.DATE, 
        defaultValue: Sequelize.NOW
    }
});

module.exports = Session;