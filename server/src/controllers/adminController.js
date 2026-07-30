const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { Op } = require('sequelize');
const { User, Report, ReportPhoto, Document, Notification, Invitation, RefreshToken, AuditLog } = require('../models');
const { AppError } = require('../middleware/errors');
const storage = require('../services/storageService');
const mail = require('../services/mailService');
const { hash } = require('../services/tokenService');
const { audit } = require('../services/auditService');

const reportInclude = [
  { model: User, as: 'client', attributes: ['id', 'nombre', 'email', 'activo'] },
  { model: ReportPhoto, as: 'photos', separate: true, order: [['tipo', 'ASC'], ['orden', 'ASC']] }
];

async function createInvitation(user) {
  const token = crypto.randomBytes(32).toString('hex');
  await Invitation.update({ usada: true }, { where: { user_id: user.id, usada: false } });
  await Invitation.create({ user_id: user.id, token_hash: hash(token), expira_en: new Date(Date.now() + 72 * 3600000) });
  const link = `${process.env.CLIENT_URL}/establecer-contrasena?token=${token}`;
  await mail.send({
    to: user.email, subject: 'Activate your Seals HVAC portal access', title: `Welcome, ${user.nombre}`,
    body: 'Tu acceso al portal de clientes fue autorizado. Establece tu contraseña dentro de las próximas 72 horas.',
    buttonText: 'Establecer contraseña', buttonUrl: link
  });
  return link;
}

exports.stats = async (_req, res, next) => {
  try {
    const [clients, active, reports, drafts] = await Promise.all([
      User.count({ where: { rol: 'cliente' } }),
      User.count({ where: { rol: 'cliente', activo: true } }),
      Report.count(),
      Report.count({ where: { publicado: false } })
    ]);
    res.json({ clients, active, reports, drafts });
  } catch (error) { next(error); }
};

exports.clients = async (req, res, next) => {
  try {
    const where = { rol: 'cliente' };
    if (req.query.q) where[Op.or] = [
      { nombre: { [Op.like]: `%${req.query.q}%` } },
      { email: { [Op.like]: `%${req.query.q}%` } }
    ];
    res.json(await User.findAll({
      where,
      attributes: { include: [[User.sequelize.fn('COUNT', User.sequelize.col('reports.id')), 'reportCount']] },
      include: [{ model: Report, as: 'reports', attributes: [] }],
      group: ['User.id'],
      order: [['created_at', 'DESC']]
    }));
  } catch (error) { next(error); }
};

exports.createClient = async (req, res, next) => {
  try {
    const exists = await User.findOne({ where: { email: req.body.email.toLowerCase() } });
    if (exists) throw new AppError('Ya existe una cuenta con ese correo.', 409);
    const user = await User.create({ nombre: req.body.nombre, email: req.body.email.toLowerCase(), rol: 'cliente', activo: true });
    const invitationUrl = await createInvitation(user);
    await audit(req, 'crear', 'cliente', user.id, { nombre: user.nombre, email: user.email });
    res.status(201).json({ user, ...(process.env.NODE_ENV === 'development' ? { invitationUrl } : {}) });
  } catch (error) { next(error); }
};

exports.updateClient = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id, rol: 'cliente' } });
    if (!user) throw new AppError('Cliente no encontrado.', 404);
    if (req.body.email) {
      const duplicate = await User.findOne({ where: { email: req.body.email.toLowerCase(), id: { [Op.ne]: user.id } } });
      if (duplicate) throw new AppError('Ya existe una cuenta con ese correo.', 409);
    }
    await user.update({ nombre: req.body.nombre ?? user.nombre, email: req.body.email?.toLowerCase() ?? user.email, activo: req.body.activo ?? user.activo });
    if (req.body.activo === false) await RefreshToken.update({ revocado: true }, { where: { user_id: user.id, revocado: false } });
    await audit(req, req.body.activo === false ? 'desactivar' : req.body.activo === true ? 'activar' : 'editar', 'cliente', user.id, { campos: Object.keys(req.body) });
    res.json(user);
  } catch (error) { next(error); }
};

exports.deleteClient = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id, rol: 'cliente' },
      include: [
        { model: Report, as: 'reports', include: [{ model: ReportPhoto, as: 'photos' }] },
        { model: Document, as: 'documents' }
      ]
    });
    if (!user) throw new AppError('Cliente no encontrado.', 404);
    const urls = [
      ...user.reports.flatMap((report) => report.photos.map((photo) => photo.url)),
      ...user.documents.map((document) => document.url)
    ];
    await Promise.all(urls.map((url) => storage.remove(url)));
    await audit(req, 'eliminar', 'cliente', user.id, { nombre: user.nombre, email: user.email });
    await user.destroy();
    res.status(204).end();
  } catch (error) { next(error); }
};

