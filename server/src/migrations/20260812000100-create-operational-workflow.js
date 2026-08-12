'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const common = { created_at: { type: Sequelize.DATE, allowNull: false }, updated_at: { type: Sequelize.DATE, allowNull: false } };
    await queryInterface.createTable('service_requests', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      user_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      unidad: { type: Sequelize.STRING(80), allowNull: false }, problema: { type: Sequelize.STRING(180), allowNull: false },
      descripcion: { type: Sequelize.TEXT, allowNull: false }, tipo_servicio: { type: Sequelize.STRING(100), allowNull: false },
      prioridad: { type: Sequelize.ENUM('normal', 'urgente'), defaultValue: 'normal' },
      estatus: { type: Sequelize.ENUM('recibida', 'diagnostico', 'cotizacion', 'autorizada', 'programada', 'en_proceso', 'completada', 'cancelada'), defaultValue: 'recibida' },
      tecnico: { type: Sequelize.STRING(120) }, ...common
    });
    await queryInterface.createTable('quotes', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      service_request_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'service_requests', key: 'id' }, onDelete: 'CASCADE' },
      mensaje: { type: Sequelize.TEXT }, estatus: { type: Sequelize.ENUM('borrador', 'publicada', 'aprobada', 'rechazada'), defaultValue: 'borrador' },
      opcion_aprobada_id: { type: Sequelize.INTEGER.UNSIGNED }, ...common
    });
    await queryInterface.createTable('quote_options', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      quote_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'quotes', key: 'id' }, onDelete: 'CASCADE' },
      titulo: { type: Sequelize.STRING(180), allowNull: false }, descripcion: { type: Sequelize.TEXT, allowNull: false },
      precio: { type: Sequelize.DECIMAL(10, 2), allowNull: false }, recomendada: { type: Sequelize.BOOLEAN, defaultValue: false }, ...common
    });
    await queryInterface.createTable('appointments', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      service_request_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, unique: true, references: { model: 'service_requests', key: 'id' }, onDelete: 'CASCADE' },
      fecha_inicio: { type: Sequelize.DATE, allowNull: false }, tecnico: { type: Sequelize.STRING(120), allowNull: false }, notas_acceso: { type: Sequelize.TEXT },
      estatus: { type: Sequelize.ENUM('programada', 'en_curso', 'completada', 'cancelada'), defaultValue: 'programada' }, ...common
    });
    await queryInterface.createTable('payments', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      service_request_id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'service_requests', key: 'id' }, onDelete: 'CASCADE' },
      monto: { type: Sequelize.DECIMAL(10, 2), allowNull: false }, metodo: { type: Sequelize.ENUM('efectivo', 'tarjeta', 'transferencia', 'otro'), allowNull: false },
      referencia: { type: Sequelize.STRING(120) }, estatus: { type: Sequelize.ENUM('registrado', 'confirmado', 'anulado'), defaultValue: 'registrado' },
      cobrado_en: { type: Sequelize.DATE, allowNull: false }, ...common
    });
    await queryInterface.addIndex('service_requests', ['user_id', 'estatus']);
    await queryInterface.addIndex('service_requests', ['created_at']);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('payments');
    await queryInterface.dropTable('appointments');
    await queryInterface.dropTable('quote_options');
    await queryInterface.dropTable('quotes');
    await queryInterface.dropTable('service_requests');
  }
};
