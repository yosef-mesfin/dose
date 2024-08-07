import { redirect } from 'next/navigation';

export default function CatchAll() {
  redirect('/login');
  return null;
}