exports.resendInvitation = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id, rol: 'cliente' } });
    if (!user) throw new AppError('Cliente no encontrado.', 404);
    const invitationUrl = await createInvitation(user);
    await audit(req, 'reenviar_invitacion', 'cliente', user.id);
    res.json({ message: 'Invitación enviada.', ...(process.env.NODE_ENV === 'development' ? { invitationUrl } : {}) });
  } catch (error) { next(error); }
};

exports.reports = async (req, res, next) => {
  try {
    const where = {};
    if (req.query.cliente) where.user_id = req.query.cliente;
    if (req.query.estatus) where.estatus = req.query.estatus;
    if (req.query.tipo) where.tipo_servicio = req.query.tipo;
    if (req.query.desde || req.query.hasta) where.fecha_servicio = {
      ...(req.query.desde ? { [Op.gte]: req.query.desde } : {}),
      ...(req.query.hasta ? { [Op.lte]: req.query.hasta } : {})
    };
    if (req.query.q) where[Op.or] = [
      { titulo: { [Op.like]: `%${req.query.q}%` } },
      { descripcion: { [Op.like]: `%${req.query.q}%` } }
    ];
    const reports = await Report.findAll({ where, include: reportInclude, order: [['fecha_servicio', 'DESC']] });
    res.json(await Promise.all(reports.map(storage.signPhotos)));
  } catch (error) { next(error); }
};

exports.createReport = async (req, res, next) => {
  try {
    const client = await User.findOne({ where: { id: req.body.user_id, rol: 'cliente' } });
    if (!client) throw new AppError('El cliente seleccionado no existe.', 404);
    const report = await Report.create(req.body);
    await audit(req, 'crear', 'reporte', report.id, { user_id: report.user_id, titulo: report.titulo });
    res.status(201).json(await storage.signPhotos(await Report.findByPk(report.id, { include: reportInclude })));
  } catch (error) { next(error); }
};

exports.updateReport = async (req, res, next) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) throw new AppError('Reporte no encontrado.', 404);
    if (req.body.user_id) {
      const client = await User.findOne({ where: { id: req.body.user_id, rol: 'cliente' } });
      if (!client) throw new AppError('El cliente seleccionado no existe.', 404);
    }
    await report.update(req.body);
    await audit(req, 'editar', 'reporte', report.id, { campos: Object.keys(req.body) });
    res.json(await storage.signPhotos(await Report.findByPk(report.id, { include: reportInclude })));
  } catch (error) { next(error); }
};

exports.deleteReport = async (req, res, next) => {
  try {
    const report = await Report.findByPk(req.params.id, { include: [{ model: ReportPhoto, as: 'photos' }] });
    if (!report) throw new AppError('Reporte no encontrado.', 404);
    await Promise.all(report.photos.map((photo) => storage.remove(photo.url)));
    await audit(req, 'eliminar', 'reporte', report.id, { titulo: report.titulo });
    await report.destroy();
    res.status(204).end();
  } catch (error) { next(error); }
};

exports.uploadPhotos = async (req, res, next) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) throw new AppError('Reporte no encontrado.', 404);
    if (!req.files?.length) throw new AppError('Selecciona al menos una imagen.', 422);
    const type = req.body.tipo;
    const current = await ReportPhoto.count({ where: { report_id: report.id, tipo: type } });
    const created = [];
    for (let i = 0; i < req.files.length; i += 1) {
      const url = await storage.upload(req.files[i], `reportes/${report.id}/${type}`);
      created.push(await ReportPhoto.create({ report_id: report.id, url, tipo: type, orden: current + i }));
    }
    await audit(req, 'subir_fotos', 'reporte', report.id, { tipo: type, cantidad: created.length });
    res.status(201).json(await Promise.all(created.map(async (photo) => ({ ...photo.toJSON(), url: await storage.signedUrl(photo.url) }))));
  } catch (error) { next(error); }
};

exports.deletePhoto = async (req, res, next) => {
  try {
    const photo = await ReportPhoto.findByPk(req.params.photoId);
    if (!photo || String(photo.report_id) !== String(req.params.id)) throw new AppError('Fotografía no encontrada.', 404);
    await storage.remove(photo.url);
    await photo.destroy();
    await audit(req, 'eliminar_foto', 'reporte', req.params.id, { photo_id: photo.id, tipo: photo.tipo });
    res.status(204).end();
  } catch (error) { next(error); }
};

