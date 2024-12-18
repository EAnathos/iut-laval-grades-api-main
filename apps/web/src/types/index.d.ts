export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  studentId: string;
}

export interface Course {
  id: number;
  code: string;
  name: string;
  credits: number;
  description: string;
}

export interface Grade {
  id: number;
  studentId: number;
  courseId: number;
  grade: number;
  semester: string;
  academicYear: string;
}

export interface Professor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
}

export interface JWTPayload {
  id: number;
  email: string;
  role: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthProfessor {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  department: string;
  passwordHash: string;
}

type GlobalStats = {
  globalAverage: number;
  totalStudents: number;
  totalCourses: number;
  averageSuccessRate: number;
};

type CourseStats = {
  courseCode: string;
  courseName: string;
  averageGrade: number;
  minGrade: number;
  maxGrade: number;
  totalStudents: number;
  successRate: number;
};

type StudentSemesterStats = {
  semester: string;
  averageGrade: number;
  totalCredits: number;
  validatedCredits: number;
  coursesCount: number;
};