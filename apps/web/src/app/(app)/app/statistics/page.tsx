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

export default async function Statistics() {

  const user = await getUser();
  if (!user) return null;

  const students = await api.students.getAll(user);

  return (
    <Dialog>
      <DialogTrigger>Ajouter une note</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une note</DialogTitle>
          <DialogDescription>
            <AddRate idCourse={1} students={students} user={user}/>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
