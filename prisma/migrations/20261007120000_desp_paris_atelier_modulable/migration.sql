-- Keep the stored DESP Paris sessions aligned with the new training venue.
UPDATE "TrainingSession" AS session
SET "location" = 'Paris · Atelier Modulable, 53 rue des Vinaigriers, 75010 PARIS',
    "updatedAt" = CURRENT_TIMESTAMP
FROM "Training" AS training
WHERE training.id = session."trainingId"
  AND (training.slug = 'desp' OR training.slug LIKE 'desp-%')
  AND session."location" ~* '(paris|lourcine|vinaigriers)'
  AND session."location" IS DISTINCT FROM 'Paris · Atelier Modulable, 53 rue des Vinaigriers, 75010 PARIS';
