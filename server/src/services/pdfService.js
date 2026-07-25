const PDFDocument = require('pdfkit');

async function downloadImage(url) {
  if (!url) return null;
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!response.ok) return null;
    const type = response.headers.get('content-type') || '';
    if (!type.includes('jpeg') && !type.includes('png')) return null;
    return Buffer.from(await response.arrayBuffer());
  } catch {
    return null;
  }
}

function addBrand(doc) {
  doc.rect(0, 0, 595, 108).fill('#0b2a4a');
  doc.roundedRect(52, 34, 36, 36, 8).fill('#45c2df');
  doc.fillColor('#0b2a4a').fontSize(22).font('Helvetica-Bold').text('N', 62, 41);
  doc.fillColor('#ffffff').fontSize(18).text(process.env.COMPANY_NAME || 'NEXO', 101, 36);
  doc.fillColor('#45c2df').fontSize(11).text(process.env.COMPANY_SUBTITLE || 'SERVICIO INTEGRAL', 101, 59);
  doc.fillColor('#bed3e5').fontSize(8).font('Helvetica').text('REPORTE DIGITAL DE SERVICIO', 389, 49, { width: 154, align: 'right' });
}

function addFooter(doc) {
  const bottom = doc.page.height - 40;
  doc.strokeColor('#dce6ee').moveTo(52, bottom - 10).lineTo(543, bottom - 10).stroke();
  doc.fillColor('#8799aa').fontSize(7.5).font('Helvetica')
    .text(`${process.env.COMPANY_NAME || 'Nexo Servicio Integral'} · ${process.env.COMPANY_PHONE || '55 8000 2468'} · ${process.env.COMPANY_EMAIL || 'contacto@nexo.mx'}`, 52, bottom, { width: 491, align: 'center' });
}

function ensureSpace(doc, y, needed = 120) {
  if (y + needed <= doc.page.height - 65) return y;
  addFooter(doc);
  doc.addPage();
  return 54;
}

async function reportPdf(report, res) {
  const before = report.photos?.filter((photo) => photo.tipo === 'antes').slice(0, 4) || [];
  const after = report.photos?.filter((photo) => photo.tipo === 'despues').slice(0, 4) || [];
  const [beforeImages, afterImages] = await Promise.all([
    Promise.all(before.map((photo) => downloadImage(photo.url))),
    Promise.all(after.map((photo) => downloadImage(photo.url)))
  ]);

  const doc = new PDFDocument({
    size: 'A4',
    margin: 52,
    bufferPages: true,
    info: { Title: `Reporte ${report.id} - ${report.titulo}`, Author: process.env.COMPANY_NAME || 'Nexo Servicio Integral' }
  });
  doc.pipe(res);
  addBrand(doc);
  doc.fillColor('#102a43').fontSize(23).font('Helvetica-Bold').text(report.titulo, 52, 138, { width: 490 });
  doc.fillColor('#60758a').fontSize(9).font('Helvetica').text(`Folio NSI-${String(report.id).padStart(5, '0')}  ·  Emitido ${new Date().toLocaleDateString('es-MX')}`, 52, 174);

  const details = [
    ['Cliente', report.client?.nombre || '—'],
    ['Fecha de servicio', report.fecha_servicio],
    ['Tipo de servicio', report.tipo_servicio],
    ['Técnico responsable', report.tecnico || '—'],
    ['Estatus', report.estatus.replaceAll('_', ' ').toUpperCase()]
  ];
  let y = 214;
  details.forEach(([label, value], index) => {
    const x = index % 2 ? 310 : 52;
    if (index % 2 === 0 && index > 0) y += 52;
    doc.fillColor('#60758a').fontSize(7.5).font('Helvetica-Bold').text(label.toUpperCase(), x, y);
    doc.fillColor('#102a43').fontSize(10.5).font('Helvetica').text(String(value), x, y + 15, { width: 220 });
  });
  y += 75;

  for (const [title, value] of [
    ['Descripción del trabajo', report.descripcion],
    ['Notas de servicio', report.notas || 'Sin notas adicionales.'],
    ['Incidencias y observaciones', report.incidencias || 'Sin incidencias.']
  ]) {
    y = ensureSpace(doc, y, 90);
    doc.fillColor('#1479bd').fontSize(9).font('Helvetica-Bold').text(title.toUpperCase(), 52, y);
    y += 18;
    doc.fillColor('#334e68').fontSize(9.5).font('Helvetica').text(value, 52, y, { width: 490, lineGap: 3 });
    y = doc.y + 23;
  }

  const hasEvidence = beforeImages.some(Boolean) || afterImages.some(Boolean);
  if (hasEvidence) {
    y = ensureSpace(doc, y, 250);
    doc.fillColor('#1479bd').fontSize(9).font('Helvetica-Bold').text('EVIDENCIA FOTOGRÁFICA', 52, y);
    y += 22;
    for (const [label, images] of [['ANTES', beforeImages], ['DESPUÉS', afterImages]]) {
      const valid = images.filter(Boolean);
      if (!valid.length) continue;
      y = ensureSpace(doc, y, 190);
      doc.fillColor('#60758a').fontSize(8).font('Helvetica-Bold').text(label, 52, y);
      y += 16;
      valid.slice(0, 2).forEach((buffer, index) => {
        const x = 52 + index * 250;
        try {
          doc.image(buffer, x, y, { fit: [236, 150], align: 'center', valign: 'center' });
          doc.rect(x, y, 236, 150).strokeColor('#dce6ee').stroke();
        } catch { /* una imagen dañada no cancela el PDF */ }
      });
      y += 172;
    }
  }

  const range = doc.bufferedPageRange();
  for (let page = range.start; page < range.start + range.count; page += 1) {
    doc.switchToPage(page);
    addFooter(doc);
    doc.fillColor('#8799aa').fontSize(7).text(`Página ${page + 1} de ${range.count}`, 470, doc.page.height - 40, { width: 73, align: 'right' });
  }
  doc.end();
}

module.exports = { reportPdf };
