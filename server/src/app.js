require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { authenticate, authorize } = require('./middleware/auth');
const { notFound, errorHandler } = require('./middleware/errors');

const app = express();
app.set('trust proxy', 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin(origin, callback) {
    const allowed = (process.env.CLIENT_URL || 'http://localhost:5173').split(',').map((v) => v.trim());
    if (!origin || allowed.includes(origin)) return callback(null, true);
    callback(new Error('Origen no autorizado por CORS.'));
  },
  credentials: true
}));
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

app.get('/api/salud', (_req, res) => res.json({ status: 'ok', service: 'Seals HVAC API', timestamp: new Date().toISOString() }));
app.use('/api/publico', require('./routes/publicRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cliente', authenticate, authorize('cliente'), require('./routes/clientRoutes'));
app.use('/api/admin', authenticate, authorize('admin'), require('./routes/adminRoutes'));
app.use(notFound);
app.use(errorHandler);
module.exports = app;
