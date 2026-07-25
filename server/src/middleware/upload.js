const multer = require('multer');
const { AppError } = require('./errors');

const storage = multer.memoryStorage();
const imageTypes = ['image/jpeg', 'image/png', 'image/webp'];

const photos = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024, files: 20 },
  fileFilter: (_req, file, cb) => imageTypes.includes(file.mimetype)
    ? cb(null, true)
    : cb(new AppError('Solo se permiten imágenes JPG, PNG o WebP.', 415))
});

const pdf = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => file.mimetype === 'application/pdf'
    ? cb(null, true)
    : cb(new AppError('Solo se permiten archivos PDF.', 415))
});

module.exports = { photos, pdf };
