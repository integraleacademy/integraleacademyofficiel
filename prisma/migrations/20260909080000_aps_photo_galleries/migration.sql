CREATE TABLE "ApsGalleryPhoto" (
  "id" TEXT NOT NULL,
  "gallery" TEXT NOT NULL,
  "slot" INTEGER NOT NULL,
  "caption" TEXT NOT NULL,
  "image" BYTEA NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ApsGalleryPhoto_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "ApsGalleryPhoto_gallery_check" CHECK ("gallery" IN ('pc-securite', 'ecole')),
  CONSTRAINT "ApsGalleryPhoto_slot_check" CHECK ("slot" BETWEEN 1 AND 3),
  CONSTRAINT "ApsGalleryPhoto_image_size_check" CHECK (octet_length("image") BETWEEN 1 AND 2097152)
);

CREATE UNIQUE INDEX "ApsGalleryPhoto_gallery_slot_key" ON "ApsGalleryPhoto"("gallery", "slot");
