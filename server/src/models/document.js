module.exports = (sequelize, DataTypes) => sequelize.define('Document', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  titulo: { type: DataTypes.STRING(180), allowNull: false },
  categoria: { type: DataTypes.ENUM('poliza', 'seguro', 'certificacion', 'otro'), allowNull: false },
  url: { type: DataTypes.STRING(1000), allowNull: false }
}, { tableName: 'documents' });
