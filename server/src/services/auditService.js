const { AuditLog } = require('../models');

async function audit(req, accion, entidad, entidadId, metadata = undefined) {
  try {
    await AuditLog.create({
      admin_id: req.user?.id || null,
      accion,
      entidad,
      entidad_id: entidadId == null ? null : String(entidadId),
      metadata,
      ip: req.ip
    });
  } catch (error) {
    console.error('No se pudo registrar la auditoría:', error.message);
  }
}

module.exports = { audit };
