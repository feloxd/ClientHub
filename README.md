# Nexo Servicio Integral

Aplicación web completa para una empresa de mantenimiento e instalaciones. Incluye un sitio público, portal privado de clientes y panel administrativo.

## Tecnologías

- **Cliente:** React 18, Vite, Tailwind CSS, React Router, Axios
- **API:** Node.js, Express, Sequelize, MySQL
- **Seguridad:** JWT de corta duración, refresh token en cookie HttpOnly con rotación, bcrypt, Helmet, CORS, rate limiting y bitácora administrativa
- **Archivos:** Cloudflare R2 mediante el SDK S3; la base de datos conserva únicamente la URL pública
- **Correo:** Nodemailer vía SMTP
- **PDF:** PDFKit

## Estructura

```text
/
├── client/   # Sitio público, portal y administración
└── server/   # API, modelos, migraciones y seeders
```

## Requisitos locales

- Node.js 20 o superior
- MySQL 8
- Un bucket de Cloudflare R2 para probar cargas
- Una cuenta SMTP para probar invitaciones y notificaciones

## Inicio rápido

1. Instala las dependencias desde la raíz:

   ```bash
   npm install
   ```

2. Crea una base MySQL:

   ```sql
   CREATE DATABASE nexo_servicios CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. Copia los archivos de entorno:

   ```bash
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   ```

   En Windows PowerShell usa `Copy-Item` en lugar de `cp`.

4. Ajusta `DATABASE_URL`, las claves JWT, R2 y SMTP en `server/.env`.

5. Crea las tablas y los datos de demostración:

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

6. Inicia cliente y servidor:

   ```bash
   npm run dev
   ```

La web estará en `http://localhost:5173` y la API en `http://localhost:3001/api`.

### Cuentas demo

| Portal | Correo | Contraseña |
|---|---|---|
| Administrador | `admin@nexo.mx` | `AdminDemo2026!` |
| Cliente | `cliente@nexo.mx` | `ClienteDemo2026!` |

Las credenciales se pueden cambiar antes de ejecutar el seeder con `SEED_ADMIN_*` y `SEED_CLIENT_*`. No uses las contraseñas demo en producción.

## Variables de entorno

El archivo [`server/.env.example`](server/.env.example) documenta todas las variables:

- `DATABASE_URL`: conexión MySQL completa. Railway la puede inyectar al agregar MySQL.
- `CLIENT_URL`: uno o varios orígenes autorizados por CORS, separados por comas.
- `JWT_ACCESS_SECRET` y `JWT_REFRESH_SECRET`: secretos distintos de al menos 32 caracteres.
- `R2_*`: credenciales, bucket y dominio público de Cloudflare R2.
- `SMTP_*` y `MAIL_FROM`: transporte de correo.
- `CONTACT_EMAIL`: correo que recibe el formulario público (opcional; usa `SMTP_USER` como respaldo).

El cliente solo requiere `VITE_API_URL`, por ejemplo `https://api.tudominio.com/api`.

## Cloudflare R2

1. Crea un bucket y habilita un dominio público o dominio personalizado.
2. Crea un token con permiso de lectura y escritura sobre ese bucket.
3. Configura `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` y `R2_BUCKET`.
4. Mantén el bucket privado. La API genera enlaces de descarga firmados con vigencia de 15 minutos; las credenciales nunca se exponen al navegador.

## Flujo de acceso

- No existe registro público.
- El administrador crea un cliente autorizado.
- La API genera una invitación de un solo uso, guarda únicamente su hash y envía un enlace válido durante 72 horas.
- El cliente establece una contraseña; bcrypt guarda su hash.
- El login entrega un access token de 15 minutos y guarda el refresh token rotatorio en una cookie `HttpOnly`. Al renovar, el token anterior queda revocado.
- El middleware valida JWT y rol. Las rutas de cliente siempre limitan consultas al `user_id` autenticado.

## Despliegue del backend en Railway

1. Crea un proyecto y agrega un servicio MySQL.
2. Conecta el repositorio y configura el directorio raíz como `/server`.
3. Usa `npm start` como comando de inicio.
4. Agrega las variables de `server/.env.example`. Railway suele exponer la conexión MySQL; asígnala a `DATABASE_URL`.
5. Ejecuta una vez `npm run db:migrate`. El seeder demo se bloquea automáticamente en producción salvo que se establezca deliberadamente `ALLOW_DEMO_SEED=true`.
6. Define `CLIENT_URL` con el dominio final de Vercel y revisa que `R2_PUBLIC_URL` sea público.
7. El endpoint `GET /api/salud` puede utilizarse como health check.

## Despliegue del frontend en Vercel

1. Importa el mismo repositorio.
2. Define **Root Directory** como `client`.
3. Vercel detectará Vite; el build es `npm run build` y la salida `dist`.
4. Agrega `VITE_API_URL=https://tu-api.railway.app/api`.
5. `client/vercel.json` ya incluye el rewrite necesario para React Router.
6. Actualiza `CLIENT_URL` en Railway con el dominio asignado por Vercel.

## Endpoints principales

- `POST /api/auth/login`, `/refresh`, `/logout`, `/accept-invitation`
- `POST /api/auth/request-password-reset`, `/reset-password`
- `POST /api/publico/contacto`
- `GET /api/cliente/resumen`, `/reportes`, `/reportes/:id`, `/reportes/:id/pdf`, `/documentos`, `/notificaciones`
- CRUD en `/api/admin/clientes`, `/reportes` y `/documentos`
- `POST /api/admin/reportes/:id/publicar` publica y envía la notificación

## Consideraciones de producción

- Cambia todos los secretos y contraseñas demo.
- Usa HTTPS en frontend, API y dominio público de R2.
- Restringe la cuenta de base de datos al esquema de la aplicación.
- Configura SPF, DKIM y DMARC para el dominio remitente.
- Activa backups automáticos de MySQL y reglas de ciclo de vida en R2.
- Para despliegues con varias instancias, considera reemplazar el rate limiter en memoria por Redis.
