'use server';

import api from '@web/lib/api';
import { Grade } from '@web/types';
import { getUser } from '@web/lib/auth';

export const createGradeAction = async (form: Omit<Grade, 'id'>) => {

  // const formattedValues = {
  //   ...values,
  //   academicYear:
  //     values.academicYear.slice(0, 4) +
  //     '-' +
  //     values.academicYear.slice(4),
  // };
        
  const user = await getUser();

  if (!user) return null;

  const retour = await api.grades.create(user, {
    ...form,
  });

  return retour;
};
