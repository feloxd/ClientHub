const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const admin = require('../controllers/adminController');
const workflow = require('../controllers/workflowController');
const { photos, pdf } = require('../middleware/upload');

router.get('/solicitudes', workflow.adminList);
router.patch('/solicitudes/:id', [
  body('estatus').optional().isIn(['recibida', 'diagnostico', 'cotizacion', 'autorizada', 'programada', 'en_proceso', 'completada', 'cancelada']),
  body('tecnico').optional().trim().isLength({ min: 2, max: 120 })
], validate, workflow.adminUpdate);
router.post('/solicitudes/:id/cotizacion', [
  body('mensaje').optional().trim().isLength({ max: 2000 }), body('opciones').isArray({ min: 1, max: 10 }),
  body('opciones.*.titulo').trim().isLength({ min: 2, max: 180 }), body('opciones.*.descripcion').trim().isLength({ min: 2 }),
  body('opciones.*.precio').isFloat({ min: 0 }), body('opciones.*.recomendada').optional().isBoolean()
], validate, workflow.adminPublishQuote);
router.post('/solicitudes/:id/cita', [
  body('fecha_inicio').isISO8601(), body('tecnico').trim().isLength({ min: 2, max: 120 }), body('notas_acceso').optional().trim().isLength({ max: 2000 })
], validate, workflow.adminSchedule);
router.post('/solicitudes/:id/pago', [
  body('monto').isFloat({ min: 0 }), body('metodo').isIn(['efectivo', 'tarjeta', 'transferencia', 'otro']), body('referencia').optional().trim().isLength({ max: 120 })
], validate, workflow.adminPayment);

const clientRules = [body('nombre').trim().isLength({ min: 2, max: 120 }), body('email').isEmail().normalizeEmail()];
const reportRules = [
  body('user_id').isInt({ min: 1 }), body('titulo').trim().isLength({ min: 3, max: 180 }),
  body('tipo_servicio').trim().isLength({ min: 2, max: 100 }), body('descripcion').trim().isLength({ min: 5 }),
  body('fecha_servicio').isISO8601(), body('estatus').optional().isIn(['borrador', 'programado', 'en_proceso', 'completado', 'cancelado'])
];

router.get('/estadisticas', admin.stats);
router.get('/auditoria', admin.auditLogs);
router.get('/clientes', admin.clients);
router.post('/clientes', clientRules, validate, admin.createClient);
router.patch('/clientes/:id', [
  body('nombre').optional().trim().isLength({ min: 2, max: 120 }),
  body('email').optional().isEmail().normalizeEmail(),
  body('activo').optional().isBoolean()
], validate, admin.updateClient);
router.delete('/clientes/:id', admin.deleteClient);
router.post('/clientes/:id/reenviar-invitacion', admin.resendInvitation);
router.get('/reportes', admin.reports);
router.post('/reportes', reportRules, validate, admin.createReport);
router.patch('/reportes/:id', [
  body('user_id').optional().isInt({ min: 1 }),
  body('titulo').optional().trim().isLength({ min: 3, max: 180 }),
  body('tipo_servicio').optional().trim().isLength({ min: 2, max: 100 }),
  body('descripcion').optional().trim().isLength({ min: 5 }),
  body('fecha_servicio').optional().isISO8601(),
  body('estatus').optional().isIn(['borrador', 'programado', 'en_proceso', 'completado', 'cancelado'])
], validate, admin.updateReport);
router.delete('/reportes/:id', admin.deleteReport);
router.post('/reportes/:id/fotos', photos.array('fotos', 20), [body('tipo').isIn(['antes', 'despues'])], validate, admin.uploadPhotos);
router.delete('/reportes/:id/fotos/:photoId', admin.deletePhoto);
router.post('/reportes/:id/publicar', admin.publishReport);
router.get('/documentos', admin.documents);
router.post('/documentos', pdf.single('archivo'), [
  body('user_id').isInt({ min: 1 }), body('titulo').trim().isLength({ min: 3, max: 180 }),
  body('categoria').isIn(['poliza', 'seguro', 'certificacion', 'otro'])
], validate, admin.createDocument);
router.patch('/documentos/:id', [
  body('user_id').optional().isInt({ min: 1 }),
  body('titulo').optional().trim().isLength({ min: 3, max: 180 }),
  body('categoria').optional().isIn(['poliza', 'seguro', 'certificacion', 'otro'])
], validate, admin.updateDocument);
router.delete('/documentos/:id', admin.deleteDocument);
module.exports = router;
