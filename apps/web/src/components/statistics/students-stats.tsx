import api from '@web/lib/api';
import { User } from 'next-auth';
import React from 'react'
import { Box } from './box';
import SelectSearchStudent from './select-search-students';

type StudentsStatsProps = {
  user: User;
  academicYear: string;
  studentId?: string;
};

export const StudentsStats = async ({ user, academicYear, studentId }: StudentsStatsProps) => {
  const studentStats = studentId
    ? await api.stats.student(user, studentId, academicYear)
    : null;

  const students = await api.students.getAll(user);
  if (!students) return <div>Erreur lors du chargement des cours</div>;
  
  const nCourses = studentStats?.reduce((acc, stat) => acc + Number(stat.coursesCount), 0) || 0;
  const nCredits = studentStats?.reduce((acc, stat) => acc + Number(stat.validatedCredits), 0) || 0;

  return (
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
  )
}
