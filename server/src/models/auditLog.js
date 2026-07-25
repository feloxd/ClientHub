module.exports = (sequelize, DataTypes) => sequelize.define('AuditLog', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  admin_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
  accion: { type: DataTypes.STRING(80), allowNull: false },
  entidad: { type: DataTypes.STRING(50), allowNull: false },
  entidad_id: { type: DataTypes.STRING(80), allowNull: true },
  metadata: { type: DataTypes.JSON, allowNull: true },
  ip: { type: DataTypes.STRING(64), allowNull: true }
}, { tableName: 'audit_logs', updatedAt: false });
