import { CourseTable } from '@web/app/(app)/courses/course-table';
import { getUser } from '@web/lib/auth';
import api from '@web/lib/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@web/components/ui/dialog';
import { Button } from '@web/components/ui/button';
import { AddCourse } from '@web/components/forms/add-course';
import { Search } from 'lucide-react';
import { Input } from '@web/components/ui/input';
import React from 'react';

export default async function Courses() {
  const user = await getUser();
  if (!user) return null;

  const courses = (await api.courses.getAll(user) ?? []);

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

      <div className='min-h-svh bg-muted '>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <CourseTable courses={courses} />
        </div>
      </div>
    </div>
  );
}
