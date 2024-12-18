'server-only';

const apiBaseUrl = process.env.API_URL;

/**
 * {
  "token": "string",
  "professor": {
    "id": 0,
    "email": "string",
    "firstName": "string",
    "department": "string"
  }
}
 */
type User = {
  token: string;
  professor: {
    id: number;
    email: string;
    firstName: string;
    department: string;
  };
};

const login = async (credentials: { email: string; password: string }) => {
  const res = await fetch(`${apiBaseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) return null;
  return await res.json() as User;
}


const api = {
  'auth': {
    login,
  },
};
  
export default api;