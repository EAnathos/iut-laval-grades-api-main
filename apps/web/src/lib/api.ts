'server-only';

const apiBaseUrl = process.env.API_URL;
import { Course, Grade, LoginCredentials, Professor, Student } from '@web/types';
import { auth } from './auth';
import { User } from 'next-auth';

const fetchApi = async <T>(
  url: string,
  options: RequestInit = {},
  accessToken?: string
): Promise<T | null> => {  
  const res = await fetch(`${apiBaseUrl}${url}`, {
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
    ...options,
  });

  if (!res.ok) return null;
  return (await res.json()) as T;
};

const login = async (credentials: LoginCredentials) => {
  type LoginResponse = { token: string; professor: Professor };

  const res = await fetch(`${apiBaseUrl}/auth/login`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  if (!res.ok) return null;
  return (await res.json()) as LoginResponse;
};

const api = {
  auth: {
    login,
  },
  students: {
    async getAll(user: User) {
      return fetchApi<Student[]>('/students', {}, user?.apiToken);
    },
    async get(user: User, studentId: string) {
      return fetchApi<Student>(`/students/${studentId}`, {}, user?.apiToken);
    },
    async create(user: User, student: Omit<Student, 'id' | 'dateOfBirth'> & { dateOfBirth: string }) {
      return fetchApi<Student>('/students', {
      method: 'POST',
      body: JSON.stringify(student),
      }, user?.apiToken);
    }
  },
  courses: {
    async getAll(user: User) {
      return fetchApi<Course[]>('/courses', {}, user?.apiToken);
    },
    async create(user: User, course: Omit<Course, "id">) {
      return fetchApi<Course>('/courses', {
        method: 'POST',
        body: JSON.stringify(course),
      }, user?.apiToken);
    },
    async update(user: User, course: Course) {
      return fetchApi<Course>(`/courses/${course.id}`, {
        method: 'PUT',
        body: JSON.stringify(course),
      }, user?.apiToken);
    },
    async delete(user: User, courseId: string) {
      return fetchApi(`/courses/${courseId}`, {
        method: 'DELETE',
      }, user?.apiToken);
    }
  },
  grades: {
    async getAll(user: User) {
      return fetchApi<Grade[]>('/grades', {}, user?.apiToken);
    },
    async create(user: User, grade: Omit<Grade, 'id'>) {
      return fetchApi<Grade>('/grades', {
        method: 'POST',
        body: JSON.stringify(grade),
      }, user?.apiToken);
    },
    async get(user: User, studentId: number) {
      return fetchApi<Grade>(`/grades/student/${studentId}`, {}, user?.apiToken);
    },
    async update(user: User, grade: Grade) {
      return fetchApi<Grade>(`/grades/${grade.id}`, {
        method: 'PUT',
        body: JSON.stringify(grade),
      }, user?.apiToken);
    },
    async delete(user: User, gradeId: string) {
      return fetchApi(`/grades/${gradeId}`, {
        method: 'DELETE',
      }, user?.apiToken);
    },
    async releve(user: User, studentId: string) {
      return fetchApi(`/grades/student/${studentId}/transcript`, {}, user?.apiToken);
    }
  },
  stats: {
    async get(user: User) {
      return fetchApi('/stats/global', {}, user?.apiToken);
    },
    async course(user: User, courseId: string) {
      return fetchApi(`/stats/course/${courseId}`, {}, user?.apiToken);
    },
    async student(user: User, studentId: string) {
      return fetchApi(`/stats/student/${studentId}`, {}, user?.apiToken);
    },
  },
  fetchApi,
};

export default api;
