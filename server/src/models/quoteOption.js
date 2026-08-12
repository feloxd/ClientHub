module.exports = (sequelize, DataTypes) => sequelize.define('QuoteOption', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  quote_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  titulo: { type: DataTypes.STRING(180), allowNull: false },
  descripcion: { type: DataTypes.TEXT, allowNull: false },
  precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  recomendada: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: 'quote_options' });
