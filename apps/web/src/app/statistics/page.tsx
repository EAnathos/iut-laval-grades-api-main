import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@web/components/ui/dialog';
import { AddRate } from '@web/components/forms/add-rate';

export default function Statistics() {
  return (
    <Dialog>
      <DialogTrigger>Ajouter une note</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une note</DialogTitle>
          <DialogDescription>
            <AddRate />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
