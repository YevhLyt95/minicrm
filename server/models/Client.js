const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { toDefaultValue } = require('sequelize/lib/utils');

const Client = sequelize.define('Client', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        validate: { isEmail: true }
    },
    status: {
        type: DataTypes.STRING,
        toDefaultValue: 'new'
    }
});

module.exports = Client;