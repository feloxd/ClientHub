module.exports = (sequelize, DataTypes) => sequelize.define('RefreshToken', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  token_hash: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  expira_en: { type: DataTypes.DATE, allowNull: false },
  revocado: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: 'refresh_tokens', updatedAt: false });
