"use server";

import api from "@web/lib/api";
import { getUser } from "@web/lib/auth";
import { Student } from "@web/types";

export const createStudentAction = async (form: Omit<Student, 'id'>) => {

      const user = await getUser();
        if (!user) return null;
    const retour = await api.students.create(user, {
      ...form,
      dateOfBirth: form.dateOfBirth.toISOString().split('T')[0],
    });
      return retour;
};