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

## Deploy en Render (Blueprint)

Este repo ya incluye `render.yaml` para crear:
- `laura-api` (backend Node + Prisma)
- `laura-client` (frontend static con Vite)

### Primer deploy

1. En Render, crear un Blueprint desde este repo.
2. El `render.yaml` ya conecta automaticamente:
   - `CLIENT_ORIGIN` (api) desde `RENDER_EXTERNAL_URL` de `laura-client`
   - `VITE_API_BASE_URL` (client) desde `RENDER_EXTERNAL_URL` de `laura-api`
3. Base compartida:
   - `DATABASE_URL` ya queda apuntando a `bsdc` con `?schema=laura`
   - asi Prisma migra y escribe solo en el schema `laura`
   - el start script falla si no detecta `schema=laura` para evitar pisar otros proyectos
4. Credenciales iniciales admin por blueprint:
   - Usuario: `admin`
   - Password: `admin123` (cambiar despues del alta inicial)

### Seed inicial (una sola vez)

- El deploy corre migraciones siempre.
- El seed se ejecuta solo si `RUN_SEED_ON_DEPLOY=true`.
- En el primer deploy dejalo en `true`.
- Despues del primer deploy, cambia `RUN_SEED_ON_DEPLOY=false` en Render y redeploy.
