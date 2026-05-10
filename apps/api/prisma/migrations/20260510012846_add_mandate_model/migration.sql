-- CreateEnum
CREATE TYPE "MandateStatus" AS ENUM ('DRAFT', 'PENDING_SIGNATURE', 'SIGNED', 'EXPIRED', 'CANCELLED');

-- CreateTable
CREATE TABLE "mandates" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "status" "MandateStatus" NOT NULL DEFAULT 'DRAFT',
    "pdfPath" TEXT,
    "signatureId" TEXT,
    "signedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mandates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mandates_signatureId_key" ON "mandates"("signatureId");

-- AddForeignKey
ALTER TABLE "mandates" ADD CONSTRAINT "mandates_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
