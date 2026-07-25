function validateEnvironment() {
  if (process.env.NODE_ENV !== 'production') return;
  const required = [
    'DATABASE_URL', 'CLIENT_URL', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET',
    'R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET',
    'SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'MAIL_FROM'
  ];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) throw new Error(`Faltan variables de producción: ${missing.join(', ')}`);
  if (process.env.JWT_ACCESS_SECRET.length < 32 || process.env.JWT_REFRESH_SECRET.length < 32) {
    throw new Error('Los secretos JWT deben tener al menos 32 caracteres.');
  }
  if (process.env.JWT_ACCESS_SECRET === process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_ACCESS_SECRET y JWT_REFRESH_SECRET deben ser diferentes.');
  }
  if (!process.env.CLIENT_URL.startsWith('https://')) throw new Error('CLIENT_URL debe usar HTTPS en producción.');
}

module.exports = { validateEnvironment };
