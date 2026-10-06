-- Apply the approved TTC prices only to sessions starting in 2027.
-- Sessions that start in 2026, including those ending in 2027, keep their price.
UPDATE "TrainingSession" AS session
SET "priceCents" = prices.cents,
    "priceLabel" = prices.label,
    "updatedAt" = CURRENT_TIMESTAMP
FROM "Training" AS training,
     (VALUES
       ('aps', 170000, '1 700 € TTC'),
       ('a3p-apr', 425000, '4 250 € TTC'),
       ('a3p', 425000, '4 250 € TTC'),
       ('apr', 425000, '4 250 € TTC'),
       ('desp-dssp', 435000, '4 350 € TTC'),
       ('desp-initial', 435000, '4 350 € TTC'),
       ('desp', 435000, '4 350 € TTC'),
       ('desp-vae', 385000, '3 850 € TTC')
     ) AS prices(slug, cents, label)
WHERE session."trainingId" = training."id"
  AND training."slug" = prices.slug
  AND session."startDate" >= TIMESTAMP '2027-01-01 00:00:00'
  AND session."startDate" < TIMESTAMP '2028-01-01 00:00:00';
