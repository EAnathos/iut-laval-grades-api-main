import api from '@web/lib/api';
import { User } from 'next-auth';
import { Box } from './box';
import SelectSearchCourses from './select-search-courses';

type CoursesStatsProps = {
  user: User;
  academicYear: string;
  courseId?: string;
};

export const CoursesStats = async ({ user, academicYear, courseId }: CoursesStatsProps) => {
  const courseStats = courseId
    ? await api.stats.course(user, courseId, academicYear)
    : null;

  const courses = await api.courses.getAll(user);
  if (!courses) return <div>Erreur lors du chargement des cours</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Statistiques par Cours
      </h2>

      <SelectSearchCourses
        courses={courses.map(course => ({
          label: course.name,
          value: course.code,
        }))}
      />

      {courseStats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Box
            title="Moyenne du Cours"
            content={
              Number(courseStats.averageGrade).toFixed(2).toString() +
              '/20'
            }
            subtitle="Moyenne des notes obtenues"
          />
          <Box
            title="Note Minimale"
            content={courseStats.minGrade.toString() + '/20'}
            subtitle="Note la plus basse"
          />
          <Box
            title="Note Maximale"
            content={courseStats.maxGrade.toString() + '/20'}
            subtitle="Note la plus haute"
          />
          <Box
            title="Taux de Réussite"
            content={
              Number(courseStats.successRate).toFixed(2).toString() + '%'
            }
            subtitle="Pourcentage de réussite"
          />
        </div>
      ) : null}
    </div>
  )
}
