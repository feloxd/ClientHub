module.exports = (sequelize, DataTypes) => sequelize.define('ReportPhoto', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  report_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  url: { type: DataTypes.STRING(1000), allowNull: false },
  tipo: { type: DataTypes.ENUM('antes', 'despues'), allowNull: false },
  orden: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 }
}, { tableName: 'report_photos', updatedAt: false });
