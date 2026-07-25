const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { AppError } = require('./errors');

async function authenticate(req, _res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) throw new AppError('Debes iniciar sesión.', 401);
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await User.findByPk(payload.sub);
    if (!user || !user.activo) throw new AppError('La sesión no es válida.', 401);
    req.user = { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
      return next(new AppError('La sesión expiró o no es válida.', 401));
    }
    next(error);
  }
}

const authorize = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.rol)) return next(new AppError('No tienes permisos para realizar esta acción.', 403));
  next();
};

module.exports = { authenticate, authorize };
