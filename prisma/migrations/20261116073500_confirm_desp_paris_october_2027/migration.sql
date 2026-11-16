UPDATE "TrainingSession"
SET "status" = 'OPEN', "updatedAt" = CURRENT_TIMESTAMP
WHERE "id" = 'desp-paris-2027-10-21'
  AND "status" = 'COMING_SOON';
