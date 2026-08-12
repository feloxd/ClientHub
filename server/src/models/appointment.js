module.exports = (sequelize, DataTypes) => sequelize.define('Appointment', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  service_request_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, unique: true },
  fecha_inicio: { type: DataTypes.DATE, allowNull: false },
  tecnico: { type: DataTypes.STRING(120), allowNull: false },
  notas_acceso: { type: DataTypes.TEXT },
  estatus: { type: DataTypes.ENUM('programada', 'en_curso', 'completada', 'cancelada'), defaultValue: 'programada' }
}, { tableName: 'appointments' });
