'use client';
import { AddRate } from '@web/components/forms/add-rate';
import { Button } from '@web/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@web/components/ui/dialog';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from '@web/components/ui/table';
import { Course, Grade, Student } from '@web/types';
import { GradeTableRow } from '../../../../components/grade-tablerow';

interface GradesTableProps {
    student: Student;
    grades: Grade[];
    courses: Course[];
}

export function GradesTable({ student, courses, grades }: GradesTableProps) {

    return (
        <div className="rounded-lg border bg-white">
            <div className="flex justify-between items-center p-4 border-b mb-4">
                <h2 className="text-lg font-semibold">Notes</h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button> Ajouter une note</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle> Ajouter une note</DialogTitle>
                            <DialogDescription>
                                <AddRate idStudent={student.id} courses={courses} />
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>COURS</TableHead>
                        <TableHead>NOTE</TableHead>
                        <TableHead>SEMESTRE</TableHead>
                        <TableHead className="text-right">ACTIONS</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {grades.map((grade: Grade) => (
                        <GradeTableRow key={grade.id} grade={grade} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
