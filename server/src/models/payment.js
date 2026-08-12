module.exports = (sequelize, DataTypes) => sequelize.define('Payment', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  service_request_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  monto: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  metodo: { type: DataTypes.ENUM('efectivo', 'tarjeta', 'transferencia', 'otro'), allowNull: false },
  referencia: { type: DataTypes.STRING(120) },
  estatus: { type: DataTypes.ENUM('registrado', 'confirmado', 'anulado'), defaultValue: 'registrado' },
  cobrado_en: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'payments' });
