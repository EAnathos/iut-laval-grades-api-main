import React from 'react';
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

export async function StudentsList() {
  const user = await getUser();
  if (!user) return null;
  const students = await api.students.getAll(user);
  console.log(students);

  return (
    <div className="p-6">
      {/* <pre>{JSON.stringify(students, null, 2)}</pre> */}
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
          className="pl-10"
          placeholder="Rechercher un étudiant..."
          type="search"
        />
      </div>

      <div className="space-y-4">
        {students &&
          students.map(student => (
        <Link key={student.id} href={`/students/${student.id}`}>
          <div className="flex items-center justify-between rounded-lg border p-4 mb-4">
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
