const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/database')[process.env.NODE_ENV || 'development'];

const sequelize = dbConfig.use_env_variable
  ? new Sequelize(process.env[dbConfig.use_env_variable], dbConfig)
  : new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

const User = require('./user')(sequelize, DataTypes);
const Report = require('./report')(sequelize, DataTypes);
const ReportPhoto = require('./reportPhoto')(sequelize, DataTypes);
const Document = require('./document')(sequelize, DataTypes);
const Notification = require('./notification')(sequelize, DataTypes);
const RefreshToken = require('./refreshToken')(sequelize, DataTypes);
const Invitation = require('./invitation')(sequelize, DataTypes);
const PasswordReset = require('./passwordReset')(sequelize, DataTypes);
const AuditLog = require('./auditLog')(sequelize, DataTypes);
const ServiceRequest = require('./serviceRequest')(sequelize, DataTypes);
const Quote = require('./quote')(sequelize, DataTypes);
const QuoteOption = require('./quoteOption')(sequelize, DataTypes);
const Appointment = require('./appointment')(sequelize, DataTypes);
const Payment = require('./payment')(sequelize, DataTypes);

User.hasMany(Report, { foreignKey: 'user_id', as: 'reports' });
Report.belongsTo(User, { foreignKey: 'user_id', as: 'client' });
Report.hasMany(ReportPhoto, { foreignKey: 'report_id', as: 'photos', onDelete: 'CASCADE' });
ReportPhoto.belongsTo(Report, { foreignKey: 'report_id' });
User.hasMany(Document, { foreignKey: 'user_id', as: 'documents' });
Document.belongsTo(User, { foreignKey: 'user_id', as: 'client' });
User.hasMany(Notification, { foreignKey: 'user_id', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(RefreshToken, { foreignKey: 'user_id', as: 'refreshTokens', onDelete: 'CASCADE' });
RefreshToken.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Invitation, { foreignKey: 'user_id', as: 'invitations', onDelete: 'CASCADE' });
Invitation.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(PasswordReset, { foreignKey: 'user_id', as: 'passwordResets', onDelete: 'CASCADE' });
PasswordReset.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(AuditLog, { foreignKey: 'admin_id', as: 'auditLogs', onDelete: 'SET NULL' });
AuditLog.belongsTo(User, { foreignKey: 'admin_id', as: 'admin' });
User.hasMany(ServiceRequest, { foreignKey: 'user_id', as: 'serviceRequests' });
ServiceRequest.belongsTo(User, { foreignKey: 'user_id', as: 'client' });
ServiceRequest.hasMany(Quote, { foreignKey: 'service_request_id', as: 'quotes', onDelete: 'CASCADE' });
Quote.belongsTo(ServiceRequest, { foreignKey: 'service_request_id', as: 'request' });
Quote.hasMany(QuoteOption, { foreignKey: 'quote_id', as: 'options', onDelete: 'CASCADE' });
QuoteOption.belongsTo(Quote, { foreignKey: 'quote_id' });
ServiceRequest.hasOne(Appointment, { foreignKey: 'service_request_id', as: 'appointment', onDelete: 'CASCADE' });
Appointment.belongsTo(ServiceRequest, { foreignKey: 'service_request_id', as: 'request' });
ServiceRequest.hasMany(Payment, { foreignKey: 'service_request_id', as: 'payments', onDelete: 'CASCADE' });
Payment.belongsTo(ServiceRequest, { foreignKey: 'service_request_id', as: 'request' });

module.exports = { sequelize, Sequelize, User, Report, ReportPhoto, Document, Notification, RefreshToken, Invitation, PasswordReset, AuditLog, ServiceRequest, Quote, QuoteOption, Appointment, Payment };
