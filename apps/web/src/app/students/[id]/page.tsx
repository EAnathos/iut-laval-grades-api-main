import { GradesTable } from '../grade-table';
import { StudentDetails } from '../student-details';
import { getUser } from '@web/lib/auth';
import { notFound } from 'next/navigation';
import api from '@web/lib/api';

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

  return (
    <div className="min-h-svh bg-muted ">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <pre>{JSON.stringify(student, null, 2)}</pre>
        <StudentDetails student={student} />
        <GradesTable studentId={student.id} />
      </div>
    </div>
  );
}
