-- CreateEnum
CREATE TYPE "TrainingSessionStatus" AS ENUM ('OPEN', 'FULL', 'COMING_SOON', 'HIDDEN');

-- CreateTable
CREATE TABLE "Training" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "pageUrl" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingSession" (
    "id" TEXT NOT NULL,
    "trainingId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "examDate" TIMESTAMP(3),
    "priceCents" INTEGER,
    "priceLabel" TEXT,
    "location" TEXT,
    "status" "TrainingSessionStatus" NOT NULL DEFAULT 'OPEN',
    "seatsTotal" INTEGER,
    "seatsLeft" INTEGER,
    "registrationUrl" TEXT,
    "fundingNotes" TEXT,
    "publicNotes" TEXT,
    "internalNotes" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isHighlighted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainingSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatLead" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "trainingInterest" TEXT,
    "message" TEXT,
    "source" TEXT DEFAULT 'chat',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatLead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatConversationLog" (
    "id" TEXT NOT NULL,
    "userMessage" TEXT NOT NULL,
    "assistantAnswer" TEXT NOT NULL,
    "selectedKnowledgeFiles" TEXT,
    "selectedSessions" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatConversationLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Training_slug_key" ON "Training"("slug");

-- AddForeignKey
ALTER TABLE "TrainingSession" ADD CONSTRAINT "TrainingSession_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;
