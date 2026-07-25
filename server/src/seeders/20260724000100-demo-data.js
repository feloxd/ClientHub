'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    if (process.env.NODE_ENV === 'production' && process.env.ALLOW_DEMO_SEED !== 'true') {
      throw new Error('El seeder demo está bloqueado en producción. Usa ALLOW_DEMO_SEED=true únicamente si aceptas crear cuentas de prueba.');
    }
    const now = new Date();
    const adminPassword = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD || 'AdminDemo2026!', 12);
    const clientPassword = await bcrypt.hash(process.env.SEED_CLIENT_PASSWORD || 'ClienteDemo2026!', 12);
    await queryInterface.bulkInsert('users', [
      { id: 1, nombre: 'Administrador Nexo', email: process.env.SEED_ADMIN_EMAIL || 'admin@nexo.mx', password_hash: adminPassword, rol: 'admin', activo: true, created_at: now, updated_at: now },
      { id: 2, nombre: 'Corporativo Horizonte', email: process.env.SEED_CLIENT_EMAIL || 'cliente@nexo.mx', password_hash: clientPassword, rol: 'cliente', activo: true, created_at: now, updated_at: now }
    ]);
    await queryInterface.bulkInsert('reports', [
      {
        id: 1, user_id: 2, titulo: 'Mantenimiento preventivo de red', tipo_servicio: 'Redes y conectividad',
        descripcion: 'Diagnóstico de nodos, limpieza de gabinete, reorganización de cableado y certificación de 24 puntos de red.',
        notas: 'Todos los enlaces operan dentro de parámetros. Se recomienda renovar dos patch cords en la próxima visita.',
        incidencias: 'Se detectó un puerto sin etiquetado; quedó identificado y actualizado en el plano.', estatus: 'completado',
        fecha_servicio: '2026-07-18', tecnico: 'Carlos Mendoza', publicado: true, visto_por_cliente: false, created_at: now, updated_at: now
      },
      {
        id: 2, user_id: 2, titulo: 'Instalación de cámaras en acceso norte', tipo_servicio: 'Videovigilancia',
        descripcion: 'Instalación y configuración de cuatro cámaras IP con visión nocturna, ajuste de zonas y pruebas de grabación.',
        notas: 'Acceso remoto verificado con el responsable de seguridad.', incidencias: 'Sin incidencias durante la instalación.',
        estatus: 'completado', fecha_servicio: '2026-06-29', tecnico: 'Mariana Torres', publicado: true,
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
      { user_id: 2, titulo: 'Póliza de mantenimiento 2026', categoria: 'poliza', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', created_at: now, updated_at: now },
      { user_id: 2, titulo: 'Certificación técnica del proveedor', categoria: 'certificacion', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', created_at: now, updated_at: now }
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
