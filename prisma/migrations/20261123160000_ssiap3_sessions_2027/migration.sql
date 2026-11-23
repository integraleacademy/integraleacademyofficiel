BEGIN;

INSERT INTO "Training" (id, slug, name, title, category, "pageUrl", "updatedAt")
SELECT slug, slug, name, title, 'sécurité incendie', '/formations-securite/' || slug, CURRENT_TIMESTAMP
FROM (VALUES
  ('ssiap-2', 'SSIAP 2', 'Chef d’équipe de sécurité incendie'),
  ('ssiap-3', 'SSIAP 3', 'Chef de service de sécurité incendie')
) AS courses(slug, name, title)
ON CONFLICT (slug) DO NOTHING;

WITH calendar(month_name, starts, ends, exam) AS (VALUES
  ('avril', DATE '2027-04-19', DATE '2027-06-02', DATE '2027-06-03'),
  ('octobre', DATE '2027-10-18', DATE '2027-12-01', DATE '2027-12-02')
), course AS (SELECT id FROM "Training" WHERE slug = 'ssiap-3'),
existing AS (
  UPDATE "TrainingSession" s SET "endDate" = c.ends, "examDate" = c.exam,
    "inPersonStartDate" = c.starts, "inPersonEndDate" = c.ends,
    "priceCents" = 390000, "priceLabel" = '3 900 € TTC', "updatedAt" = CURRENT_TIMESTAMP
  FROM calendar c, course
  WHERE s."trainingId" = course.id AND s."startDate"::date = c.starts
    AND (s.location IS NULL OR s.location ILIKE '%Puget%' OR s.location ILIKE '%Azur%')
  RETURNING s."startDate"::date AS starts
)
INSERT INTO "TrainingSession" (id, "trainingId", title, "startDate", "endDate", "examDate",
  "inPersonStartDate", "inPersonEndDate", "priceCents", "priceLabel", "durationLabel", location,
  status, "seatsTotal", "showSeatsLeft", "registrationUrl", "updatedAt")
SELECT 'ssiap-3-' || to_char(c.starts, 'YYYY-MM-DD'), course.id, 'SSIAP 3 — ' || c.month_name || ' 2027',
  c.starts, c.ends, c.exam, c.starts, c.ends, 390000, '3 900 € TTC', '216 heures hors examen',
  'Puget-sur-Argens', 'OPEN', 10, false, '/formations-securite/ssiap-3#dates-tarifs', CURRENT_TIMESTAMP
FROM calendar c CROSS JOIN course
WHERE NOT EXISTS (SELECT 1 FROM existing e WHERE e.starts = c.starts)
ON CONFLICT (id) DO NOTHING;

COMMIT;
