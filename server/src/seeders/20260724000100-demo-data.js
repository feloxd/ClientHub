'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    if (process.env.NODE_ENV === 'production' && process.env.ALLOW_DEMO_SEED !== 'true') {
      throw new Error('El seeder demo está bloqueado en producción. Usa ALLOW_DEMO_SEED=true únicamente si aceptas crear cuentas de prueba.');
    }
    const now = new Date();
    const adminPassword = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD || 'SealsAdmin2026!', 12);
    const clientPassword = await bcrypt.hash(process.env.SEED_CLIENT_PASSWORD || 'SealsClient2026!', 12);
    await queryInterface.bulkInsert('users', [
      { id: 1, nombre: 'Seals Operations', email: process.env.SEED_ADMIN_EMAIL || 'admin@sealshvac.ca', password_hash: adminPassword, rol: 'admin', activo: true, created_at: now, updated_at: now },
      { id: 2, nombre: 'Residencias ELORA', email: process.env.SEED_CLIENT_EMAIL || 'client@sealshvac.ca', password_hash: clientPassword, rol: 'cliente', activo: true, created_at: now, updated_at: now }
    ]);
    await queryInterface.bulkInsert('reports', [
      {
        id: 1, user_id: 2, titulo: 'Fan coil cooling repair · Suite 530', tipo_servicio: 'HVAC repair',
        descripcion: 'Diagnosed a failed control valve, confirmed airflow and restored cooling operation in the suite.',
        notas: 'The resident received a plain-language explanation of the issue and the approved repair option.',
        incidencias: 'Control valve showed normal wear. System performance was verified after replacement.', estatus: 'completado',
        fecha_servicio: '2026-07-18', tecnico: 'Oscar Martinez', publicado: true, visto_por_cliente: false, created_at: now, updated_at: now
      },
      {
        id: 2, user_id: 2, titulo: 'Seasonal fan coil maintenance · Suite 814', tipo_servicio: 'Preventive maintenance',
        descripcion: 'Completed fan coil inspection, filter replacement, drain pan cleaning and operational testing.',
        notas: 'Unit is operating within expected temperature and airflow ranges.', incidencias: 'No additional issues found during service.',
        estatus: 'completado', fecha_servicio: '2026-06-29', tecnico: 'Daniel Brooks', publicado: true,
        visto_por_cliente: true, created_at: now, updated_at: now
      }
    ]);
    await queryInterface.bulkInsert('report_photos', [
      { report_id: 1, url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80', tipo: 'antes', orden: 0, created_at: now },
      { report_id: 1, url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80', tipo: 'despues', orden: 0, created_at: now },
      { report_id: 2, url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80', tipo: 'antes', orden: 0, created_at: now },
      { report_id: 2, url: 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=1200&q=80', tipo: 'despues', orden: 0, created_at: now }
    ]);
    await queryInterface.bulkInsert('documents', [
      { user_id: 2, titulo: '2026 preventive maintenance agreement', categoria: 'poliza', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', created_at: now, updated_at: now },
      { user_id: 2, titulo: 'Seals HVAC service credentials', categoria: 'certificacion', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', created_at: now, updated_at: now }
    ]);
    await queryInterface.bulkInsert('notifications', [
      { user_id: 2, tipo: 'reporte', referencia_id: 1, leida: false, created_at: now, updated_at: now }
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('notifications', null, {});
    await queryInterface.bulkDelete('documents', null, {});
    await queryInterface.bulkDelete('report_photos', null, {});
    await queryInterface.bulkDelete('reports', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
