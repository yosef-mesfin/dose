'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/(auth)/login/actions';
import Link from 'next/link';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { IconSpinner } from './ui/icons';
import { getMessageFromCode } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [result, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (result) {
      if (result.type === 'error') {
        toast.error(getMessageFromCode(result.resultCode));
      } else {
        toast.success(getMessageFromCode(result.resultCode));
        router.refresh();
      }
    }
  }, [result, router]);

  return (
    <form
      action={dispatch}
      className="card-wrapper bg-primary/10 h-full w-full"
    >
      <div
        className="card-content flex items-center justify-center"
        style={{
          height: 'calc(100% - 4px)',
          width: 'calc(100% - 4px)',
          top: '2px',
          left: '2px',
          background: '#09090B',
        }}
      >
        <div className="flex h-full flex-col items-center justify-center gap-2 pb-4">
          <div className="w-full h-full flex-1 flex flex-col justify-around rounded-lg bg-white px-6 pt-8 shadow-md  md:w-96 dark:bg-zinc-950">
            <h1 className="mb-3 text-2xl font-bold">
              Please log in to continue.
            </h1>
            <div className="w-full">
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-zinc-400"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-zinc-400"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    required
                    minLength={6}
                  />
                </div>
              </div>
            </div>
            <LoginButton />
          </div>

          <Link
            href="/signup"
            className="flex flex-row gap-1 text-sm text-zinc-400"
          >
            No account yet?{' '}
            <div className="font-semibold underline">Sign up</div>
          </Link>
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="my-4 flex h-10 w-full flex-row items-center justify-center rounded-md bg-zinc-900 p-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      aria-disabled={pending}
    >
      {pending ? <IconSpinner /> : 'Log in'}
    </button>
  );
}
