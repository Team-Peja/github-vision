const Sequelize = require('sequelize');


const Users = sequelize.define('Users', {
    login: {
        type: Sequelize.STRING  //varchar?
    },
    ghUniqueId: {
        type: Sequelize.INT
    },
    numberLogins: {
        type: Sequelize.INT
    },
    avatarUrl: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
});

module.exports = Users;