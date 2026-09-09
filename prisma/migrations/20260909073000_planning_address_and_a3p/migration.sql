-- Correct the stored public address without changing the sessions themselves.
UPDATE "TrainingSession"
SET "location" = regexp_replace(
  "location",
  '142[[:space:]]+rue[[:space:]]+de[[:space:]]+Rivoli,?[[:space:]]*75001[[:space:]]+Paris',
  '14 Villa Lourcine 75014 Paris',
  'gi'
)
WHERE "location" ~* '142[[:space:]]+rue[[:space:]]+de[[:space:]]+Rivoli,?[[:space:]]*75001[[:space:]]+Paris';

UPDATE "Training"
SET "name" = regexp_replace("name", 'A3P[[:space:]]*/[[:space:]]*APR', 'A3P', 'gi'),
    "title" = regexp_replace("title", 'A3P[[:space:]]*/[[:space:]]*APR', 'A3P', 'gi')
WHERE "name" ~* 'A3P[[:space:]]*/[[:space:]]*APR'
   OR "title" ~* 'A3P[[:space:]]*/[[:space:]]*APR';

UPDATE "TrainingSession"
SET "title" = regexp_replace("title", 'A3P[[:space:]]*/[[:space:]]*APR', 'A3P', 'gi')
WHERE "title" ~* 'A3P[[:space:]]*/[[:space:]]*APR';
