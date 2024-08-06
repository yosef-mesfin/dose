import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import SignupForm from '@/components/signup-form';
import { Session } from '@/lib/types/types';

export default async function SignupPage() {
  const session = (await auth()) as Session;

  if (session) {
    redirect('/notes');
  }

  return (
    <div className="h-[450px] w-[400px]">
      <SignupForm />
    </div>
  );
}
