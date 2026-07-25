const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const admin = require('../controllers/adminController');
const { photos, pdf } = require('../middleware/upload');

const clientRules = [body('nombre').trim().isLength({ min: 2, max: 120 }), body('email').isEmail().normalizeEmail()];
const reportRules = [
  body('user_id').isInt({ min: 1 }), body('titulo').trim().isLength({ min: 3, max: 180 }),
  body('tipo_servicio').trim().isLength({ min: 2, max: 100 }), body('descripcion').trim().isLength({ min: 5 }),
  body('fecha_servicio').isISO8601(), body('estatus').optional().isIn(['borrador', 'programado', 'en_proceso', 'completado', 'cancelado'])
];

router.get('/estadisticas', admin.stats);
router.get('/clientes', admin.clients);
router.post('/clientes', clientRules, validate, admin.createClient);
router.patch('/clientes/:id', admin.updateClient);
router.delete('/clientes/:id', admin.deleteClient);
router.post('/clientes/:id/reenviar-invitacion', admin.resendInvitation);
router.get('/reportes', admin.reports);
router.post('/reportes', reportRules, validate, admin.createReport);
router.patch('/reportes/:id', admin.updateReport);
router.delete('/reportes/:id', admin.deleteReport);
router.post('/reportes/:id/fotos', photos.array('fotos', 20), [body('tipo').isIn(['antes', 'despues'])], validate, admin.uploadPhotos);
router.delete('/reportes/:id/fotos/:photoId', admin.deletePhoto);
router.post('/reportes/:id/publicar', admin.publishReport);
router.get('/documentos', admin.documents);
router.post('/documentos', pdf.single('archivo'), [
  body('user_id').isInt({ min: 1 }), body('titulo').trim().isLength({ min: 3, max: 180 }),
  body('categoria').isIn(['poliza', 'seguro', 'certificacion', 'otro'])
], validate, admin.createDocument);
router.delete('/documentos/:id', admin.deleteDocument);
module.exports = router;
