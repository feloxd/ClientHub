const { validationResult } = require('express-validator');
const { AppError } = require('./errors');

module.exports = (req, _res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return next(new AppError('Revisa los datos enviados.', 422, result.array()));
  next();
};
