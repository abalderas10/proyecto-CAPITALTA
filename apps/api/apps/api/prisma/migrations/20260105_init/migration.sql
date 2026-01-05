-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('CLIENTE', 'ANALISTA', 'ADMIN');

-- CreateEnum
CREATE TYPE "EstadoSolicitud" AS ENUM ('DRAFT', 'ENVIADA', 'EN_REVISION', 'APROBADA', 'RECHAZADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "TipoOrganizacion" AS ENUM ('PERSONA_MORAL', 'PERSONA_FISICA');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "rol" "Rol" NOT NULL,
    "mfaEnabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "organizacionId" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organizacion" (
    "id" TEXT NOT NULL,
    "tipo" "TipoOrganizacion" NOT NULL,
    "nombre" TEXT NOT NULL,
    "rfc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Organizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solicitud" (
    "id" TEXT NOT NULL,
    "producto" TEXT NOT NULL,
    "montoCentavos" INTEGER NOT NULL,
    "plazoMeses" INTEGER NOT NULL,
    "estado" "EstadoSolicitud" NOT NULL DEFAULT 'DRAFT',
    "clienteId" TEXT NOT NULL,
    "organizacionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Solicitud_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Garantia" (
    "id" TEXT NOT NULL,
    "solicitudId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "avaluoCentavos" INTEGER NOT NULL,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Garantia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" TEXT NOT NULL,
    "solicitudId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "ruta" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evaluacion" (
    "id" TEXT NOT NULL,
    "solicitudId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "data" JSONB NOT NULL,
    "reglas" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Evaluacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "solicitudId" TEXT,
    "tipo" TEXT NOT NULL,
    "detalles" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Usuario_email_idx" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Usuario_deletedAt_idx" ON "Usuario"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Organizacion_rfc_key" ON "Organizacion"("rfc");

-- CreateIndex
CREATE INDEX "Organizacion_rfc_idx" ON "Organizacion"("rfc");

-- CreateIndex
CREATE INDEX "Organizacion_deletedAt_idx" ON "Organizacion"("deletedAt");

-- CreateIndex
CREATE INDEX "Solicitud_estado_idx" ON "Solicitud"("estado");

-- CreateIndex
CREATE INDEX "Solicitud_clienteId_idx" ON "Solicitud"("clienteId");

-- CreateIndex
CREATE INDEX "Solicitud_organizacionId_idx" ON "Solicitud"("organizacionId");

-- CreateIndex
CREATE INDEX "Solicitud_deletedAt_idx" ON "Solicitud"("deletedAt");

-- CreateIndex
CREATE INDEX "Garantia_solicitudId_idx" ON "Garantia"("solicitudId");

-- CreateIndex
CREATE INDEX "Garantia_deletedAt_idx" ON "Garantia"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Documento_hash_key" ON "Documento"("hash");

-- CreateIndex
CREATE INDEX "Documento_solicitudId_idx" ON "Documento"("solicitudId");

-- CreateIndex
CREATE INDEX "Documento_ownerId_idx" ON "Documento"("ownerId");

-- CreateIndex
CREATE INDEX "Documento_deletedAt_idx" ON "Documento"("deletedAt");

-- CreateIndex
CREATE INDEX "Evaluacion_solicitudId_idx" ON "Evaluacion"("solicitudId");

-- CreateIndex
CREATE INDEX "Evaluacion_deletedAt_idx" ON "Evaluacion"("deletedAt");

-- CreateIndex
CREATE INDEX "Evento_actorId_idx" ON "Evento"("actorId");

-- CreateIndex
CREATE INDEX "Evento_solicitudId_idx" ON "Evento"("solicitudId");

-- CreateIndex
CREATE INDEX "Evento_tipo_idx" ON "Evento"("tipo");

-- CreateIndex
CREATE INDEX "Evento_createdAt_idx" ON "Evento"("createdAt");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_organizacionId_fkey" FOREIGN KEY ("organizacionId") REFERENCES "Organizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Garantia" ADD CONSTRAINT "Garantia_solicitudId_fkey" FOREIGN KEY ("solicitudId") REFERENCES "Solicitud"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_solicitudId_fkey" FOREIGN KEY ("solicitudId") REFERENCES "Solicitud"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluacion" ADD CONSTRAINT "Evaluacion_solicitudId_fkey" FOREIGN KEY ("solicitudId") REFERENCES "Solicitud"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_solicitudId_fkey" FOREIGN KEY ("solicitudId") REFERENCES "Solicitud"("id") ON DELETE CASCADE ON UPDATE CASCADE;

