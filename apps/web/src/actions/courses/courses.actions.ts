"use server";

import api from "@web/lib/api";
import { getUser } from "@web/lib/auth";
import { Course } from "@web/types";
import { revalidatePath } from "next/cache";

export const createCourseAction = async (form: Omit<Course, 'id'>) => {
  const user = await getUser();
  if (!user) return null;

  try {
    const courses = await api.courses.getAll(user);
    console.log(courses);

    if (!courses) {
      throw new Error('Failed to retrieve courses');
    }

    // Vérification si le code du cours existe déjà
    const courseCodeExists = courses.some(course => course.code === form.code);
    if (courseCodeExists) {
      return { status: 500, message: 'Le code du cours est déjà utilisé' };
    }

    // Vérification si le nom du cours existe déjà
    const courseNameExists = courses.some(course => course.name === form.name);
    if (courseNameExists) {
      return { status: 500, message: 'Le nom du cours est déjà utilisé' };
    }

    // Créer le cours dans l'API
    const createdCourse = await api.courses.create(user, form);

    // Réactualiser le chemin pour refléter les modifications
    revalidatePath('/courses');

    return { status: 200, message: createdCourse };
  } catch (error) {
    console.error('Error creating course', error);
    return null;
  }
};
