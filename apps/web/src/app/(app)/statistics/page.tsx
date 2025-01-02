import api from '@web/lib/api';
import { getUser } from '@web/lib/auth';
import { Box } from '@web/components/statistics/box';
import getAcademicYear from '@web/utils/get-academic-year';
import SelectSearchCourses from '@web/components/statistics/select-search-courses';
import SelectSearchStudent from '@web/components/statistics/select-search-students';

type Args = {
  searchParams: {
    courseId?: string;
    studentId?: string;
  };
};

export default async function Statistics({ searchParams }: Args) {
  const user = await getUser();
  if (!user) return null;

  const academicYear: string = getAcademicYear();

  const globalStats = await api.stats.get(user, academicYear);
  if (!globalStats)
    return <div>Erreur lors du chargement des statistiques globales</div>;

  let courseStats;

  if (searchParams.courseId)
    courseStats = await api.stats.course(
      user,
      searchParams.courseId,
      academicYear,
    );

  let studentStats;

  if (searchParams.studentId) {
    console.log(searchParams.studentId);
    studentStats = await api.stats.student(
      user,
      searchParams.studentId,
      academicYear,
    );
  }

  let nCourses = 0;
  let nCredits = 0;

  if (searchParams.studentId && studentStats) {
    studentStats.forEach(studentStat => {
      nCourses += Number(studentStat.coursesCount);
      nCredits += Number(studentStat.validatedCredits);
    });
  }

  const courses = await api.courses.getAll(user);
  if (!courses) return <div>Erreur lors du chargement des cours</div>;

  const students = await api.students.getAll(user);
  if (!students) return <div>Erreur lors du chargement des cours</div>;

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="space-y-8 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Statistiques</h1>
        <div className="grid grid-cols-1 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Statistiques Globales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Box
                title="Moyenne Générale"
                content={
                  Number(globalStats.globalAverage).toFixed(2).toString() +
                  '/20'
                }
                subtitle="Moyenne de toutes les notes"
              />
              <Box
                title="Nombre d'Étudiants"
                content={globalStats.totalStudents.toString()}
                subtitle="Total des étudiants inscrits"
              />
              <Box
                title="Nombre de Cours"
                content={globalStats.totalCourses.toString()}
                subtitle="Total des cours disponibles"
              />
              <Box
                title="Taux de Réussite"
                content={
                  Number(globalStats.averageSuccessRate).toFixed(2).toString() +
                  '%'
                }
                subtitle="Taux de réussite moyen"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-8 mb-6">
        <div className="grid grid-cols-1 gap-8">
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
        </div>
      </div>
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Statistiques par Étudiants
            </h2>
            <SelectSearchStudent
              students={students.map(student => ({
                name: student.firstName,
                surname: student.lastName,
                id: student.id.toString(),
              }))}
            />

            {studentStats ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                  <Box
                    title="Crédits Validés"
                    content={nCredits.toString()}
                    subtitle="Total des crédits obtenus"
                  />
                  <Box
                    title="Nombre de Cours"
                    content={nCourses.toString()}
                    subtitle="Cours suivis"
                  />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-6">
                  Moyennes par Semestres
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                  {studentStats.map(student => (
                    <Box
                      key={student.semester}
                      title={`Semestre ${student.semester}`}
                      content={
                        Number(student.averageGrade).toFixed(2).toString() +
                        '/20'
                      }
                      subtitle={
                        Number(student.validatedCredits).toString() +
                        '/' +
                        Number(student.totalCredits) +
                        ' crédits'
                      }
                    />
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
