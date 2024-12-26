import { Pencil, Trash2 } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@web/components/ui/table"
import { Button } from "@web/components/ui/button"
import React from 'react';
import api from '@web/lib/api';
import { getUser } from '@web/lib/auth';
import { Grade } from '@web/types';

interface GradesTableProps {
    studentId: number;
}

export async function GradesTable({ studentId }: GradesTableProps) {
    const user = await getUser();
    if (!user) return null;
    const gradesResponse = await api.grades.get(user, studentId);
    const grades: Grade[] = Array.isArray(gradesResponse) ? gradesResponse : [];
    
    return (
        <div className="rounded-lg border bg-white">
            <h2 className="border-b p-4 text-lg font-semibold">Notes</h2>
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
                        <TableRow key={grade.id}>
                            <TableCell>
                                <div>
                                    <p>{grade.courseCode}</p>
                                    <p className="text-sm text-gray-600">{grade.courseName}</p>
                                </div>
                            </TableCell>
                            <TableCell>{grade.grade}</TableCell>
                            <TableCell>{grade.semester}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon">
                                        <Pencil className="h-4 w-4 text-blue-600" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
