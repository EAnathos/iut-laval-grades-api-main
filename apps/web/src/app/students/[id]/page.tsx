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

  const student: Student = {
    id: 1,
    firstName: 'Alex',
    lastName: 'lemoine',
    email: 'AlexLemoine@example.com',
    dateOfBirth: '2004-11-26',
    studentId: 'i2201206',
  };
export default async function Student({ params }: StudentProps) {
  const user = await getUser();
  if (!user) return null;
  const res = await fetch('http://localhost:4000/api/students/${params.id}');
  const student = await res.json();
  if (!student) return notFound();

  return (
    <div className="min-h-svh bg-muted ">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <StudentDetails student={student} />
        <GradesTable studentId={student.studentId} />
      </div>
    </div>
  );
}
