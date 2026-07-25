const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { User, RefreshToken, Invitation, PasswordReset } = require('../models');
const { AppError } = require('../middleware/errors');
const { hash, signAccess, issueRefresh, verifyRefresh } = require('../services/tokenService');
const mail = require('../services/mailService');

const publicUser = (u) => ({ id: u.id, nombre: u.nombre, email: u.email, rol: u.rol });
const refreshCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  path: '/api/auth',
  maxAge: Number(process.env.REFRESH_TOKEN_TTL_DAYS || 7) * 86400000
});
const setRefreshCookie = (res, token) => res.cookie('nexo_refresh', token, refreshCookieOptions());
const clearRefreshCookie = (res) => {
  const { maxAge: _maxAge, ...options } = refreshCookieOptions();
  res.clearCookie('nexo_refresh', options);
};

exports.login = async (req, res, next) => {
  try {
    const { email, password, portal } = req.body;
    const user = await User.unscoped().findOne({ where: { email: email.toLowerCase() } });
    if (!user || !user.password_hash || !(await bcrypt.compare(password, user.password_hash))) throw new AppError('Correo o contraseña incorrectos.', 401);
    if (!user.activo) throw new AppError('Tu acceso se encuentra desactivado. Contacta al administrador.', 403);
    if (portal && user.rol !== portal) throw new AppError(`Esta cuenta no tiene acceso al portal de ${portal === 'admin' ? 'administración' : 'clientes'}.`, 403);
    const accessToken = signAccess(user);
    const refreshToken = await issueRefresh(user);
    setRefreshCookie(res, refreshToken);
    res.json({ accessToken, user: publicUser(user) });
  } catch (error) { next(error); }
};

exports.refresh = async (req, res, next) => {
  try {
    const current = req.cookies.nexo_refresh;
    if (!current) throw new AppError('No hay una sesión disponible para renovar.', 401);
    verifyRefresh(current);
    const record = await RefreshToken.findOne({ where: { token_hash: hash(current), revocado: false } });
    if (!record || record.expira_en < new Date()) throw new AppError('La sesión ya no se puede renovar.', 401);
    const user = await User.unscoped().findByPk(record.user_id);
    if (!user?.activo) throw new AppError('La cuenta no está disponible.', 401);
    record.revocado = true;
    await record.save();
    setRefreshCookie(res, await issueRefresh(user));
    res.json({ accessToken: signAccess(user), user: publicUser(user) });
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') return next(new AppError('El token de renovación no es válido.', 401));
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    if (req.cookies.nexo_refresh) await RefreshToken.update({ revocado: true }, { where: { token_hash: hash(req.cookies.nexo_refresh) } });
    clearRefreshCookie(res);
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

exports.requestPasswordReset = async (req, res, next) => {
  try {
    const user = await User.unscoped().findOne({ where: { email: req.body.email.toLowerCase(), activo: true } });
    if (user) {
      const token = crypto.randomBytes(32).toString('hex');
      await PasswordReset.update({ usado: true }, { where: { user_id: user.id, usado: false } });
      await PasswordReset.create({ user_id: user.id, token_hash: hash(token), expira_en: new Date(Date.now() + 60 * 60 * 1000) });
      await mail.send({
        to: user.email,
        subject: 'Restablece tu contraseña de Nexo',
        title: 'Solicitud de nueva contraseña',
        body: 'Recibimos una solicitud para cambiar tu contraseña. El enlace estará disponible durante 60 minutos.',
        buttonText: 'Crear nueva contraseña',
        buttonUrl: `${process.env.CLIENT_URL}/restablecer-contrasena?token=${token}`
      });
    }
    res.json({ message: 'Si el correo pertenece a una cuenta activa, enviaremos las instrucciones.' });
  } catch (error) { next(error); }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const reset = await PasswordReset.findOne({ where: { token_hash: hash(req.body.token), usado: false } });
    if (!reset || reset.expira_en < new Date()) throw new AppError('El enlace expiró o ya fue utilizado.', 410);
    const user = await User.unscoped().findByPk(reset.user_id);
    if (!user?.activo) throw new AppError('La cuenta no está disponible.', 403);
    user.password_hash = await bcrypt.hash(req.body.password, 12);
    reset.usado = true;
    await Promise.all([
      user.save(),
      reset.save(),
      RefreshToken.update({ revocado: true }, { where: { user_id: user.id, revocado: false } })
    ]);
    res.json({ message: 'Contraseña actualizada. Ya puedes iniciar sesión.' });
  } catch (error) { next(error); }
};
