module.exports = (sequelize, DataTypes) => sequelize.define('Invitation', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  token_hash: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  expira_en: { type: DataTypes.DATE, allowNull: false },
  usada: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: 'invitations', updatedAt: false });
