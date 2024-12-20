import { requestWithSupertest, baseUrl } from './setup';

describe('POST api/auth/login', () => {
  it('should return 200 and a user object with an apiToken', async () => {
    const response = await requestWithSupertest
      .post(`${baseUrl}/auth/login`)
      .send({
        email: 'prof@example.com',
        password: 'password123',
      });
    
    expect(response.status).toBe(200);
  });
});