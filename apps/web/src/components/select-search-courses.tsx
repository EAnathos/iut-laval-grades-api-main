'use client';

import { Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';

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
import { Course } from '@web/types';

type SelectSearchProps = {
  courses: Course[];
};

export default function SelectSearchCourses({
  courses,
}: SelectSearchProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses = courses.filter(course =>
    `${course.code} - ${course.name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-2 mb-6">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="select-course"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20"
          >
            <span
              className={cn(
                'truncate',
                !selectedCourse && 'text-muted-foreground',
              )}
            >
              {selectedCourse ? `${selectedCourse.code} - ${selectedCourse.name}` : 'Selectionner un cours'}
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
                {filteredCourses.map(course => (
                  <CommandItem
                    key={course.id}
                    value={`${course.code} - ${course.name}`}  
                    onSelect={() => {
                      setSelectedCourse(
                        selectedCourse?.id === course.id ? null : course  
                      );
                      setOpen(false);
                    }}
                  >
                    {`${course.code} - ${course.name}`}
                    {selectedCourse?.id === course.id && (
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
