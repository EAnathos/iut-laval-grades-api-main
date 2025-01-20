'server-only';

const apiBaseUrl = process.env.API_URL;
import { Course, CourseStats, GlobalStats, Grade, LoginCredentials, Professor, Student, StudentSemesterStats } from '@web/types';
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
    async delete(user: User, courseId: number) {
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
    async delete(user: User, gradeId: number) {
      fetchApi(`/grades/${gradeId}`, {
        method: 'DELETE',
      }, user?.apiToken);
    },
    async releve(user: User, studentId: number) {
      const res = await fetch(`${apiBaseUrl}/grades/student/${studentId}/transcript?academicYear=2024-2025`, {
        headers: { 'Authorization': `Bearer ${user?.apiToken}` },
      });
      
      return res;
    }
  },
  stats: {
    async get(user: User, academicYear: string) {
      return fetchApi<GlobalStats>(`/stats/global?academicYear=${academicYear}`, {}, user?.apiToken);
    },
    async course(user: User, courseId: string, academicYear: string) {
      return fetchApi<CourseStats>(`/stats/course/${courseId}?academicYear=${academicYear}`, {}, user?.apiToken);
    },
    async student(user: User, studentId: string, academicYear: string) {
      return fetchApi<StudentSemesterStats[]>(`/stats/student/${studentId}?academicYear=${academicYear}`, {}, user?.apiToken);
    },
  },
  fetchApi,
};

export default api;
