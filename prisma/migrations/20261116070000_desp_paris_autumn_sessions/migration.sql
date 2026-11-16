BEGIN;

ALTER TABLE "TrainingSession"
  ADD COLUMN "inPersonFirstEndDate" TIMESTAMP(3),
  ADD COLUMN "inPersonResumeDate" TIMESTAMP(3),
  ADD CONSTRAINT "TrainingSession_inPerson_split_order" CHECK (
    ("inPersonFirstEndDate" IS NULL AND "inPersonResumeDate" IS NULL)
    OR ("inPersonStartDate" IS NOT NULL AND "inPersonEndDate" IS NOT NULL
      AND "inPersonFirstEndDate" IS NOT NULL AND "inPersonResumeDate" IS NOT NULL
      AND "inPersonStartDate" <= "inPersonFirstEndDate"
      AND "inPersonFirstEndDate" < "inPersonResumeDate"
      AND "inPersonResumeDate" <= "inPersonEndDate")
  );

INSERT INTO "Training" (id, slug, name, title, category, "pageUrl", "updatedAt")
VALUES ('seed-desp-dssp', 'desp-dssp', 'DESP / DSSP', 'Dirigeant d’entreprise de sécurité privée',
        'direction', '/formations-securite/desp', CURRENT_TIMESTAMP)
ON CONFLICT (slug) DO NOTHING;

WITH dates(id, title, remote_start, remote_end, onsite_start, first_end, resume, onsite_end, exam, status, sort_order, notes) AS (
  VALUES
    ('desp-paris-2027-09-20', 'DESP Paris — Septembre 2027',
     DATE '2027-09-20', DATE '2027-10-22', DATE '2027-11-08', DATE '2027-11-10',
     DATE '2027-11-12', DATE '2027-11-19', DATE '2027-11-22', 'OPEN', 7,
     '175 h à distance et 70 h à Paris sur 9 jours. Les cours reprennent le vendredi 12 novembre après le jour férié.'),
    ('desp-paris-2027-10-21', 'DESP Paris — Octobre 2027',
     DATE '2027-10-21', DATE '2027-11-26', DATE '2027-11-29', DATE '2027-12-02',
     DATE '2027-12-06', DATE '2027-12-10', DATE '2027-12-13', 'COMING_SOON', 8,
     '175 h à distance et 70 h à Paris sur 9 jours. Le vendredi 3 décembre est libre.')
)
INSERT INTO "TrainingSession" (
  id, "trainingId", title, "startDate", "endDate", "remoteStartDate", "remoteEndDate",
  "inPersonStartDate", "inPersonFirstEndDate", "inPersonResumeDate", "inPersonEndDate", "examDate",
  status, "sortOrder", location, "priceCents", "priceLabel", "durationLabel", "seatsTotal",
  "registrationUrl", "publicNotes", "updatedAt"
)
SELECT dates.id, training.id, dates.title, remote_start, onsite_end, remote_start, remote_end,
       onsite_start, first_end, resume, onsite_end, exam, dates.status::"TrainingSessionStatus", sort_order,
       'Paris · 34 rue Poissonnière, 75002 Paris', 435000, '4 350 € TTC', '245 heures', 12,
       '/despvaeouinitial', notes, CURRENT_TIMESTAMP
FROM dates JOIN "Training" AS training ON training.slug = 'desp-dssp'
WHERE NOT EXISTS (
  SELECT 1 FROM "TrainingSession" AS existing
  WHERE existing."trainingId" = training.id AND existing."startDate" = dates.remote_start
    AND existing.location ILIKE '%Paris%'
)
ON CONFLICT (id) DO NOTHING;

COMMIT;
