const app = require('./app');
const { sequelize } = require('./models');
const port = Number(process.env.PORT || 3001);

async function start() {
  try {
    await sequelize.authenticate();
    app.listen(port, () => console.log(`Nexo API disponible en el puerto ${port}`));
  } catch (error) {
    console.error('No se pudo conectar con MySQL:', error.message);
    process.exit(1);
  }
}

start();
