-- CreateEnum
CREATE TYPE "PublicationStatus" AS ENUM (
  'DISPONIBLE',
  'VENDIDO',
  'NO_DISPONIBLE',
  'ALQUILADO',
  'RESERVADO',
  'BORRADOR'
);

-- AddColumn
ALTER TABLE "Property"
ADD COLUMN "publicationStatus" "PublicationStatus" NOT NULL DEFAULT 'DISPONIBLE';

-- Preserve the visibility of pre-existing records: hidden records become drafts.
UPDATE "Property"
SET "publicationStatus" = 'BORRADOR'
WHERE "published" = false;
