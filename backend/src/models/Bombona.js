const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Local = require('./Local');

const Bombona = sequelize.define('Bombona', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pendente',
  },
  codigo: DataTypes.STRING,
  descricao: DataTypes.STRING,
  status: { type: DataTypes.STRING, defaultValue: 'pendente' },
});

Bombona.belongsTo(Local, { as: 'localAtual', foreignKey: 'localId' });
Local.hasMany(Bombona, { foreignKey: 'localId' });


module.exports = Bombona;
