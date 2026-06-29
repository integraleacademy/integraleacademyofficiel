CREATE TYPE "TraineeDocumentStatus" AS ENUM ('pending', 'sent');


CREATE TABLE "Trainee" (
    "id" TEXT NOT NULL,
    "civility" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "trainingId" TEXT,
    "sessionId" TEXT,
    "convocationApsStatus" "TraineeDocumentStatus" NOT NULL DEFAULT 'pending',
    "convocationApsSentAt" TIMESTAMP(3),
    "convocationApsPdfPath" TEXT,
    "convocationApsLastError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Trainee_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Trainee" ADD CONSTRAINT "Trainee_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Trainee" ADD CONSTRAINT "Trainee_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "TrainingSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;
