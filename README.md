# Sistema Inmobiliario V1

Monorepo con:
- `client`: React + Vite
- `server`: Node + Express + Prisma + PostgreSQL

## Requisitos

- Node.js 22+
- PostgreSQL local

## Credenciales PostgreSQL local

- Usuario: `postgres`
- Password: `root`
- DB: `laura_db`
- URL: `postgresql://postgres:root@localhost:5432/laura_db?schema=public`

## Variables de entorno

Ya estan creadas para local en:
- `server/.env`
- `client/.env`

## Instalacion

```bash
npm install
```

## Base de datos (Prisma)

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

Con `DEBUG_MODE=true` se cargan propiedades de ejemplo y usuario admin.

## Correr en desarrollo

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`

## Credenciales admin por defecto

- Usuario: `admin`
- Password: `admin123`

## Endpoints clave

- `GET /health`
- `POST /api/auth/login`
- `GET /api/properties`
- `GET /api/properties/:slug`
- `GET /api/admin/properties`
- `POST /api/admin/properties`
- `PUT /api/admin/properties/:id`
- `DELETE /api/admin/properties/:id`
- `POST /api/admin/upload`
