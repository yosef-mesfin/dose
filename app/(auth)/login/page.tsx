import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import SignupForm from '@/components/signup-form';
import { Session } from '@/lib/types/types';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ButtonSizes, IconPosition } from '@/lib/types/button';
import { FcGoogle } from 'react-icons/fc';
import LoginForm from '@/components/login-form';

export default async function LogInPage() {
  const session = (await auth()) as Session;

  if (session) {
    redirect('/notes');
  }

  return (
    <div className="h-[400px] w-[400px]">
      <LoginForm />
    </div>
  );
}
