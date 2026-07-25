module.exports = (sequelize, DataTypes) => sequelize.define('Report', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  titulo: { type: DataTypes.STRING(180), allowNull: false },
  tipo_servicio: { type: DataTypes.STRING(100), allowNull: false },
  descripcion: { type: DataTypes.TEXT, allowNull: false },
  notas: { type: DataTypes.TEXT },
  incidencias: { type: DataTypes.TEXT },
  estatus: { type: DataTypes.ENUM('borrador', 'programado', 'en_proceso', 'completado', 'cancelado'), defaultValue: 'borrador' },
  fecha_servicio: { type: DataTypes.DATEONLY, allowNull: false },
  tecnico: { type: DataTypes.STRING(120) },
  publicado: { type: DataTypes.BOOLEAN, defaultValue: false },
  visto_por_cliente: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: 'reports' });
