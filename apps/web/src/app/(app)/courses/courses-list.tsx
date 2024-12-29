import React from 'react';
import { Pencil, Search, Trash2 } from 'lucide-react';
import { Button } from '@web/components/ui/button';
import { Input } from '@web/components/ui/input';
import { AddCourse } from '@web/components/forms/add-course';
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

export async function CoursesList() {
  const user = await getUser();
  if (!user) return null;
  const courses = await api.courses.getAll(user);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Liste des cours</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Ajouter un cours</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un cours</DialogTitle>
              <DialogDescription>
                <AddCourse />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
        <Input
          className="pl-10"
          placeholder="Rechercher un cours..."
          type="search"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200 bg-white shadow-sm">
          <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              CODE
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              NOM
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              CRÉDITS
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              ACTIONS
            </th>
          </tr>
          </thead>
          <tbody>
          {courses && courses.map((course) => (
            <tr key={course.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-700">{course.code}</td>
              <td className="px-4 py-3 text-gray-700">{course.name}</td>
              <td className="px-4 py-3 text-gray-700">{course.credits}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
