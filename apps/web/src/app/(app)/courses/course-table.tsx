import React from 'react';
import { Course } from '@web/types';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@web/components/ui/table';
import { CourseTableRow } from '@web/components/course-tablerow';

interface CoursesTableProps {
  courses: Course[];
}

export function CourseTable({ courses }: CoursesTableProps) {

  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>CODE</TableHead>
            <TableHead>NOM</TableHead>
            <TableHead>CRÉDITS</TableHead>
            <TableHead className="text-right">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course: Course) => (
            <CourseTableRow key={course.id} course={course} />

            ))}
        </TableBody>
      </Table>
    </div>

  );
}
