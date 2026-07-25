const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const auth = require('../controllers/authController');

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: 'draft-7', legacyHeaders: false, message: { error: 'Demasiados intentos. Espera unos minutos.' } });
router.use(limiter);
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isString().isLength({ min: 8, max: 128 }),
  body('portal').optional().isIn(['admin', 'cliente'])
], validate, auth.login);
router.post('/refresh', [body('refreshToken').isString().notEmpty()], validate, auth.refresh);
router.post('/logout', [body('refreshToken').optional().isString()], validate, auth.logout);
router.post('/accept-invitation', [
  body('token').isString().isLength({ min: 32 }),
  body('password').isStrongPassword({ minLength: 10, minUppercase: 1, minLowercase: 1, minNumbers: 1, minSymbols: 0 })
], validate, auth.acceptInvitation);
module.exports = router;
