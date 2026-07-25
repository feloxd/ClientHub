const bcrypt = require('bcryptjs');
const { User, RefreshToken, Invitation } = require('../models');
const { AppError } = require('../middleware/errors');
const { hash, signAccess, issueRefresh, verifyRefresh } = require('../services/tokenService');

const publicUser = (u) => ({ id: u.id, nombre: u.nombre, email: u.email, rol: u.rol });

exports.login = async (req, res, next) => {
  try {
    const { email, password, portal } = req.body;
    const user = await User.unscoped().findOne({ where: { email: email.toLowerCase() } });
    if (!user || !user.password_hash || !(await bcrypt.compare(password, user.password_hash))) throw new AppError('Correo o contraseña incorrectos.', 401);
    if (!user.activo) throw new AppError('Tu acceso se encuentra desactivado. Contacta al administrador.', 403);
    if (portal && user.rol !== portal) throw new AppError(`Esta cuenta no tiene acceso al portal de ${portal === 'admin' ? 'administración' : 'clientes'}.`, 403);
    const accessToken = signAccess(user);
    const refreshToken = await issueRefresh(user);
    res.json({ accessToken, refreshToken, user: publicUser(user) });
  } catch (error) { next(error); }
};

exports.refresh = async (req, res, next) => {
  try {
    const current = req.body.refreshToken;
    verifyRefresh(current);
    const record = await RefreshToken.findOne({ where: { token_hash: hash(current), revocado: false } });
    if (!record || record.expira_en < new Date()) throw new AppError('La sesión ya no se puede renovar.', 401);
    const user = await User.unscoped().findByPk(record.user_id);
    if (!user?.activo) throw new AppError('La cuenta no está disponible.', 401);
    record.revocado = true;
    await record.save();
    res.json({ accessToken: signAccess(user), refreshToken: await issueRefresh(user), user: publicUser(user) });
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') return next(new AppError('El token de renovación no es válido.', 401));
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    if (req.body.refreshToken) await RefreshToken.update({ revocado: true }, { where: { token_hash: hash(req.body.refreshToken) } });
    res.status(204).end();
  } catch (error) { next(error); }
};

exports.acceptInvitation = async (req, res, next) => {
  try {
    const invitation = await Invitation.findOne({ where: { token_hash: hash(req.body.token), usada: false } });
    if (!invitation || invitation.expira_en < new Date()) throw new AppError('La invitación expiró o ya fue utilizada.', 410);
    const user = await User.unscoped().findByPk(invitation.user_id);
    user.password_hash = await bcrypt.hash(req.body.password, 12);
    user.activo = true;
    invitation.usada = true;
    await Promise.all([user.save(), invitation.save()]);
    res.json({ message: 'Contraseña establecida. Ya puedes iniciar sesión.' });
  } catch (error) { next(error); }
};
