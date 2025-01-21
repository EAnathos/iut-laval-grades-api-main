'use client';
import { ArrowLeft, Check, Download, Pencil, Trash2 } from 'lucide-react';
import { TableRow, TableCell } from '@web/components/ui/table';
import { Button } from '@web/components/ui/button';
import Link from 'next/link';
import { Grade } from '@web/types';
import { Input } from '@web/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import { deleteGradeAction, updateGradeAction } from '@web/actions/grades/grades.actions';

interface GradeProps {
  grade: Grade;
}

export function GradeTableRow({ grade }: GradeProps) {
  const [editingGrade, setEditingGrade] = useState<number | null>(null);
  const [gradeValue, setGradeValue] = useState<number>(grade.grade);

  const handleEditClick = (grade: Grade) => {
    setEditingGrade(grade.id);
  };

  const handleGradeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGradeValue(Number(event.target.value));
  };

   const handleSaveClick = async() => {
    setGradeValue(gradeValue);
    try {
        const ajout = await updateGradeAction({ ...grade, grade: gradeValue });
  
        if (ajout && ajout.status === 500) {
          toast.error(typeof ajout.message === 'string' ? ajout.message : "An error occurred");
        } else if (ajout && ajout.status === 200) {
          toast.success('Note modifiée avec succès.');
          setEditingGrade(null);
        }
  
      } catch (error) {
  
        console.error('Error creating student', error);
        toast.error(
          "Une erreur s'est produite lors de la soumission du formulaire.",
        );
        
      }
    
  };

  const handleDeleteClick = async () => {
    try {
      const deleted = await deleteGradeAction(grade.id);
      if (deleted) {
        toast.success('Note supprimée avec succès.');
      }
    } catch (error) {
      console.error('Error deleting grade', error);
      toast.error('Une erreur s\'est produite lors de la suppression de la note.');
    }
  }

  return (
    <TableRow key={grade.id}>
      <TableCell>
        <div>
          <p>{grade.courseCode}</p>
          <p className="text-sm text-gray-600">{grade.courseName}</p>
        </div>
      </TableCell>
      <TableCell>
        {editingGrade === grade.id ? (
          <Input
            type="number"
            step="0.01"
            placeholder="Note"
            max={20}
            min={0}
            value={gradeValue}
            onChange={handleGradeChange}
            className="w-20"
          />
        ) : (
          <p>{gradeValue}</p>
        )}
      </TableCell>
      <TableCell>{grade.semester}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          {editingGrade === grade.id ? (
            <Button variant="ghost" size="icon" onClick={handleSaveClick}>
              <Check className="h-4 w-4 text-green-600" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleEditClick(grade)}
            >
              <Pencil className="h-4 w-4 text-blue-600" />
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={handleDeleteClick}>
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
