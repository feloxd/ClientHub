module.exports = (sequelize, DataTypes) => sequelize.define('Quote', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  service_request_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  mensaje: { type: DataTypes.TEXT },
  estatus: { type: DataTypes.ENUM('borrador', 'publicada', 'aprobada', 'rechazada'), defaultValue: 'borrador' },
  opcion_aprobada_id: { type: DataTypes.INTEGER.UNSIGNED }
}, { tableName: 'quotes' });
