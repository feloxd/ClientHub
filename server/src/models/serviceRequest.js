module.exports = (sequelize, DataTypes) => sequelize.define('ServiceRequest', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  unidad: { type: DataTypes.STRING(80), allowNull: false },
  problema: { type: DataTypes.STRING(180), allowNull: false },
  descripcion: { type: DataTypes.TEXT, allowNull: false },
  tipo_servicio: { type: DataTypes.STRING(100), allowNull: false },
  prioridad: { type: DataTypes.ENUM('normal', 'urgente'), defaultValue: 'normal' },
  estatus: { type: DataTypes.ENUM('recibida', 'diagnostico', 'cotizacion', 'autorizada', 'programada', 'en_proceso', 'completada', 'cancelada'), defaultValue: 'recibida' },
  tecnico: { type: DataTypes.STRING(120) }
}, { tableName: 'service_requests' });
