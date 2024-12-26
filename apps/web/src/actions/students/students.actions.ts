"use server";

import api from "@web/lib/api";
import { getUser } from "@web/lib/auth";
import { Student } from "@web/types";

export const createStudentAction = async (form: Omit<Student, 'id'>) => {
  const user = await getUser();
  if (!user) return null;

  try {
    const students = await api.students.getAll(user);
    console.log(students);

    if (!students) {
      throw new Error('Failed to retrieve students');
    }

    const emailExists = students.some(student => student.email === form.email);
    if (emailExists) {
      return { status: 500, message: 'Email est déjà utilisé' };
    }
    const studentIdExists = students.some(student => student.studentId === form.studentId);
    if (studentIdExists) {
      return { status: 500, message: 'Numéro étudiant est déjà utilisé' };
    }

    const formattedForm = {
      ...form,
      dateOfBirth: form.dateOfBirth.toISOString().split('T')[0],
    };

    const createdStudent = await api.students.create(user, formattedForm);
    return {status: 200 , message: createdStudent};
  } catch (error) {
    console.error('Error creating student', error);
    return null;
  }
};