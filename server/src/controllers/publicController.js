const mail = require('../services/mailService');

exports.contact = async (req, res, next) => {
  try {
    const destination = process.env.CONTACT_EMAIL || process.env.SMTP_USER;
    if (destination) await mail.send({
      to: destination, subject: `Nuevo contacto web: ${req.body.servicio}`, title: 'Nueva solicitud desde el sitio',
      body: `${req.body.nombre} (${req.body.email}, ${req.body.telefono || 'sin teléfono'}) solicita información sobre ${req.body.servicio}.\n\n${req.body.mensaje}`
    });
    res.status(201).json({ message: 'Recibimos tu solicitud. Un especialista te contactará pronto.' });
  } catch (error) { next(error); }
};
