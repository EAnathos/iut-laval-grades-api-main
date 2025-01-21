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
  });

  describe('POST /api/courses', () => {
    it('should return 201 and the created course', async () => {
      const newCourse = {
        code: 'CS101_' + Date.now(),
        name: 'Test Introduction to Computer Science',
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
  });

  describe('PUT /api/courses/:id', () => {
    it('should return 200 and the updated course', async () => {
      const updateId = 1;
      const updatedCourse = {
        code: 'CS102_' + Date.now(),
        name: 'Test Advanced Computer Science',
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
  });

  describe('DELETE /api/courses/:id', () => {
    it('should return 204 when a course is successfully deleted', async () => {
      // Créez un cours pour le supprimer
      const newCourse = {
        code: 'CS104_' + Date.now(),
        name: 'Test Course to Delete',
        credits: 3,
        description: 'This course will be deleted.',
      };

      const createResponse = await requestWithSupertest
        .post(`${baseUrl}/courses`)
        .set(await authHeader())
        .send(newCourse);
      
      expect(createResponse.status).toBe(201);

      const deleteId = createResponse.body.id;
      const response = await requestWithSupertest
        .delete(`${baseUrl}/courses/${deleteId}`)
        .set(await authHeader());

      expect(response.status).toBe(204);
    });
  });
});
