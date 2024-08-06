'use server';
import { getStringFromBuffer, ResultCode } from '@/lib/utils';
import { getUser } from '../login/actions';
import prisma from '@/lib/db';
import { z } from 'zod';
import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';

export async function createUser(
  email: string,
  username: string,
  hashedPassword: string,
  salt: string
) {
  const existingUser = await getUser(email);

  if (existingUser) {
    return {
      type: 'error',
      resultCode: ResultCode.UserAlreadyExists,
    };
  } else {
    console.log('body: ', { username, email, hashedPassword, salt });
    try {
      await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          salt,
        },
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
    return {
      type: 'success',
      resultCode: ResultCode.UserCreated,
    };
  }
}

interface IResult {
  type: string;
  resultCode: ResultCode;
}

export async function signup(
  _prevState: IResult | undefined,
  formData: FormData
): Promise<IResult | undefined> {
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const parsedCredentials = z
    .object({
      email: z.string().email(),
      username: z.string().min(3),
      password: z.string().min(6),
    })
    .safeParse({ email, username, password });

  if (parsedCredentials.success) {
    const salt = crypto.randomUUID();

    // create a salted and hashed password
    const encoder = new TextEncoder();
    const saltPassword = encoder.encode(password + salt);
    const hashedPasswordBuffer = await crypto.subtle.digest(
      'SHA-256',
      saltPassword
    );

    const hashedPassword = getStringFromBuffer(hashedPasswordBuffer);

    try {
      const result = await createUser(email, username, hashedPassword, salt);

      if (result.resultCode === ResultCode.UserCreated) {
        await signIn('credentials', {
          email,
          password,
          redirect: false,
          redirectTo: '/notes',
        });
      }
      return result;
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
      } else {
        return {
          type: 'error',
          resultCode: ResultCode.UnknownError,
        };
      }
    }
  } else {
    return {
      type: 'error',
      resultCode: ResultCode.InvalidCredentials,
    };
  }
}
