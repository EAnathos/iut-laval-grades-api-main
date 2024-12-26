import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@web/components/ui/dialog';
import { AddRate } from '@web/components/forms/add-rate';
import api from '@web/lib/api';
import { getUser } from '@web/lib/auth';
import { Button } from '@web/components/ui/button';

export default async function Statistics() {
  const user = await getUser();
  if (!user) return null;

  const students = await api.students.getAll(user);

  const courses = await api.courses.getAll(user);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Ajouter une note</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une note</DialogTitle>
          <DialogDescription>
            <AddRate idStudent={1} students={students} courses={courses} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
