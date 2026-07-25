const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const auth = require('../controllers/authController');
const trustedOrigin = require('../middleware/trustedOrigin');

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: 'draft-7', legacyHeaders: false, message: { error: 'Demasiados intentos. Espera unos minutos.' } });
const resetLimiter = rateLimit({ windowMs: 60 * 60 * 1000, limit: 5, standardHeaders: 'draft-7', legacyHeaders: false, message: { error: 'Demasiadas solicitudes de recuperación. Intenta más tarde.' } });
router.use(limiter);
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isString().isLength({ min: 8, max: 128 }),
  body('portal').optional().isIn(['admin', 'cliente'])
], validate, auth.login);
router.post('/refresh', trustedOrigin, auth.refresh);
router.post('/logout', trustedOrigin, auth.logout);
router.post('/accept-invitation', [
  body('token').isString().isLength({ min: 32 }),
  body('password').isStrongPassword({ minLength: 10, minUppercase: 1, minLowercase: 1, minNumbers: 1, minSymbols: 0 })
], validate, auth.acceptInvitation);
router.post('/request-password-reset', resetLimiter, [body('email').isEmail().normalizeEmail()], validate, auth.requestPasswordReset);
router.post('/reset-password', [
  body('token').isString().isLength({ min: 32 }),
  body('password').isStrongPassword({ minLength: 10, minUppercase: 1, minLowercase: 1, minNumbers: 1, minSymbols: 0 })
], validate, auth.resetPassword);
module.exports = router;
