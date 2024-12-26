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
    <div>
      <h1>Statistiques</h1>
    </div>
  );
}
