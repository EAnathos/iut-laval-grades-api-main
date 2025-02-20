'use server';

import api from '@web/lib/api';
import { Grade } from '@web/types';
import { getUser } from '@web/lib/auth';
import { revalidatePath } from 'next/cache';

export const createGradeAction = async (form: Omit<Grade, 'id'>) => {
  const formattedValues = {
    ...form,
    academicYear:
      form.academicYear.slice(0, 4) + '-' + form.academicYear.slice(4),
    semester: 'S' + form.semester,
  };

  const user = await getUser();

  if (!user) return null;

  const retour = await api.grades.create(user, formattedValues);
  revalidatePath('/students/[id]');
  return retour;
};

export const updateGradeAction = async (form: Grade) => {
  if (form.grade < 0 || form.grade > 20) {
    return { status: 500, message: 'La note doit être comprise entre 0 et 20' };
  }

  const formattedValues = {
    ...form,
    academicYear:
      form.academicYear.slice(0, 4) + '-' + form.academicYear.slice(4),
    semester: 'S' + form.semester,
  };

  const user = await getUser();

  if (!user) return null;

  const retour = await api.grades.update(user, formattedValues);

  return { status: 200, message: retour };
};

export const deleteGradeAction = async (id: number) => {
  const user = await getUser();

  if (!user) return null;

  await api.grades.delete(user, id);
  revalidatePath('/students/[id]');
  return true;
};

export const releverNotesAction = async (studentId: number) => {
  const user = await getUser();
  console.log('test');
  if (!user) return null;
  const response = await api.grades.releve(user, studentId);
  return response;
  // try {

  //   // if (response && typeof response === 'object' && 'data' in response) {
  //   //   const blob = new Blob([response.data as BlobPart], { type: 'application/pdf' });
  //   //   console.log('blob', blob);
  //   //   return blob;
  //   // } else {
  //   //   throw new Error('Invalid response format');
  //   // }
  // } catch (error) {
  //   console.error('Error creating student', error);
  //   return null;
  // }
};
