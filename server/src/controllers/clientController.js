const { Op } = require('sequelize');
const { Report, ReportPhoto, Document, Notification } = require('../models');
const { AppError } = require('../middleware/errors');
const { reportPdf } = require('../services/pdfService');

const reportInclude = [{ model: ReportPhoto, as: 'photos', separate: true, order: [['tipo', 'ASC'], ['orden', 'ASC']] }];

exports.summary = async (req, res, next) => {
  try {
    const where = { user_id: req.user.id, publicado: true };
    const [total, completed, unread, recent] = await Promise.all([
      Report.count({ where }),
      Report.count({ where: { ...where, estatus: 'completado' } }),
      Report.count({ where: { ...where, visto_por_cliente: false } }),
      Report.findAll({ where, include: reportInclude, order: [['fecha_servicio', 'DESC']], limit: 4 }),
    ]);
    res.json({ total, completed, unread, recent });
  } catch (error) { next(error); }
};

exports.reports = async (req, res, next) => {
  try {
    const where = { user_id: req.user.id, publicado: true };
    if (req.query.tipo) where.tipo_servicio = req.query.tipo;
    if (req.query.desde || req.query.hasta) where.fecha_servicio = {
      ...(req.query.desde ? { [Op.gte]: req.query.desde } : {}),
      ...(req.query.hasta ? { [Op.lte]: req.query.hasta } : {})
    };
    const reports = await Report.findAll({ where, include: reportInclude, order: [['fecha_servicio', 'DESC']] });
    res.json(reports);
  } catch (error) { next(error); }
};

exports.report = async (req, res, next) => {
  try {
    const report = await Report.findOne({ where: { id: req.params.id, user_id: req.user.id, publicado: true }, include: reportInclude });
    if (!report) throw new AppError('Reporte no encontrado.', 404);
    if (!report.visto_por_cliente) {
      report.visto_por_cliente = true;
      await Promise.all([
        report.save(),
        Notification.update({ leida: true }, { where: { user_id: req.user.id, tipo: 'reporte', referencia_id: report.id } })
      ]);
    }
    res.json(report);
  } catch (error) { next(error); }
};

exports.reportPdf = async (req, res, next) => {
  try {
    const report = await Report.findOne({ where: { id: req.params.id, user_id: req.user.id, publicado: true } });
    if (!report) throw new AppError('Reporte no encontrado.', 404);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="reporte-NSI-${report.id}.pdf"`);
    reportPdf(report, res);
  } catch (error) { next(error); }
};

exports.documents = async (req, res, next) => {
  try { res.json(await Document.findAll({ where: { user_id: req.user.id }, order: [['created_at', 'DESC']] })); }
  catch (error) { next(error); }
};

exports.notifications = async (req, res, next) => {
  try { res.json(await Notification.findAll({ where: { user_id: req.user.id }, order: [['created_at', 'DESC']], limit: 30 })); }
  catch (error) { next(error); }
};

exports.readNotifications = async (req, res, next) => {
  try {
    await Notification.update({ leida: true }, { where: { user_id: req.user.id, leida: false } });
    res.status(204).end();
  } catch (error) { next(error); }
};
