'use client';

import { useEffect, useState } from "react";
import { Button } from "@web/components/ui/button";
import { AddCourse } from "@web/components/forms/add-course";
import { Dialog, DialogTrigger, DialogContent, DialogOverlay } from "@web/components/ui/dialog";
import { getUser } from "@web/lib/auth";
import api from "@web/lib/api";
import { User } from "next-auth";
import { Pencil, Trash2 } from "lucide-react";

interface Course {
  id: number;
  code: string;
  name: string;
  credits: number;
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const user: User | null = await getUser();
        if (!user) throw new Error("Utilisateur non connecté.");

        const courses = await api.courses.getAll(user);
        if (!courses) throw new Error("Impossible de récupérer les cours.");

        setCourses(courses);
      } catch (err) {
        console.error("Erreur lors de la récupération des cours:", err);
      } finally {
      }
    };

    fetchCourses();
  }, []);

  const deleteCourse = async (id: number) => {
    try {
      const user: User | null = await getUser();
      if (!user) return;

      await api.courses.delete(user, id);

      // Supprimer le cours de la liste locale après suppression
      setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression du cours:", err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Liste des cours</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-pink-600 hover:bg-pink-700">Ajouter un cours</Button>
          </DialogTrigger>

          <DialogOverlay className="fixed inset-0 bg-gray-500 bg-opacity-50" />

          <DialogContent>
            <AddCourse />
          </DialogContent>
        </Dialog>
      </div>

      {/* <SearchBar /> */}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-gray-500">CODE</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">NOM</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">CREDITS</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">ACTIONS</th>
          </tr>
          </thead>
          <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-b">
              <td className="py-3 px-4 text-gray-700">{course.code}</td>
              <td className="py-3 px-4 text-gray-700">{course.name}</td>
              <td className="py-3 px-4 text-gray-700">{course.credits}</td>
              <td className="py-3 px-4 text-gray-700">
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="text-red-600 hover:text-red-800"
                  >
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
