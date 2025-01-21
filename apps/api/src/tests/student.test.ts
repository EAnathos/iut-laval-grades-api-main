import { authHeader, baseUrl, generateToken, requestWithSupertest } from './setup';


beforeAll(async () => await generateToken());

describe('GET api/students', () => {
    it('should return 200 and students', async () => {
        const response = await requestWithSupertest
        .get(`${baseUrl}/students`)
        .set(await authHeader());
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        const firstresult = response.body[0];
        expect(typeof firstresult.firstName).toBe('string');
        expect(typeof firstresult.lastName).toBe('string');
        expect(typeof firstresult.email).toBe('string');
        expect(typeof firstresult.dateOfBirth).toBe('string');
        expect(typeof firstresult.studentId).toBe('string');
    });
    it('should return 200 and student', async () => {
        const response = await requestWithSupertest
        .get(`${baseUrl}/students/1`)
        .set(await authHeader());
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(typeof response.body.firstName).toBe('string');
        expect(typeof response.body.lastName).toBe('string');
        expect(typeof response.body.email).toBe('string');
        expect(typeof response.body.dateOfBirth).toBe('string');
        expect(typeof response.body.studentId).toBe('string');
    });
    it('should return 200 and create students', async () => {
        const response = await requestWithSupertest
        .post(`${baseUrl}/students`)
        .send({
            firstName: `FirstName${Math.floor(Math.random() * 1000)}`,
            lastName: `LastName${Math.floor(Math.random() * 1000)}`,
            email: `email${Math.floor(Math.random() * 1000)}@example.com`,
            dateOfBirth: '1998-06-01',
            studentId: `${Math.floor(Math.random() * 1000000)}`
        })
        .set(await authHeader());
        expect(response.status).toBe(201);
    });
});