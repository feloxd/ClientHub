module.exports = (sequelize, DataTypes) => sequelize.define('PasswordReset', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  token_hash: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  expira_en: { type: DataTypes.DATE, allowNull: false },
  usado: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: 'password_resets', updatedAt: false });
