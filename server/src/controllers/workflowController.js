const { ServiceRequest, Quote, QuoteOption, Appointment, Payment, Notification, User, sequelize } = require('../models');
const { AppError } = require('../middleware/errors');
const mail = require('../services/mailService');

const include = [
  { model: Quote, as: 'quotes', include: [{ model: QuoteOption, as: 'options' }] },
  { model: Appointment, as: 'appointment' },
  { model: Payment, as: 'payments' }
];

exports.clientList = async (req, res, next) => {
  try { res.json(await ServiceRequest.findAll({ where: { user_id: req.user.id }, include, order: [['created_at', 'DESC']] })); }
  catch (error) { next(error); }
};

exports.clientCreate = async (req, res, next) => {
  try {
    const request = await ServiceRequest.create({ ...req.body, user_id: req.user.id, estatus: 'recibida' });
    res.status(201).json(request);
  } catch (error) { next(error); }
};

exports.clientApproveQuote = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const quote = await Quote.findOne({ where: { id: req.params.quoteId, estatus: 'publicada' }, include: [{ model: ServiceRequest, as: 'request', where: { user_id: req.user.id } }], transaction });
    if (!quote) throw new AppError('Cotización no encontrada.', 404);
    const option = await QuoteOption.findOne({ where: { id: req.body.opcion_id, quote_id: quote.id }, transaction });
    if (!option) throw new AppError('Opción de cotización no válida.', 422);
    await quote.update({ estatus: 'aprobada', opcion_aprobada_id: option.id }, { transaction });
    await quote.request.update({ estatus: 'autorizada' }, { transaction });
    await transaction.commit();
    res.json({ quote, option });
  } catch (error) { await transaction.rollback(); next(error); }
};

exports.adminList = async (_req, res, next) => {
  try { res.json(await ServiceRequest.findAll({ include: [{ model: User, as: 'client', attributes: ['id', 'nombre', 'email'] }, ...include], order: [['created_at', 'DESC']] })); }
  catch (error) { next(error); }
};

exports.adminUpdate = async (req, res, next) => {
  try {
    const request = await ServiceRequest.findByPk(req.params.id);
    if (!request) throw new AppError('Solicitud no encontrada.', 404);
    await request.update(req.body);
    res.json(request);
  } catch (error) { next(error); }
};

exports.adminPublishQuote = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const request = await ServiceRequest.findByPk(req.params.id, { include: [{ model: User, as: 'client' }], transaction });
    if (!request) throw new AppError('Solicitud no encontrada.', 404);
    const quote = await Quote.create({ service_request_id: request.id, mensaje: req.body.mensaje, estatus: 'publicada' }, { transaction });
    await QuoteOption.bulkCreate(req.body.opciones.map((option) => ({ ...option, quote_id: quote.id })), { transaction });
    await request.update({ estatus: 'cotizacion' }, { transaction });
    await Notification.create({ user_id: request.user_id, tipo: 'sistema', referencia_id: request.id, leida: false }, { transaction });
    await transaction.commit();
    mail.send({ to: request.client.email, subject: 'Nueva cotización de SEALS HVAC', title: 'Tu cotización está lista', body: `La solicitud para ${request.unidad} tiene nuevas opciones para revisar.`, buttonText: 'Revisar cotización', buttonUrl: `${process.env.CLIENT_URL}/portal` }).catch(console.error);
    res.status(201).json(await Quote.findByPk(quote.id, { include: [{ model: QuoteOption, as: 'options' }] }));
  } catch (error) { await transaction.rollback(); next(error); }
};

exports.adminSchedule = async (req, res, next) => {
  try {
    const request = await ServiceRequest.findByPk(req.params.id);
    if (!request) throw new AppError('Solicitud no encontrada.', 404);
    const appointment = await Appointment.upsert({ service_request_id: request.id, ...req.body });
    await request.update({ estatus: 'programada', tecnico: req.body.tecnico });
    res.json(appointment[0]);
  } catch (error) { next(error); }
};

exports.adminPayment = async (req, res, next) => {
  try {
    const request = await ServiceRequest.findByPk(req.params.id);
    if (!request) throw new AppError('Solicitud no encontrada.', 404);
    res.status(201).json(await Payment.create({ service_request_id: request.id, ...req.body, cobrado_en: new Date() }));
  } catch (error) { next(error); }
};
