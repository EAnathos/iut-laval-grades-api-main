'use client';

import { Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useQueryState } from 'nuqs';

import { Button } from '@web/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@web/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@web/components/ui/popover';
import { cn } from '@web/lib/utils';
import { useRouter } from 'next/navigation';

type Student = {
  name: string;
  surname: string;
  id: string;
};

export default function SelectSearchStudent({
  students,
}: {
    students: Student[];
}) {
  const [selectedStudentId, setSelectedStudentId] = useQueryState('studentId');
  const [open, setOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();

  const selectedStudent = students.find(
    student => student.id === selectedStudentId,
  );

  const filteredStudents = students.filter(student =>
    `${student.name} - ${student.surname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-2 mb-6">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="select-student"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20"
          >
            <span
              className={cn(
                'truncate',
                !selectedStudent && 'text-muted-foreground',
              )}
            >
              {selectedStudent
                ? `${selectedStudent.name} - ${selectedStudent.surname}`
                : 'Selectionner un cours'}
            </span>
            <ChevronDown
              size={16}
              strokeWidth={2}
              className="shrink-0 text-muted-foreground/80"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0"
          align="start"
        >
          <Command>
            <CommandInput
              placeholder="Chercher un cours"
              value={searchTerm}
              onValueChange={value => setSearchTerm(value)}
            />
            <CommandList>
              <CommandEmpty>Aucun cours trouvé.</CommandEmpty>
              <CommandGroup>
                {filteredStudents.map(student => (
                  <CommandItem
                    key={student.id}
                    value={`${student.name} - ${student.surname}`}
                    onSelect={async() => {
                      await setSelectedStudentId(
                        selectedStudent?.id === student.id ? null : student.id,
                      );
                      router.refresh();
                      setOpen(false);
                    }}
                  >
                    {`${student.name} - ${student.surname}`}
                    {selectedStudent?.id === student.id && (
                      <Check size={16} strokeWidth={2} className="ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}