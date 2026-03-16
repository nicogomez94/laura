#!/usr/bin/env bash
set -euo pipefail

if [[ "${DATABASE_URL:-}" != *"schema=laura"* ]]; then
  echo "ERROR: DATABASE_URL must include schema=laura to protect shared database."
  exit 1
fi

echo "Generating Prisma client..."
npx prisma generate

echo "Running Prisma migrations..."
npx prisma migrate deploy

if [[ "${RUN_SEED_ON_DEPLOY:-false}" == "true" ]]; then
  echo "RUN_SEED_ON_DEPLOY=true, running seed..."
  node prisma/seed.js
else
  echo "RUN_SEED_ON_DEPLOY is not true, skipping seed."
fi

echo "Starting API..."
node src/index.js
