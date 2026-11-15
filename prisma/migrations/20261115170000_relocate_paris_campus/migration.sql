-- Update only sessions still taking place at the former campus after the move.
UPDATE "TrainingSession"
SET "location" = 'Paris · 34 rue Poissonnière, 75002 Paris', "updatedAt" = CURRENT_TIMESTAMP
WHERE COALESCE("examDate", "endDate", "startDate") >= DATE '2026-11-15'
  AND "location" ~* '(vinaigriers|rue de rivoli|villa (de )?lourcine|atelier modulable|^paris$)';
