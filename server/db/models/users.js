'use strict'
const Sequelize = require('sequelize');


const User = sequelize.define('User', {
    login: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    ghUniqueId: {
        type: Sequelize.INT
    },
    avatarUrl: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    publicRepos: {
        type: Sequelize.INT
    },
    followers: {
        type: Sequelize.INT
    },
    following: {
        type: Sequelize.INT
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    numberLogins: { // Counts number of times user has logged into our site
        type: Sequelize.INT,
        autoIncrement: true,
        defaultValue: 0
    }
});

module.exports = User;