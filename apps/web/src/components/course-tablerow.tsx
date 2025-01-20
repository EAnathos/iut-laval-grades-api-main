'use client';

import { useState } from 'react';
import { TableRow, TableCell } from '@web/components/ui/table';
import { Course } from '@web/types';
import { toast } from 'sonner';
import { Button } from '@web/components/ui/button';
import { Check, Pencil, Trash2 } from 'lucide-react';
import { deleteCourseAction, updateCourseAction } from '@web/actions/courses/courses.actions';

interface CourseProps {
  course: Course;
}

export function CourseTableRow({ course }: CourseProps) {
  const [editingCourse, setEditingCourse] = useState<number | null>(null);
  const [courseCode, setCourseCode] = useState<string>(course.code);
  const [courseName, setCourseName] = useState<string>(course.name);
  const [courseCredits, setCourseCredits] = useState<number>(course.credits);

  const handleEditClick = (course: Course) => {
    setEditingCourse(course.id);
  }

  const handleCourseNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCourseName(event.target.value);
  }

  const handleCourseCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCourseCode(event.target.value);
  }

  const handleCourseCreditsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCourseCredits(Number(event.target.value));
  }

  const handleSaveClick = async () => {
    try {
      const ajout = await updateCourseAction({ ...course, code: courseCode, name: courseName, credits: courseCredits });

      if (ajout && ajout.status === 500) {
        toast.error(typeof ajout.message === 'string' ? ajout.message : "An error occurred");
      } else if (ajout && ajout.status === 200) {
        toast.success('Cours modifié avec succès.');
        setEditingCourse(null);
      }

    } catch (error) {
      console.error('Error creating course', error);
      toast.error(
        "Une erreur s'est produite lors de la soumission du formulaire.",
      );
    }
  }

  const handleDeleteClick = async () => {
    try {
      const deleted = await deleteCourseAction(course.id);
      if (deleted) {
        toast.success('Cours supprimé avec succès.');
      }
    } catch (error) {
      console.error('Error deleting course', error);
      toast.error('Une erreur s\'est produite lors de la suppression du cours.');
    }
  }

  return (
    <TableRow key={course.id}>
      <TableCell>
        {editingCourse === course.id ? (
          <input
            type="text"
            value={courseCode}
            onChange={handleCourseCodeChange}
            className="w-20"
          />
        ) : (
          <p>{course.code}</p>
        )}
      </TableCell>
      <TableCell>
        {editingCourse === course.id ? (
          <input
            type="text"
            value={courseName}
            onChange={handleCourseNameChange}
          />
        ) : (
          <p>{course.name}</p>
        )}
      </TableCell>
      <TableCell>
        {editingCourse === course.id ? (
          <input
            type="number"
            value={courseCredits}
            onChange={handleCourseCreditsChange}
          />
        ) : (
          <p>{course.credits}</p>
        )}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          {editingCourse === course.id ? (
            <Button variant='ghost' size='icon' onClick={handleSaveClick}>
              <Check className="h-4 w-4 text-green-600" />
            </Button>
            ) : (
              <Button variant='ghost' size='icon' onClick={() => handleEditClick(course)}>
                <Pencil className="h-4 w-4 text-blue-600" />
              </Button>
            )}
          <Button variant='ghost' size='icon' onClick={handleDeleteClick}>
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
)

}
