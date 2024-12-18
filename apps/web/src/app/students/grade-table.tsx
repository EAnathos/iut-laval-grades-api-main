'use client';
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
import React, { useEffect } from 'react';

export interface Grade {
    id: number;
    studentId: number;
    courseId: number;
    grade: number;
    semester: string;
    academicYear: string;
    studentFirstName: string;
    studentLastName: string;
    courseCode: string;
    courseName: string;
}

interface GradesTableProps {
    studentId: string;
}

export function GradesTable({ studentId }: GradesTableProps) {
    const [grades, setGrades] = React.useState<Grade[]>([]);

    const fetchGrade = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/grades/student/${studentId}`);
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des cours');
          }
          const data: Grade[] = await response.json();
          setGrades(data);
        } catch (error) {
          console.error('Erreur:', error);
          //setError('Impossible de charger les cours')
        } finally {
          //setIsLoading(false)
        }
      }

    useEffect(() => {
        fetchGrade();
    }, [studentId])
    
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
                    {grades.map((grade) => (
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
import React, { useEffect } from 'react';

export interface Grade {
    id: number;
    studentId: number;
    courseId: number;
    grade: number;
    semester: string;
    academicYear: string;
    studentFirstName: string;
    studentLastName: string;
    courseCode: string;
    courseName: string;
}

interface GradesTableProps {
    studentId: string;
}

export function GradesTable({ studentId }: GradesTableProps) {
    const [grades, setGrades] = React.useState<Grade[]>([]);

    const fetchGrade = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/grades/student/${studentId}`);
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des cours');
          }
          const data: Grade[] = await response.json();
          setGrades(data);
        } catch (error) {
          console.error('Erreur:', error);
          //setError('Impossible de charger les cours')
        } finally {
          //setIsLoading(false)
        }
      }

    useEffect(() => {
        fetchGrade();
    }, [studentId])
    
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
                    {grades.map((grade) => (
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
