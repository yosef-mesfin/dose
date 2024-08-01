import ShinyButton from '@/components/ui/ShinyButton';
import { IoPencil } from 'react-icons/io5';
import Link from 'next/link';
import SignupForm from '@/components/signup-form';

export default function Landing() {
  return (
    <div className="flex items-center justify-around gap-4">
      <div className="flex flex-col items-center bg-primary/10 p-8 max-w-[600px]">
        <div className="flex items-center justify-center">
          <h1
            className="flex items-center text-foreground text-3xl md:text-5xl font-bold
        bg-gradient-to-r"
          >
            Welcome to
            <span className="ml-1 bg-zinc-950 p-2 rounded-lg flex text-[#C085CA]">
              Dose.
              <IoPencil className="text-[#bd9924]" />
            </span>
          </h1>
        </div>
        <p className="text-foreground/80 text-md md:text-lg mt-4 text-center">
          Distraction free note taking app powered with AI for smart and
          productive note taking.
        </p>
        <Link href="/notes">
          <ShinyButton style={{ marginTop: '1rem' }}>Quick Access</ShinyButton>
        </Link>
      </div>
      <div className="h-[400px] w-[400px]">
        <SignupForm />
      </div>
    </div>
  );
}
