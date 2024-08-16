import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { Session } from '@/lib/types/types';

export default async function CatchAll() {
  const session = (await auth()) as Session;
  if (session) redirect('/notes');
  redirect('/login');
  return null;
}
