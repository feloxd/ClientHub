const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuid } = require('uuid');
const { AppError } = require('../middleware/errors');

const configured = () => process.env.R2_ACCOUNT_ID && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.R2_BUCKET;
const client = () => new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY }
});

async function upload(file, folder) {
  if (!configured()) throw new AppError('El almacenamiento R2 no está configurado.', 503);
  const safeName = file.originalname.toLowerCase().replace(/[^a-z0-9._-]+/g, '-');
  const key = `${folder}/${Date.now()}-${uuid()}-${safeName}`;
  await client().send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET, Key: key, Body: file.buffer, ContentType: file.mimetype,
    CacheControl: 'public, max-age=31536000, immutable'
  }));
  return `r2://${process.env.R2_BUCKET}/${key}`;
}

async function remove(url) {
  if (!configured() || !url) return;
  let key;
  if (url.startsWith(`r2://${process.env.R2_BUCKET}/`)) key = url.slice(`r2://${process.env.R2_BUCKET}/`.length);
  else if (process.env.R2_PUBLIC_URL && url.startsWith(process.env.R2_PUBLIC_URL)) key = url.slice(process.env.R2_PUBLIC_URL.replace(/\/$/, '').length + 1);
  else return;
  await client().send(new DeleteObjectCommand({ Bucket: process.env.R2_BUCKET, Key: key }));
}

async function signedUrl(url, expiresIn = 900) {
  if (!url?.startsWith('r2://')) return url;
  if (!configured()) throw new AppError('El almacenamiento R2 no está configurado.', 503);
  const prefix = `r2://${process.env.R2_BUCKET}/`;
  if (!url.startsWith(prefix)) throw new AppError('La referencia de archivo no es válida.', 400);
  const key = url.slice(prefix.length);
  return getSignedUrl(client(), new GetObjectCommand({ Bucket: process.env.R2_BUCKET, Key: key }), { expiresIn });
}

async function signPhotos(report) {
  const plain = report.toJSON ? report.toJSON() : report;
  if (plain.photos) plain.photos = await Promise.all(plain.photos.map(async (photo) => ({ ...photo, url: await signedUrl(photo.url) })));
  return plain;
}

async function signDocument(document) {
  const plain = document.toJSON ? document.toJSON() : document;
  return { ...plain, url: await signedUrl(plain.url) };
}

module.exports = { upload, remove, signedUrl, signPhotos, signDocument };
