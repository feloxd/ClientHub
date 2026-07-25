'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      nombre: { type: Sequelize.STRING(120), allowNull: false },
      email: { type: Sequelize.STRING(190), allowNull: false, unique: true },
      password_hash: { type: Sequelize.STRING(255) },
      rol: { type: Sequelize.ENUM('admin', 'cliente'), allowNull: false, defaultValue: 'cliente' },
      activo: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.createTable('reports', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      user_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      titulo: { type: Sequelize.STRING(180), allowNull: false },
      tipo_servicio: { type: Sequelize.STRING(100), allowNull: false },
      descripcion: { type: Sequelize.TEXT, allowNull: false },
      notas: { type: Sequelize.TEXT },
      incidencias: { type: Sequelize.TEXT },
      estatus: { type: Sequelize.ENUM('borrador', 'programado', 'en_proceso', 'completado', 'cancelado'), defaultValue: 'borrador' },
      fecha_servicio: { type: Sequelize.DATEONLY, allowNull: false },
      tecnico: { type: Sequelize.STRING(120) },
      publicado: { type: Sequelize.BOOLEAN, defaultValue: false },
      visto_por_cliente: { type: Sequelize.BOOLEAN, defaultValue: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.createTable('report_photos', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      report_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'reports', key: 'id' }, onDelete: 'CASCADE' },
      url: { type: Sequelize.STRING(1000), allowNull: false },
      tipo: { type: Sequelize.ENUM('antes', 'despues'), allowNull: false },
      orden: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0 },
      created_at: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.createTable('documents', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      user_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      titulo: { type: Sequelize.STRING(180), allowNull: false },
      categoria: { type: Sequelize.ENUM('poliza', 'seguro', 'certificacion', 'otro'), allowNull: false },
      url: { type: Sequelize.STRING(1000), allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.createTable('notifications', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      user_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      tipo: { type: Sequelize.ENUM('reporte', 'documento', 'sistema'), allowNull: false },
      referencia_id: { type: Sequelize.INTEGER.UNSIGNED },
      leida: { type: Sequelize.BOOLEAN, defaultValue: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.createTable('refresh_tokens', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      user_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      token_hash: { type: Sequelize.STRING(255), allowNull: false, unique: true },
      expira_en: { type: Sequelize.DATE, allowNull: false },
      revocado: { type: Sequelize.BOOLEAN, defaultValue: false },
      created_at: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.createTable('invitations', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      user_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      token_hash: { type: Sequelize.STRING(255), allowNull: false, unique: true },
      expira_en: { type: Sequelize.DATE, allowNull: false },
      usada: { type: Sequelize.BOOLEAN, defaultValue: false },
      created_at: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.addIndex('reports', ['user_id', 'fecha_servicio']);
    await queryInterface.addIndex('documents', ['user_id', 'categoria']);
    await queryInterface.addIndex('notifications', ['user_id', 'leida']);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('invitations');
    await queryInterface.dropTable('refresh_tokens');
    await queryInterface.dropTable('notifications');
    await queryInterface.dropTable('documents');
    await queryInterface.dropTable('report_photos');
    await queryInterface.dropTable('reports');
    await queryInterface.dropTable('users');
  }
};
