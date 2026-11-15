-- The 2027 calendar previously stored the SSIAP-only fee on both formulas.
UPDATE "TrainingSession" AS session
SET "priceCents" = 123000, "priceLabel" = '1 230 € TTC', "updatedAt" = CURRENT_TIMESTAMP
FROM "Training" AS training
WHERE session."trainingId" = training."id"
  AND training.slug = 'ssiap-1'
  AND session."startDate" >= DATE '2027-01-01'
  AND session."startDate" < DATE '2028-01-01'
  AND session.title ~* '(\mavec[[:space:]]+|[+][[:space:]]*)SST\M'
  AND COALESCE(session."priceCents", 98000) = 98000
  AND regexp_replace(COALESCE(session."priceLabel", ''), '[[:space:]€  ]', '', 'g') ~* '^(980([,.]00)?(TTC)?)?$';
