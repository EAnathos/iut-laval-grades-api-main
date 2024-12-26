'use server';

import api from '@web/lib/api';
import { Grade } from '@web/types';
import { getUser } from '@web/lib/auth';

export const createGradeAction = async (form: Omit<Grade, 'id'>) => {
  const formattedValues = {
    ...form,
    academicYear:
      form.academicYear.slice(0, 4) + '-' + form.academicYear.slice(4),
    semester: "S" + form.semester,
  };

  const user = await getUser();

  if (!user) return null;

  const retour = await api.grades.create(user, formattedValues);

  return retour;
};
