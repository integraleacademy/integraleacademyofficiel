import { notFound } from 'next/navigation';
import { AnnouncedCoursePage } from '@/components/AnnouncedCoursePage';
import { upcomingCoursePages } from '@/data/upcoming-trainings';
import { createPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

type Route = { params: Promise<{ family: string; slug: string }> };

async function resolveCourse({ params }: Route) {
  const { family, slug } = await params;
  const entry = upcomingCoursePages.find(item => item.path === `/${family}/${slug}`);
  if (!entry) notFound();
  return entry;
}

export async function generateMetadata(route: Route) {
  const entry = await resolveCourse(route);
  const metadata = createPageMetadata(entry.path);
  const image = { url: entry.course.imageSrc, alt: entry.course.imageAlt };
  return { ...metadata, openGraph: { ...metadata.openGraph, images: [image] }, twitter: { ...metadata.twitter, images: [image] } };
}

export default async function Page(route: Route) {
  const { family, course } = await resolveCourse(route);
  return <AnnouncedCoursePage family={family} course={course} />;
}
