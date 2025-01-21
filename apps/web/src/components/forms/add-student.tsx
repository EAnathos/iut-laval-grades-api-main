'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@web/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@web/components/ui/form';
import { Input } from '@web/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';


import { createStudentAction } from '@web/actions/students/students.actions';
import {
  DateInput,
  DatePicker,
  DateSegment,
  Group,
  Label
} from 'react-aria-components';
import { toast } from 'sonner';
import { DialogClose } from '../ui/dialog';

const formSchema = z.object({
  firstName: z.string({
    message: 'Veuillez saisir un prénom.',
    required_error: 'Veuillez saisir un prénom.',
  }),
  lastName: z.string({
    message: 'Veuillez saisir un nom.',
    required_error: 'Veuillez saisir un nom.',
  }),
  email: z.string({
    message: 'Veuillez saisir une adresse e-mail.',
    required_error: 'Veuillez saisir une adresse e-mail.',
  }).email({
    message: 'Veuillez saisir une adresse e-mail valide.',
  }),
  dateOfBirth: z.date({
    message: 'Veuillez saisir une date de naissance valide.',
    required_error: 'Veuillez saisir une date de naissance.',
  }),
  studentId: z.string({
    message: 'Veuillez saisir un numéro étudiant.',
    required_error: 'Veuillez saisir un numéro étudiant.',
  }),
});

export const AddStudent = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      dateOfBirth: undefined,
      studentId: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = formSchema.parse(values);
      const ajout = await createStudentAction(formData);

      if (ajout && ajout.status === 500) {
        toast.error(typeof ajout.message === 'string' ? ajout.message : "An error occurred");
      } else if (ajout && ajout.status === 200) {
        form.reset();
        toast.success('Étudiant créé avec succès.');
      }
    } catch (error) {
      console.error('Error creating student', error);
      toast.error(
        "Une erreur s'est produite lors de la soumission du formulaire.",
      );
      
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Prénom" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nom" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de naissance</FormLabel>
                <FormControl>
                    <DatePicker
                    className="space-y-2"
                    onChange={(date) => {
                      if (date) {
                        const formattedDate = new Date(date.year, date.month - 1, date.day);
                        field.onChange(formattedDate);
                      }
                    }}
                    >
                    <Label className="text-sm font-medium text-foreground"></Label>
                    <div className="flex">
                      <Group className="inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input bg-background px-3 py-2 pe-9 text-sm shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-[3px] data-[focus-within]:ring-ring/20">
                      <DateInput>
                        {segment => (
                        <DateSegment
                          segment={segment}
                          {...field}
                          className="inline rounded p-0.5 text-foreground caret-transparent outline outline-0 data-[disabled]:cursor-not-allowed data-[focused]:bg-accent data-[invalid]:data-[focused]:bg-destructive data-[type=literal]:px-0 data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[placeholder]:text-muted-foreground/70 data-[type=literal]:text-muted-foreground/70 data-[disabled]:opacity-50"
                        />
                        )}
                      </DateInput>
                      </Group>
                    </div>
                    </DatePicker>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro étudiant</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Numéro étudiant" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogClose asChild>
            <Button type="submit" className="w-full">Ajouter</Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};
