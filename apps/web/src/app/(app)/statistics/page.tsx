import { CoursesStats, CoursesStatsSkeleton } from '@web/components/statistics/courses-stats';
import { GlobalStats, GlobalStatsSkeleton } from '@web/components/statistics/global-stats';
import { StudentsStats, StudentsStatsSkeleton } from '@web/components/statistics/students-stats';
import { getUser } from '@web/lib/auth';
import { getAcademicYear } from '@web/utils/get-academic-year';
import { Suspense } from 'react';

type Args = {
  searchParams: {
    courseId?: string;
    studentId?: string;
  };
};

export default async function StatisticsPage({ searchParams }: Args) {
  const user = await getUser();
  if (!user) return null;
  const academicYear = getAcademicYear();

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="space-y-8 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Statistiques</h1>
        <div className="grid grid-cols-1 gap-8">
          <Suspense fallback={<GlobalStatsSkeleton />}>
            <GlobalStats user={user} academicYear={academicYear} />
          </Suspense>
        </div>
      </div>
      <div className="space-y-8 mb-6">
        <div className="grid grid-cols-1 gap-8">
          <Suspense fallback={<CoursesStatsSkeleton  courseId={searchParams.courseId} />}>
            <CoursesStats user={user} academicYear={academicYear} courseId={searchParams.courseId} />
          </Suspense>
        </div>
      </div>
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-8">
          <Suspense fallback={<StudentsStatsSkeleton studentId={searchParams.studentId} />}>
            <StudentsStats user={user} academicYear={academicYear} studentId={searchParams.studentId} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
