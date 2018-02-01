'use strict'
const Sequelize = require('sequelize');
const sequelize = require('./dbIndex.js');

const User = sequelize.define('user', {
    login: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    ghUniqueId: {
        type: Sequelize.INTEGER
    },
    avatarUrl: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    publicRepos: {
        type: Sequelize.INTEGER
    },
    followers: {
        type: Sequelize.INTEGER
    },
    following: {
        type: Sequelize.INTEGER
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
        type: Sequelize.INTEGER,
        autoIncrement: true
    }
});

module.exports = User;