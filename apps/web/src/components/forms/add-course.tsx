'use client';

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@web/components/ui/button';
import { Input } from '@web/components/ui/input';
import { Textarea } from '@web/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@web/components/ui/form';
import { toast } from 'sonner';
import { createCourseAction } from '@web/actions/courses/courses.actions';
import { DialogClose } from '../ui/dialog';

const formSchema = z.object({
  code: z.string().min(1, 'Le code du cours est requis'),
  name: z.string().min(1, 'Le nom du cours est requis'),
  credits: z.number().int().min(0, 'Les crédits doivent être un nombre positif'),
  description: z.string(),
});

export const AddCourse = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
      name: '',
      credits: 0,
      description: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const courseData = formSchema.parse(values);

      const result = await createCourseAction(courseData);

      if (result && result.status === 500) {
        toast.error(
          typeof result.message === 'string'
            ? result.message
            : 'Une erreur s\'est produite lors de la création du cours.'
        );
      } else if (result && result.status === 200) {
        form.reset();
        toast.success('Cours ajouté avec succès !');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      toast.error('Une erreur s\'est produite lors de la soumission.');
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Champ Code du Cours */}
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code du cours</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Code du cours" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Champ Nom du Cours */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du cours</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nom du cours" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Champ Crédits */}
          <FormField
            control={form.control}
            name="credits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Crédits</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder="Crédits"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Champ Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Description (optionnel)" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Boutons */}
          <div className="flex justify-end gap-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Annuler
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" className="bg-pink-600 hover:bg-pink-700">
                Ajouter
              </Button>
            </DialogClose>
          </div>
        </form>
      </Form>
    </div>
  );
};
