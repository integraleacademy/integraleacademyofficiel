import type { ManualIllustration } from './manualIllustrations';
import { degreeCourseArt } from './degree-course-art';
import { titleCourseArt } from './title-course-art';

export type AnnouncedCourseArt = {
  hero: ManualIllustration;
  missions: readonly [ManualIllustration, ManualIllustration];
  practice: readonly [ManualIllustration, ManualIllustration];
  exam: ManualIllustration;
};

export const announcedCourseArt: Readonly<Record<string, AnnouncedCourseArt>> = {
  ...degreeCourseArt,
  ...titleCourseArt,
};
