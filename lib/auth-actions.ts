'use server';

import { signIn } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function signInWithGoogle() {
  await signIn('google', { redirectTo: '/notes' });
  redirect('/notes');
}
