const PDFDocument = require('pdfkit');

function reportPdf(report, res) {
  const doc = new PDFDocument({ size: 'A4', margin: 52, info: { Title: `Reporte ${report.id} - ${report.titulo}` } });
  doc.pipe(res);
  doc.rect(0, 0, 595, 110).fill('#0b2a4a');
  doc.fillColor('#ffffff').fontSize(20).font('Helvetica-Bold').text('NEXO', 52, 38);
  doc.fillColor('#45c2df').text('SERVICIO INTEGRAL', 116, 38);
  doc.fillColor('#bed3e5').fontSize(9).font('Helvetica').text('REPORTE DE SERVICIO', 52, 68);
  doc.fillColor('#102a43').fontSize(24).font('Helvetica-Bold').text(report.titulo, 52, 145);
  doc.fillColor('#60758a').fontSize(10).font('Helvetica').text(`Folio NSI-${String(report.id).padStart(5, '0')}`, 52, 180);
  const details = [
    ['Cliente', report.client?.nombre || '—'],
    ['Fecha de servicio', report.fecha_servicio],
    ['Tipo de servicio', report.tipo_servicio],
    ['Técnico responsable', report.tecnico || '—'],
    ['Estatus', report.estatus.replace('_', ' ').toUpperCase()]
  ];
  let y = 220;
  details.forEach(([label, value], i) => {
    const x = i % 2 ? 310 : 52;
    if (i % 2 === 0 && i > 0) y += 58;
    doc.fillColor('#60758a').fontSize(8).font('Helvetica-Bold').text(label.toUpperCase(), x, y);
    doc.fillColor('#102a43').fontSize(11).font('Helvetica').text(String(value), x, y + 17, { width: 220 });
  });
  y += 86;
  [['Descripción del trabajo', report.descripcion], ['Notas de servicio', report.notas || 'Sin notas adicionales.'], ['Incidencias y observaciones', report.incidencias || 'Sin incidencias.']].forEach(([title, value]) => {
    if (y > 690) { doc.addPage(); y = 60; }
    doc.fillColor('#1479bd').fontSize(10).font('Helvetica-Bold').text(title.toUpperCase(), 52, y);
    y += 20;
    doc.fillColor('#334e68').fontSize(10).font('Helvetica').text(value, 52, y, { width: 490, lineGap: 4 });
    y = doc.y + 28;
  });
  doc.fillColor('#8799aa').fontSize(8).text(`Documento generado el ${new Date().toLocaleDateString('es-MX')} · Nexo Servicio Integral`, 52, 775, { align: 'center', width: 490 });
  doc.end();
}

module.exports = { reportPdf };
