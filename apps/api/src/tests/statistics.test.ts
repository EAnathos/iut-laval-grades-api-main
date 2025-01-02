import { authHeader, baseUrl, generateToken, requestWithSupertest } from './setup';


beforeAll(async () => await generateToken());

describe('GET api/statistics', () => {
    it('should return 200 and an array of statistics', async () => {
        const response = await requestWithSupertest
        .get(`${baseUrl}/stats/global?academicYear=2024-2025`)
        .set(await authHeader());
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(typeof response.body.globalAverage).toBe('string');
        expect(typeof response.body.totalStudents).toBe('string');
        expect(typeof response.body.totalCourses).toBe('string');
        expect(typeof response.body.averageSuccessRate).toBe('number');
    });
    it('should return 200 and an array of statistics', async () => {
        const response = await requestWithSupertest
        .get(`${baseUrl}/stats/course/CS101?academicYear=2024-2025`)
        .set(await authHeader());
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(typeof response.body.courseCode).toBe('string');
        expect(typeof response.body.courseName).toBe('string');
        expect(typeof response.body.averageGrade).toBe('string');
        expect(typeof response.body.minGrade).toBe('string');
        expect(typeof response.body.maxGrade).toBe('string');
        expect(typeof response.body.totalStudents).toBe('string');
        expect(typeof response.body.successRate).toBe('number');
    });
    it('should return 200 and an array of statistics', async () => {
        const response = await requestWithSupertest
        .get(`${baseUrl}/stats/student/1?academicYear=2024-2025`)
        .set(await authHeader());
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
        const studentStats = response.body[0];
        expect(typeof studentStats.semester).toBe('string');
        expect(typeof studentStats.averageGrade).toBe('string');
        expect(typeof studentStats.totalCredits).toBe('string');
        expect(typeof studentStats.validatedCredits).toBe('string');
        expect(typeof studentStats.coursesCount).toBe('string');
    });
});