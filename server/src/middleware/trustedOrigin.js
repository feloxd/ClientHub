const { AppError } = require('./errors');

module.exports = (req, _res, next) => {
  const origin = req.get('origin');
  if (!origin) return next();
  const allowed = (process.env.CLIENT_URL || 'http://localhost:5173').split(',').map((value) => value.trim());
  if (!allowed.includes(origin)) return next(new AppError('Origen no autorizado.', 403));
  next();
};
