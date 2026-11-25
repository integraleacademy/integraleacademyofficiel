import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { announcedCourseArt } from '../src/data/announced-course-art';
import { announcedCourseContent } from '../src/data/announced-course-content';
import { programmeIllustrations } from '../src/data/programme-illustrations';
import { upcomingCoursePages } from '../src/data/upcoming-trainings';

test('chaque fiche annoncée dispose de quatre missions illustrées et une scène distincte par unité de programme', () => {
  const hash = (src: string) => createHash('sha256').update(readFileSync(join('public', src.split('?')[0]))).digest('hex');
  const used = new Set(upcomingCoursePages.map(({ course }) => hash(course.imageSrc)));
  for (const { course } of upcomingCoursePages) {
    const gallery = announcedCourseArt[course.anchorId];
    assert.ok(gallery, course.anchorId);
    const detail = announcedCourseContent[course.anchorId];
    const unitArt = programmeIllustrations[course.anchorId as keyof typeof programmeIllustrations];
    assert.ok(detail.missions.length >= 4, course.anchorId);
    assert.equal(gallery.missions.length, detail.missions.length);
    assert.equal(new Set(detail.missions.map(([title]) => title)).size, detail.missions.length);
    assert.equal(unitArt.length, detail.units.length);
    const scenes = [gallery.hero, ...gallery.missions, ...gallery.practice, gallery.exam, ...unitArt];
    for (const scene of scenes) {
      assert.ok(scene.alt.trim(), scene.src);
      const fingerprint = hash(scene.src);
      assert.ok(!used.has(fingerprint), `Illustration réutilisée sur ${course.anchorId} : ${scene.src}`);
      used.add(fingerprint);
    }
  }
});
