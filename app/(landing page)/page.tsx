import ShinyButton from '@/components/ui/ShinyButton';
import { IoPencil } from 'react-icons/io5';
import Link from 'next/link';

export default function Landing() {
  return (
    <div className="flex flex-col items-center bg-primary/10 p-8">
      <div className="flex items-center justify-center">
        <h1
          className="flex items-center text-foreground text-4xl md:text-6xl font-bold
        bg-gradient-to-r"
        >
          Welcome to
          <span className="ml-1 bg-zinc-950 p-2 rounded-lg flex italic text-[#C085CA]">
            Dose.
            <IoPencil />
          </span>
        </h1>
      </div>
      <p className="text-foreground text-lg md:text-xl mt-4">
        A simple note-taking app
      </p>
      <Link href="/notes">
        <ShinyButton style={{ marginTop: '1rem' }}>Get Started</ShinyButton>
      </Link>
    </div>
  );
}
