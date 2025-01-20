import { authHeader, baseUrl, generateToken, requestWithSupertest } from './setup';

beforeAll(async () => await generateToken());

describe('GET api/courses', () => {
  it('should return 200 and an array of courses', async () => {
    const response = await requestWithSupertest
      .get(`${baseUrl}/courses`)
      .set(await authHeader());
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
