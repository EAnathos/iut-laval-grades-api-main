import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import api from './api';

import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Adresse e-mail', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const result = userSchema.safeParse(credentials);
        if (!result.success) return null

        const res = await api.auth.login({
          email: result.data?.email,
          password: result.data?.password,
        });
        if (!res) return null;

        return {
          id: res.professor.id.toString(),
          email: res.professor.email,
          firstName: res.professor.firstName,
          lastName: res.professor.lastName,
          department: res.professor.department,
          apiToken: res.token,
        };
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.department = user.department;
        token.apiToken = user.apiToken;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.firstName = token.firstName as string;
      session.user.lastName = token.lastName as string;
      session.user.department = token.department as string;
      session.user.apiToken = token.apiToken as string;
      return session;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24, // 24 hours
  },
  pages: {
    signIn: '/',
  },
  secret: process.env.JWT_SECRET || 'secret',
} satisfies NextAuthConfig;
