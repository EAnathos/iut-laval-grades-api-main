"use client";

import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@web/components/ui/input';
import { Course } from '@web/types';
import { getCourses } from './searchCourse'
import { CourseTable } from '@web/app/(app)/courses/course-table';
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

export function CoursesList() {

  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchCourses() {
      const courses = await getCourses();
      setCourses(courses);
    }
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course =>
    `${course.code} ${course.name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          className="pl-10 bg-white"
          placeholder="Rechercher un cours"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <CourseTable courses={filteredCourses} />
    </div>
  );
}
