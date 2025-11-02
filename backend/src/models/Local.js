const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // seu arquivo de conexão

const Local = sequelize.define('Local', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Local;
