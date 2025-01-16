"use client";
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@web/components/ui/button';
import { Input } from '@web/components/ui/input';
import Link from 'next/link';
import { AddStudent } from '@web/components/forms/add-student';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@web/components/ui/dialog';
import { getUser } from '@web/lib/auth';
import api from '@web/lib/api';
import { Student } from '@web/types';
import { getStudents } from './searchStudent';

export function StudentsList() {
  
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchStudents() {
      const students = await getStudents();
      setStudents(students);
    }
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student =>
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Liste des étudiants</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button> Ajouter un étudiant</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle> Ajouter un étudiant</DialogTitle>
              <DialogDescription>
                <AddStudent />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
        <Input
          className="pl-10 bg-white"
          placeholder="Rechercher un étudiant..."
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredStudents &&
          filteredStudents.map(student => (
        <Link key={student.id} href={`/students/${student.id}`}>
        <div className="flex items-center justify-between rounded-lg border p-4 mb-4 bg-white hover:bg-gray-100">
        <div>
          <h3 className="font-medium text-blue-600">
        {student.firstName} {student.lastName}
          </h3>
          <p className="text-sm text-gray-600">{student.email}</p>
        </div>
        <span className="rounded bg-blue-100 px-2 py-1 text-sm text-blue-800">
          {student.studentId}
        </span>
          </div>
        </Link>
          ))}
      </div>
    </div>
  );
}
