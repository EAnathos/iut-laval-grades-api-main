import { authHeader, baseUrl, generateToken, requestWithSupertest } from './setup';

beforeAll(async () => await generateToken());

describe('GET api/grades', () => {
    it('should return 200 and grades', async () => {
        const response = await requestWithSupertest
        .get(`${baseUrl}/grades`)
        .set(await authHeader());
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        const firstResult = response.body[0];
        expect(typeof firstResult.grade).toBe('string');
        expect(typeof firstResult.semester).toBe('string');
        expect(typeof firstResult.academicYear).toBe('string');
        expect(typeof firstResult.studentFirstName).toBe('string');
        expect(typeof firstResult.studentLastName).toBe('string');
        expect(typeof firstResult.courseCode).toBe('string');
        expect(typeof firstResult.courseName).toBe('string');
    });

    it('should return 200 and grades for a student', async () => {
        const response = await requestWithSupertest
        .get(`${baseUrl}/grades/student/1`)
        .set(await authHeader());
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        const firstResult = response.body[0];
        expect(typeof firstResult.grade).toBe('string');
        expect(typeof firstResult.semester).toBe('string');
        expect(typeof firstResult.academicYear).toBe('string');
        expect(typeof firstResult.courseCode).toBe('string');
        expect(typeof firstResult.courseName).toBe('string');
        expect(typeof firstResult.credits).toBe('number');
    });

    it('should return 201 and create grade', async () => {
        const response = await requestWithSupertest
        .post(`${baseUrl}/grades`)
        .send({
            studentId: 1,
            courseId: 1,
            grade: 15,
            semester: 'S1',
            academicYear: '2023-2024'
        })
        .set(await authHeader());
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(typeof response.body.grade).toBe('string');
        expect(typeof response.body.semester).toBe('string');
        expect(typeof response.body.academicYear).toBe('string');
    });

    // it('should return 200 and update grade', async () => {
    //     const response = await requestWithSupertest
    //     .put(`${baseUrl}/grades/1`)
    //     .send({ grade: 18 })
    //     .set(await authHeader());
    //     expect(response.status).toBe(200);
    //     expect(response.body).toBeInstanceOf(Object);
    //     expect(typeof response.body.grade).toBe('string');
    //     expect(typeof response.body.semester).toBe('string');
    //     expect(typeof response.body.academicYear).toBe('string');
    // });

    // it('should return 204 and delete grade', async () => {
    //     const response = await requestWithSupertest
    //     .delete(`${baseUrl}/grades/1`)
    //     .set(await authHeader());
    //     expect(response.status).toBe(204);
    // });

    // it('should return 200 and generate transcript', async () => {
    //     const response = await requestWithSupertest
    //     .get(`${baseUrl}/grades/transcript/1?academicYear=2023-2024`)
    //     .set(await authHeader());
    //     expect(response.status).toBe(200);
    //     expect(response.headers['content-type']).toBe('application/pdf');
    // });
});