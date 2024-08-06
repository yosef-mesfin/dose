'use server';

import { signIn } from '@/lib/auth';
import prisma from '@/lib/db';
import { ResultCode } from '@/lib/utils';
import { AuthError } from 'next-auth';
import { z } from 'zod';

export async function getUser(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
}

interface IResult {
  type: string;
  resultCode: ResultCode;
}

export async function authenticate(
  _prevState: IResult | undefined,
  formData: FormData
): Promise<IResult | undefined> {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const parsedCredentials = z
      .object({
        email: z.string().email(),
        password: z.string().min(6),
      })
      .safeParse({ email, password });

    if (parsedCredentials) {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      return {
        type: 'success',
        resultCode: ResultCode.UserLoggedIn,
      };
    } else {
      return {
        type: 'error',
        resultCode: ResultCode.InvalidCredentials,
      };
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            type: 'error',
            resultCode: ResultCode.InvalidCredentials,
          };
        default:
          return {
            type: 'error',
            resultCode: ResultCode.UnknownError,
          };
      }
    }
  }
}
