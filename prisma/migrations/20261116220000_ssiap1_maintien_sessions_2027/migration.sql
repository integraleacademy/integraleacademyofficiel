BEGIN;

INSERT INTO "Training" (id, slug, name, title, category, "pageUrl", "updatedAt")
SELECT slug, slug, label, label, 'sécurité incendie',
       '/formations-securite/recyclage-remise-a-niveau-ssiap', CURRENT_TIMESTAMP
FROM (VALUES
  ('recyclage-ssiap-1', 'Recyclage SSIAP 1'),
  ('remise-a-niveau-ssiap-1', 'Remise à niveau SSIAP 1')
) AS courses(slug, label)
ON CONFLICT (slug) DO NOTHING;

-- Annexe 1 du courrier IA/SSIAP/2027-02, centre de Puget-sur-Argens.
WITH dates(slug, month_label, start_date, end_date) AS (
  VALUES
    ('recyclage-ssiap-1',      'Février',   DATE '2027-02-25', DATE '2027-02-26'),
    ('remise-a-niveau-ssiap-1', 'Février',   DATE '2027-02-24', DATE '2027-02-26'),
    ('recyclage-ssiap-1',      'Juin',      DATE '2027-06-03', DATE '2027-06-04'),
    ('remise-a-niveau-ssiap-1', 'Juin',      DATE '2027-06-02', DATE '2027-06-04'),
    ('recyclage-ssiap-1',      'Septembre', DATE '2027-09-23', DATE '2027-09-24'),
    ('remise-a-niveau-ssiap-1', 'Septembre', DATE '2027-09-22', DATE '2027-09-24'),
    ('recyclage-ssiap-1',      'Novembre',  DATE '2027-11-18', DATE '2027-11-19'),
    ('remise-a-niveau-ssiap-1', 'Novembre',  DATE '2027-11-17', DATE '2027-11-19')
)
INSERT INTO "TrainingSession" (
  id, "trainingId", title, "startDate", "endDate", "inPersonStartDate", "inPersonEndDate",
  "durationLabel", location, "publicNotes", status, "showSeatsLeft", "updatedAt"
)
SELECT dates.slug || '-' || to_char(start_date, 'YYYY-MM-DD'), training.id,
       training.name || ' — ' || month_label || ' 2027', start_date, end_date, start_date, end_date,
       CASE dates.slug WHEN 'recyclage-ssiap-1' THEN '14 heures' ELSE '21 heures' END,
       '54 chemin du Carreou, ZI du Carreou, 83480 Puget-sur-Argens',
       'Cours de 9 h à 12 h et de 13 h à 17 h.', 'OPEN', false, CURRENT_TIMESTAMP
FROM dates JOIN "Training" AS training ON training.slug = dates.slug
WHERE NOT EXISTS (
  SELECT 1 FROM "TrainingSession" AS existing
  WHERE existing."trainingId" = training.id AND existing."startDate" = start_date
    AND existing.location ILIKE '%Puget%'
)
ON CONFLICT (id) DO NOTHING;

COMMIT;
