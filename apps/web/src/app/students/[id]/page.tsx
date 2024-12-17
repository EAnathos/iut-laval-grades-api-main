import { GradesTable } from '../grade-table';
import { StudentDetails } from '../student-details';

type HomeProps = {
  params: {
    id?: string;
  };
};

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  studentId: string;
}

export default function Home({ params }: HomeProps) {
  
  const student: Student = {
    id: 1,
    firstName: 'Alex',
    lastName: 'lemoine',
    email: 'AlexLemoine@example.com',
    dateOfBirth: '2004-11-26',
    studentId: 'i2201206',
  };

  return (
    <div className="min-h-svh bg-muted ">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <StudentDetails student={student} />
        {params.id}
        <GradesTable />
      </div>
    </div>
  );
}
