import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Session } from '@/lib/types/types';
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
