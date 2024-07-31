'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';

type ExtendedMotionProps = HTMLMotionProps<'button'> & {
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
};

type ShinyButtonProps = ExtendedMotionProps & {
  children: React.ReactNode;
};

export default function ShinyButton({
  children,
  type = 'button',
  ...rest
}: ShinyButtonProps) {
  return (
    <motion.button
      type={type}
      initial={{ '--x': '100%', scale: 1 }}
      animate={{ '--x': '-100%' }}
      whileTap={{ scale: 0.88 }}
      transition={{
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 1,
        type: 'spring',
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
          type: 'spring',
          stiffness: 10,
          damping: 5,
          mass: 0.1,
        },
      }}
      className="px-6 py-2 rounded-md relative radial-gradient"
      {...rest}
    >
      <span className="block h-full w-full tracking-wide text-[#C085CA] relative linear-mask">
        {children}
      </span>
      <span className="block absolute inset-0 rounded-md p-px linear-overlay" />
    </motion.button>
  );
}
