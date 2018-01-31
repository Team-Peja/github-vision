'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config.json').development;


const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect
    }
)
// sequelize
//   .authenticate()
//   .then(() => {console.log('Connection established: successful')})
//   .catch( err => {console.error('No luck connecting, here\'s my error:\n', err)});

module.exports = sequelize;