import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { announcedCourseArt } from '../src/data/announced-course-art';
import { upcomingCoursePages } from '../src/data/upcoming-trainings';

test('chaque fiche annoncée dispose de six scènes originales et distinctes du catalogue', () => {
  const hash = (src: string) => createHash('sha256').update(readFileSync(join('public', src.split('?')[0]))).digest('hex');
  const used = new Set(upcomingCoursePages.map(({ course }) => hash(course.imageSrc)));
  for (const { course } of upcomingCoursePages) {
    const gallery = announcedCourseArt[course.anchorId];
    assert.ok(gallery, course.anchorId);
    const scenes = [gallery.hero, ...gallery.missions, ...gallery.practice, gallery.exam];
    assert.equal(scenes.length, 6);
    for (const scene of scenes) {
      assert.ok(scene.alt.trim(), scene.src);
      const fingerprint = hash(scene.src);
      assert.ok(!used.has(fingerprint), `Illustration réutilisée sur ${course.anchorId} : ${scene.src}`);
      used.add(fingerprint);
    }
  }
});