exports.publishReport = async (req, res, next) => {
  try {
    const report = await Report.findByPk(req.params.id, { include: [{ model: User, as: 'client' }] });
    if (!report) throw new AppError('Reporte no encontrado.', 404);
    report.publicado = true;
    report.visto_por_cliente = false;
    await report.save();
    await Notification.create({ user_id: report.user_id, tipo: 'reporte', referencia_id: report.id });
    await mail.send({
      to: report.client.email, subject: `Nuevo reporte: ${report.titulo}`, title: 'Tienes un nuevo reporte de servicio',
      body: `Publicamos el reporte “${report.titulo}” correspondiente al ${report.fecha_servicio}. Ya puedes consultarlo en tu portal.`,
      buttonText: 'Ver reporte', buttonUrl: `${process.env.CLIENT_URL}/portal/reportes/${report.id}`
    });
    await audit(req, 'publicar', 'reporte', report.id, { user_id: report.user_id });
    res.json(report);
  } catch (error) { next(error); }
};

exports.documents = async (req, res, next) => {
  try {
    const where = req.query.cliente ? { user_id: req.query.cliente } : {};
    const documents = await Document.findAll({ where, include: [{ model: User, as: 'client', attributes: ['id', 'nombre'] }], order: [['created_at', 'DESC']] });
    res.json(await Promise.all(documents.map(storage.signDocument)));
  } catch (error) { next(error); }
};

exports.createDocument = async (req, res, next) => {
  try {
    if (!req.file) throw new AppError('Selecciona un archivo PDF.', 422);
    const client = await User.findOne({ where: { id: req.body.user_id, rol: 'cliente' } });
    if (!client) throw new AppError('Cliente no encontrado.', 404);
    const url = await storage.upload(req.file, `documentos/${client.id}`);
    const document = await Document.create({ user_id: client.id, titulo: req.body.titulo, categoria: req.body.categoria, url });
    await Notification.create({ user_id: client.id, tipo: 'documento', referencia_id: document.id });
    await mail.send({
      to: client.email, subject: `Nuevo documento: ${document.titulo}`, title: 'Hay un nuevo documento en tu portal',
      body: `Agregamos “${document.titulo}” a tu sección de documentos.`,
      buttonText: 'Ver documentos', buttonUrl: `${process.env.CLIENT_URL}/portal/documentos`
    });
    await audit(req, 'crear', 'documento', document.id, { user_id: client.id, titulo: document.titulo });
    res.status(201).json(await storage.signDocument(document));
  } catch (error) { next(error); }
};

exports.updateDocument = async (req, res, next) => {
  try {
    const document = await Document.findByPk(req.params.id);
    if (!document) throw new AppError('Documento no encontrado.', 404);
    const updates = {};
    if (req.body.titulo !== undefined) updates.titulo = req.body.titulo;
    if (req.body.categoria !== undefined) updates.categoria = req.body.categoria;
    if (req.body.user_id !== undefined) {
      const client = await User.findOne({ where: { id: req.body.user_id, rol: 'cliente' } });
      if (!client) throw new AppError('Cliente no encontrado.', 404);
      updates.user_id = client.id;
    }
    await document.update(updates);
    await audit(req, 'editar', 'documento', document.id, { campos: Object.keys(updates) });
    res.json(await storage.signDocument(await Document.findByPk(document.id, { include: [{ model: User, as: 'client', attributes: ['id', 'nombre'] }] })));
  } catch (error) { next(error); }
};

exports.deleteDocument = async (req, res, next) => {
  try {
    const document = await Document.findByPk(req.params.id);
    if (!document) throw new AppError('Documento no encontrado.', 404);
    await storage.remove(document.url);
    await audit(req, 'eliminar', 'documento', document.id, { titulo: document.titulo, user_id: document.user_id });
    await document.destroy();
    res.status(204).end();
  } catch (error) { next(error); }
};

exports.auditLogs = async (req, res, next) => {
  try {
    const where = {};
    if (req.query.entidad) where.entidad = req.query.entidad;
    const logs = await AuditLog.findAll({
      where,
      include: [{ model: User, as: 'admin', attributes: ['id', 'nombre', 'email'] }],
      order: [['created_at', 'DESC']],
      limit: Math.min(Number(req.query.limit || 100), 250)
    });
    res.json(logs);
  } catch (error) { next(error); }
};
