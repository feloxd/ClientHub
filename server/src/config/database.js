require('dotenv').config();

const common = {
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: { underscored: true, timestamps: true },
  dialectOptions: process.env.NODE_ENV === 'production'
    ? { ssl: { require: true, rejectUnauthorized: false } }
    : {}
};

const config = process.env.DATABASE_URL
  ? { use_env_variable: 'DATABASE_URL', ...common }
  : {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      ...common
    };

module.exports = {
  development: config,
  test: config,
  production: config
};
