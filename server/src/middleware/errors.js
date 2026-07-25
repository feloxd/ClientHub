class AppError extends Error {
  constructor(message, status = 500, details = undefined) {
    super(message);
    this.status = status;
    this.details = details;
    this.isOperational = true;
  }
}

function notFound(req, _res, next) {
  next(new AppError(`La ruta ${req.method} ${req.originalUrl} no existe.`, 404));
}

function errorHandler(error, _req, res, _next) {
  const status = error.status || 500;
  if (process.env.NODE_ENV !== 'test') console.error(error);
  res.status(status).json({
    error: status === 500 && !error.isOperational ? 'Ocurrió un error inesperado.' : error.message,
    ...(error.details ? { details: error.details } : {})
  });
}

module.exports = { AppError, notFound, errorHandler };
