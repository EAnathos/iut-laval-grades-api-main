import { GradesTable } from './grade-table';
import { StudentDetails } from './student-details';
import { getUser } from '@web/lib/auth';
import { notFound } from 'next/navigation';
import api from '@web/lib/api';
import { Grade } from '@web/types';

type StudentProps = {
  params: {
    id?: string;
  };
};

export default async function Student({ params }: StudentProps) {
  const user = await getUser();
  if (!user) return null;
  const studentId = params.id ?? '';
  const student = await api.students.get(user, studentId);
  if (!student) return notFound();
  const gradesResponse = await api.grades.get(user, student.id);
  const grades: Grade[] = Array.isArray(gradesResponse) ? gradesResponse : [];
  const courses = (await api.courses.getAll(user)) ?? [];


  return (
    <div className="min-h-svh bg-muted ">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <StudentDetails student={student} />
        <GradesTable student={student} grades={grades} courses={courses} />
      </div>
    </div>
  );
}
