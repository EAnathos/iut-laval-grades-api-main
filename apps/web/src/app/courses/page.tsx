import { Button } from "@web/components/ui/button";
import { AddCourse } from "@web/components/forms/add-course";
import { Dialog, DialogTrigger, DialogContent, DialogOverlay } from "@web/components/ui/dialog";
import { getUser } from "@web/lib/auth";
import api from "@web/lib/api";
import { User } from "next-auth";
import { CourseTable } from "@web/components/courses-table";

interface Course {
  id: number;
  code: string;
  name: string;
  credits: number;
}

export default async function Courses() {
  const user: User | null = await getUser();
  if (!user) throw new Error("Utilisateur non connecté.");

  console.log(user);

  const courses = await api.courses.getAll(user);
  if (!courses) throw new Error("Impossible de récupérer les cours.");

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

      <CourseTable courses={courses} />
    </div>
  );
}
