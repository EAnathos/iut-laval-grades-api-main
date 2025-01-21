import {
  authHeader,
  baseUrl,
  generateToken,
  requestWithSupertest,
} from './setup';

beforeAll(async () => await generateToken());

// Pour que les tests fonctionnent, vous devez d'abord créer un cours.

describe('Course Controller API', () => {
  describe('GET /api/courses', () => {
    it('should return 200 and an array of courses', async () => {
      const response = await requestWithSupertest
        .get(`${baseUrl}/courses`)
        .set(await authHeader());
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('GET /api/courses/:id', () => {
    it('should return 200 and the course data for a valid ID', async () => {
      const validId = 1;
      const response = await requestWithSupertest
        .get(`${baseUrl}/courses/${validId}`)
        .set(await authHeader());
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', validId);
    });

    it('should return 404 if the course is not found', async () => {
      const invalidId = 9999;
      const response = await requestWithSupertest
        .get(`${baseUrl}/courses/${invalidId}`)
        .set(await authHeader());
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Cours non trouvé');
    });
  });

  describe('POST /api/courses', () => {
    it('should return 201 and the created course', async () => {
      const newCourse = {
        code: 'CS101',
        name: 'Introduction to Computer Science',
        credits: 3,
        description: 'Learn the basics of computer science.',
      };

      const response = await requestWithSupertest
        .post(`${baseUrl}/courses`)
        .set(await authHeader())
        .send(newCourse);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.code).toBe(newCourse.code);
    });

    it('should return 409 if the course code already exists', async () => {
      const duplicateCourse = {
        code: 'CS101',
        name: 'Duplicate Course',
        credits: 3,
        description: 'This course should cause a conflict.',
      };

      const response = await requestWithSupertest
        .post(`${baseUrl}/courses`)
        .set(await authHeader())
        .send(duplicateCourse);

      expect(response.status).toBe(409);
      expect(response.body.message).toBe('Un cours avec ce code existe déjà');
    });
  });

  describe('PUT /api/courses/:id', () => {
    it('should return 200 and the updated course', async () => {
      const updateId = 1;
      const updatedCourse = {
        code: 'CS102',
        name: 'Advanced Computer Science',
        credits: 4,
        description: 'An advanced course on computer science.',
      };

      const response = await requestWithSupertest
        .put(`${baseUrl}/courses/${updateId}`)
        .set(await authHeader())
        .send(updatedCourse);

      expect(response.status).toBe(200);
      expect(response.body.code).toBe(updatedCourse.code);
    });

    it('should return 404 if the course to update is not found', async () => {
      const invalidId = 9999;
      const updatedCourse = {
        code: 'CS103',
        name: 'Non-existent Course',
        credits: 2,
        description: 'This course does not exist.',
      };

      const response = await requestWithSupertest
        .put(`${baseUrl}/courses/${invalidId}`)
        .set(await authHeader())
        .send(updatedCourse);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Cours non trouvé');
    });
  });

  describe('DELETE /api/courses/:id', () => {
    it('should return 204 when a course is successfully deleted', async () => {
      const deleteId = 1;
      const response = await requestWithSupertest
        .delete(`${baseUrl}/courses/${deleteId}`)
        .set(await authHeader());

      expect(response.status).toBe(204);
    });

    it('should return 404 if the course to delete is not found', async () => {
      const invalidId = 9999;
      const response = await requestWithSupertest
        .delete(`${baseUrl}/courses/${invalidId}`)
        .set(await authHeader());

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Cours non trouvé');
    });
  });
});
