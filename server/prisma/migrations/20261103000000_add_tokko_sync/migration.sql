CREATE TYPE "PropertySource" AS ENUM ('MANUAL', 'TOKKO');

ALTER TABLE "Property"
ADD COLUMN "expenses" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN "source" "PropertySource" NOT NULL DEFAULT 'MANUAL',
ADD COLUMN "tokkoId" INTEGER,
ADD COLUMN "tokkoLastSyncedAt" TIMESTAMP(3);

CREATE UNIQUE INDEX "Property_tokkoId_key" ON "Property"("tokkoId");
