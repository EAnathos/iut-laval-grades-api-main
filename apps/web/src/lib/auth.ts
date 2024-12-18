import NextAuth, { DefaultSession } from 'next-auth';
import authConfig from './auth.config';

declare module 'next-auth' {
  interface Session {
    user: {
      firstName: string;
      lastName: string;
      department: string;
      apiToken: string;
    } & DefaultSession['user'];
  }

  interface User {
    firstName: string;
    lastName: string;
    department: string;
    apiToken: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  ...authConfig,
});

export const getUser = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.id || !session.user.email)
    return null;

  return {
    id: session.user.id,
    email: session.user.email,
    firstName: session.user.firstName,
    lastName: session.user.lastName,
    department: session.user.department,
    apiToken: session.user.apiToken,
  };
};
