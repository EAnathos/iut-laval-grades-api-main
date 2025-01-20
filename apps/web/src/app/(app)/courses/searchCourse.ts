"use server";

import { getUser } from '@web/lib/auth';
import api from '@web/lib/api';
import { Course } from '@web/types';

export async function getCourses(): Promise<Course[]> {
  const user = await getUser();
  if (!user) return [];
  return await api.courses.getAll(user);
}
