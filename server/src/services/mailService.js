const nodemailer = require('nodemailer');

const hasSmtp = () => process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;
const transport = () => nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

async function send({ to, subject, title, body, buttonText, buttonUrl }) {
  if (!hasSmtp()) {
    console.warn(`[correo omitido: SMTP sin configurar] ${subject} -> ${to}`);
    return;
  }
  await transport().sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    text: `${title}\n\n${body}\n\n${buttonUrl || ''}`,
    html: `<div style="background:#f4f8fb;padding:32px;font-family:Arial,sans-serif;color:#19344d">
      <div style="max-width:580px;margin:auto;background:#fff;border-radius:16px;padding:32px;border-top:5px solid #1479bd">
        <div style="font-weight:800;font-size:20px;color:#0b2a4a">NEXO <span style="color:#1479bd">SERVICIO INTEGRAL</span></div>
        <h1 style="font-size:24px;margin:28px 0 12px">${title}</h1>
        <p style="line-height:1.65;color:#536b7e">${body}</p>
        ${buttonUrl ? `<a href="${buttonUrl}" style="display:inline-block;background:#1479bd;color:white;text-decoration:none;padding:13px 20px;border-radius:9px;margin-top:16px;font-weight:bold">${buttonText}</a>` : ''}
        <p style="font-size:12px;color:#8a9aa8;margin-top:32px">Mensaje automático. Si no reconoces esta cuenta, ignora este correo.</p>
      </div>
    </div>`
  });
}

module.exports = { send };
