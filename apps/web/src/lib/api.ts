'server-only';

import { LoginCredentials, Professor } from '@web/types';

const apiBaseUrl = process.env.API_URL;

const fetchApi = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T | null> => {
  const res = await fetch(`${apiBaseUrl}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) return null;
  return (await res.json()) as T;
};

const login = async (credentials: LoginCredentials) => {
  type LoginResponse = { token: string; professor: Professor };

  return fetchApi<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

const api = {
  auth: {
    login,
  },
};

export default api;
