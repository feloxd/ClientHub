module.exports = (sequelize, DataTypes) => sequelize.define('User', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(120), allowNull: false },
  email: { type: DataTypes.STRING(190), allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING(255), allowNull: true },
  rol: { type: DataTypes.ENUM('admin', 'cliente'), allowNull: false, defaultValue: 'cliente' },
  activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
}, { tableName: 'users', defaultScope: { attributes: { exclude: ['password_hash'] } } });
