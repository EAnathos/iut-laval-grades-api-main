'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@web/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@web/components/ui/form';
import { Input } from '@web/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@web/components/ui/select';
import { DialogClose } from '@web/components/ui/dialog';
import { Course, Grade, Student } from '@web/types';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@web/components/ui/radio-group';
import { Label } from '@web/components/ui/label';
import { cn } from '@web/lib/utils';
import { OTPInput, SlotProps } from 'input-otp';
import { Minus } from 'lucide-react';
import api from '@web/lib/api';
import { createGradeAction } from '@web/actions/grades/grades.actions';
import { User } from 'next-auth';

const formSchema = z.object({
  studentId: z.string({
    required_error: 'Veuillez séléctionner un étudiant.',
  }),
  courseId: z.string({
    required_error: 'Veuillez séléctionner une ressource.',
  }),
  grade: z.coerce
    .number({
      required_error: 'Veuillez saisir une note.',
      invalid_type_error: 'Veuillez saisir une note.',
    })
    .min(0, {
      message: 'La note ne doit pas être en dessous de 0.',
    })
    .max(20, {
      message: 'La note ne doit pas dépasser 20.',
    }),
  semester: z.string({
    required_error: 'Veuillez saisir un semestre.',
  }),
  academicYear: z.string({
    required_error: 'Veuillez saisir une année académique.',
  }),
});

type AddRateProps = {
  idStudent?: Student['id'];
  idCourse?: Course['id'];
  grade: Grade;
  students?: Student[] | null;
  courses?: Course[] | null;
};

export const UpdateRate = ({
  idStudent,
  idCourse,
  grade,
  students = [],
  courses = [],
}: AddRateProps) => {
  const [isTransition, setTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: idStudent ? idStudent.toString() : undefined,
      courseId: grade.courseId ? grade.courseId.toString() : undefined,
      grade: grade.grade,
      semester: grade.semester,
      academicYear: grade.academicYear,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setTransition(async () => {
      try {
        const formData = formSchema.parse(values);
        const added = await createGradeAction({
          ...formData,
          studentId: parseInt(formData.studentId),
          courseId: parseInt(formData.courseId),
        });

        if (added) {
          form.reset();
        }
      } catch (error) {
        toast.error(
          "Une erreur s'est produite lors de la soumission du formulaire.",
        );
      }
    });
  }

  function Slot(props: SlotProps) {
    return (
      <div
        className={cn(
          'relative -ms-px flex size-9 items-center justify-center border border-input bg-background font-medium text-foreground shadow-sm shadow-black/5 transition-shadow first:ms-0 first:rounded-s-lg last:rounded-e-lg',
          { 'z-10 border border-ring ring-[3px] ring-ring/20': props.isActive },
        )}
      >
        {props.char !== null && <div>{props.char}</div>}
      </div>
    );
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-4">
          {!idStudent ? (
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Etudiant</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Séléctionner un étudiant" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {students?.map((student, index) => (
                        <SelectItem key={index} value={student.id.toString()}>
                          {student.firstName + ' ' + student.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}

          <FormField
            control={form.control}
            name="courseId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ressource</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Séléctionner un cours" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courses?.map((course, index) => (
                      <SelectItem key={index} value={course.id.toString()}>
                        {course.code + ' ' + course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <Input
                  {...field}
                  type="number"
                  step="0.01"
                  placeholder="Note"
                  max={20}
                  min={0}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="semester"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Semestre</FormLabel>
                <fieldset className="space-y-4">
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-0 -space-x-px rounded-lg shadow-sm shadow-black/5"
                  >
                    {[1, 2, 3, 4, 5, 6].map(number => (
                      <label
                        key={number}
                        className="relative flex size-9 flex-1 cursor-pointer flex-col items-center justify-center gap-3 border border-input text-center text-sm font-medium outline-offset-2 transition-colors first:rounded-s-lg last:rounded-e-lg has-[[data-state=checked]]:z-10 has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
                      >
                        <RadioGroupItem
                          id={`radio-17-r${number}`}
                          value={number.toString()}
                          className="sr-only after:absolute after:inset-0"
                        />
                        {number}
                      </label>
                    ))}
                  </RadioGroup>
                </fieldset>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="academicYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Année académique (ex : 2024-2025)</FormLabel>
                <div className="space-y-2">
                  <OTPInput
                    id="input-45"
                    containerClassName="flex items-center gap-3 has-[:disabled]:opacity-50"
                    maxLength={8}
                    {...field}
                    render={({ slots }) => (
                      <>
                        <div className="flex">
                          {slots.slice(0, 4).map((slot, idx) => (
                            <Slot key={idx} {...slot} />
                          ))}
                        </div>

                        <div className="text-muted-foreground/80">
                          <Minus size={16} strokeWidth={2} aria-hidden="true" />
                        </div>

                        <div className="flex">
                          {slots.slice(4).map((slot, idx) => (
                            <Slot key={idx} {...slot} />
                          ))}
                        </div>
                      </>
                    )}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 justify-between pt-8">
            <DialogClose asChild>
              <Button className="w-full" variant="secondary">
                Annuler
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" className="w-full" disabled={isTransition}>
                {isTransition ? (
                  <LoaderCircle
                    className="-ms-1 me-2 animate-spin"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                ) : null}
                Ajouter
              </Button>
            </DialogClose>
          </div>
        </form>
      </Form>
    </div>
  );
};
