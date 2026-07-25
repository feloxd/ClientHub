module.exports = (sequelize, DataTypes) => sequelize.define('Notification', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  tipo: { type: DataTypes.ENUM('reporte', 'documento', 'sistema'), allowNull: false },
  referencia_id: { type: DataTypes.INTEGER.UNSIGNED },
  leida: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: 'notifications' });
