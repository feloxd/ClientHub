const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
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
  return `${process.env.R2_PUBLIC_URL.replace(/\/$/, '')}/${key}`;
}

async function remove(url) {
  if (!configured() || !url?.startsWith(process.env.R2_PUBLIC_URL)) return;
  const key = url.slice(process.env.R2_PUBLIC_URL.replace(/\/$/, '').length + 1);
  await client().send(new DeleteObjectCommand({ Bucket: process.env.R2_BUCKET, Key: key }));
}

module.exports = { upload, remove };
