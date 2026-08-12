const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const client = require('../controllers/clientController');
const workflow = require('../controllers/workflowController');
router.get('/solicitudes', workflow.clientList);
router.post('/solicitudes', [
  body('unidad').trim().isLength({ min: 1, max: 80 }), body('problema').trim().isLength({ min: 3, max: 180 }),
  body('descripcion').trim().isLength({ min: 5 }), body('tipo_servicio').trim().isLength({ min: 2, max: 100 }),
  body('prioridad').optional().isIn(['normal', 'urgente'])
], validate, workflow.clientCreate);
router.post('/cotizaciones/:quoteId/aprobar', [body('opcion_id').isInt({ min: 1 })], validate, workflow.clientApproveQuote);
router.get('/resumen', client.summary);
router.get('/reportes', client.reports);
router.get('/reportes/:id', client.report);
router.get('/reportes/:id/pdf', client.reportPdf);
router.get('/documentos', client.documents);
router.get('/notificaciones', client.notifications);
router.patch('/notificaciones/leidas', client.readNotifications);
router.patch('/notificaciones/:id/leida', client.readNotification);
module.exports = router;
