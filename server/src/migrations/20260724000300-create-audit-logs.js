'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('audit_logs', {
      id: { type: Sequelize.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
      admin_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
      accion: { type: Sequelize.STRING(80), allowNull: false },
      entidad: { type: Sequelize.STRING(50), allowNull: false },
      entidad_id: { type: Sequelize.STRING(80) },
      metadata: { type: Sequelize.JSON },
      ip: { type: Sequelize.STRING(64) },
      created_at: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.addIndex('audit_logs', ['admin_id', 'created_at']);
    await queryInterface.addIndex('audit_logs', ['entidad', 'entidad_id']);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('audit_logs');
  }
};
