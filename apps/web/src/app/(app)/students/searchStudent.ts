"use server";

import { getUser } from '@web/lib/auth';
import { Student } from '@web/types';
import api from '@web/lib/api';

export async function getStudents(): Promise<Student[]> {
  const user = await getUser();
  if (!user) return [];
  return await api.students.getAll(user);
}