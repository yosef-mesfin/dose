import { authConfig } from '@/auth.config';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { z } from 'zod';
import { getUser } from '@/app/(auth)/login/actions';
import { getStringFromBuffer } from './utils';
import { createGoogleUser } from '@/app/(auth)/signup/actions';
import prisma from './db';

export const {
  handlers: { POST, GET },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  trustHost: true,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);

          if (!user) return null;

          const encoder = new TextEncoder();
          const saltPassword = encoder.encode(password + user.salt);
          const hashedPasswordBuffer = await crypto.subtle.digest(
            'SHA-256',
            saltPassword
          );

          const hashedPassword = getStringFromBuffer(hashedPasswordBuffer);

          if (hashedPassword === user.password) {
            return user;
          } else {
            return null;
          }
        }
        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ account, profile }) {
      if (account?.provider === 'google' && profile) {
        const email =
          typeof profile.email === 'string' ? profile.email : undefined;
        if (!email) return false;
        try {
          const result = await createGoogleUser(profile);
          return result.type === 'success';
        } catch (error) {
          console.error('Error in signIn callback:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session }) {
      if (!session.user?.email) return session;

      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (user) {
        session.user = {
          ...session.user,
          id: user.id,
          emailVerified: user.emailVerified,
        };
      }

      return session;
    },
  },
});
