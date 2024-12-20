'use client';

import { Pencil, Trash2 } from "lucide-react";

interface Course {
  id: number;
  code: string;
  name: string;
  credits: number;
}

interface CourseTableProps {
  courses: Course[];
}

export function CourseTable({ courses }: CourseTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
        <tr className="border-b">
          <th className="text-left py-3 px-4 font-medium text-gray-500">CODE</th>
          <th className="text-left py-3 px-4 font-medium text-gray-500">NOM</th>
          <th className="text-left py-3 px-4 font-medium text-gray-500">CREDITS</th>
          <th className="text-left py-3 px-4 font-medium text-gray-500">ACTIONS</th>
        </tr>
        </thead>
        <tbody>
        {courses.map((course) => (
          <tr key={course.id} className="border-b">
            <td className="py-3 px-4 text-gray-700">{course.code}</td>
            <td className="py-3 px-4 text-gray-700">{course.name}</td>
            <td className="py-3 px-4 text-gray-700">{course.credits}</td>
            <td className="py-3 px-4 text-gray-700">
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
