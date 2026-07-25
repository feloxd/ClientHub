const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { RefreshToken } = require('../models');

const hash = (value) => crypto.createHash('sha256').update(value).digest('hex');

function signAccess(user) {
  return jwt.sign(
    { sub: user.id, rol: user.rol, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_TTL || '15m' }
  );
}

async function issueRefresh(user) {
  const days = Number(process.env.REFRESH_TOKEN_TTL_DAYS || 7);
  const token = jwt.sign(
    { sub: user.id, type: 'refresh', jti: crypto.randomUUID() },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: `${days}d` }
  );
  await RefreshToken.create({
    user_id: user.id,
    token_hash: hash(token),
    expira_en: new Date(Date.now() + days * 86400000)
  });
  return token;
}

function verifyRefresh(token) {
  const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  if (payload.type !== 'refresh') throw new Error('Tipo de token inválido.');
  return payload;
}

module.exports = { hash, signAccess, issueRefresh, verifyRefresh };
