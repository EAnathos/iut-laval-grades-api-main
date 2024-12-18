"use client";
import React, { useEffect } from 'react';
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
  const [student, setStudent] = React.useState<Student[]>([]);

  const fetchStudent = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/students/${params.id}`,
      );
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des cours');
      }
      const data: Student[] = await response.json();
      setStudent(data);
    } catch (error) {
      console.error('Erreur:', error);
      //setError('Impossible de charger les cours')
    } finally {
      //setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  return (
    <div className="min-h-svh bg-muted ">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <StudentDetails student={student} />
        <GradesTable studentId={student.studentId} />
      </div>
    </div>
  );
}
