import app from '../app';
import supertest from 'supertest';

const requestWithSupertest = supertest(app);
const baseUrl = '/api';
let token = '';

const generateToken = async () => {
  const response = await requestWithSupertest
    .post(`${baseUrl}/auth/login`)
    .send({
      email: 'prof@example.com',
      password: 'password123',
    });
  token = response.body.token
}

const authHeader = async  () => ({
  Authorization: `Bearer ${token}`,
});

export { requestWithSupertest, baseUrl, authHeader, generateToken };
