const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { contact } = require('../controllers/publicController');
router.post('/contacto', rateLimit({ windowMs: 15 * 60 * 1000, limit: 10 }), [
  body('nombre').trim().isLength({ min: 2, max: 120 }),
  body('email').isEmail().normalizeEmail(),
  body('telefono').optional().trim().isLength({ max: 30 }),
  body('servicio').trim().isLength({ min: 2, max: 100 }),
  body('mensaje').trim().isLength({ min: 10, max: 2000 })
], validate, contact);
module.exports = router;
