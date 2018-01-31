'use strict'
const Sequelize = require('sequelize');
const sequelize = require('./dbIndex.js');


const Commit = sequelize.define('commit', {
    sha: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    login: {
        type: Sequelize.STRING
    },
    repo: {
        type: Sequelize.STRING
    },
    date: {
        type: Sequelize.DATE, 
        defaultValue: Sequelize.NOW
    },
    total: {
        type: Sequelize.INT
    },
    added: {
        type: Sequelize.INT
    },
    deleted: {
        type: Sequelize.INT
    },
    languages: {
        type: Sequelize.JSON
    },
    repoId: {
        type: Sequelize.STRING
    }
});

module.exports = Commit;