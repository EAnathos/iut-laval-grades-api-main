import { getUser } from '@web/lib/auth';
import React from 'react';
import { CoursesList } from '@web/app/(app)/courses/courses-list';

export default async function Courses() {
  const user = await getUser();
  if (!user) return null;

  return (
    <div className='min-h-svh bg-muted '>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <CoursesList />
      </div>
    </div>
  );
}
