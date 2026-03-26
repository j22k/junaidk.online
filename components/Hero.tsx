'use client';

import { motion } from 'framer-motion';
import { PROFILE } from '@/lib/data';

export default function Hero() {
  const container: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item: any = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="h-[100vh] flex flex-col justify-center items-center text-center px-6"
    >
      <motion.h1
        variants={item}
        className="text-[clamp(3rem,9vw,6.5rem)] font-cormorant font-light tracking-[-0.02em] text-ink leading-none mb-6"
      >
        {PROFILE.name}
      </motion.h1>

      <motion.p
        variants={item}
        className="text-[15px] font-dm font-light text-ink/50 mb-12 max-w-[500px]"
      >
        {PROFILE.role}
      </motion.p>

      <motion.div variants={item} className="flex gap-8 items-center">
        <a href="#projects" className="text-[13px] font-dm text-ink hover-underline">
          Work ↓
        </a>
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] font-dm text-ink hover-underline"
        >
          GitHub ↗
        </a>
      </motion.div>
    </motion.section>
  );
}