const { Sequelize } = require('sequelize');

// Conexão com o banco SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false, // deixa o terminal limpo
});

module.exports = sequelize;
