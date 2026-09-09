-- All sessions are limited to 12 participants. Lower configured capacities remain valid.
UPDATE "TrainingSession"
SET "seatsTotal" = 12
WHERE "seatsTotal" IS NULL OR "seatsTotal" > 12 OR "seatsTotal" < 1;

-- Legacy out-of-range availability is unknown; use the existing public fallback rule.
UPDATE "TrainingSession"
SET "seatsLeft" = NULL
WHERE "seatsLeft" < 0 OR "seatsLeft" > "seatsTotal";

ALTER TABLE "TrainingSession"
ADD CONSTRAINT "TrainingSession_seat_capacity_check"
CHECK (
  ("seatsTotal" IS NULL OR "seatsTotal" BETWEEN 1 AND 12)
  AND ("seatsLeft" IS NULL OR "seatsLeft" BETWEEN 0 AND 12)
  AND ("seatsTotal" IS NULL OR "seatsLeft" IS NULL OR "seatsLeft" <= "seatsTotal")
);
