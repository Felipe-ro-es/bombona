const app = require('./app');
const sequelize = require('./config/database');
const Bombona = require('./models/Bombona');
const User = require('./models/User');

const PORT = 3000;

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Banco de dados sincronizado!');
    app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
  } catch (error) {
    console.error('Erro ao conectar ao banco:', error);
  }
})();
