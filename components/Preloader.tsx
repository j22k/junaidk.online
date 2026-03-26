'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = [
  'Hello', 'നമസ്കാരം', 'مرحبا', 'Hola', 'こんにちは',
  'Bonjour', 'नमस्ते', 'Ciao', '안녕하세요', 'Olá'
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<'words' | 'bar' | 'slide'>('words');
  const [mounted, setMounted] = useState(false);
  const [skip, setSkip] = useState<boolean | null>(null);

  // Only render on the client to avoid SSR/CSR markup mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check whether we've visited before; decide to skip preloader
  useEffect(() => {
    if (!mounted) return;
    const visited = sessionStorage.getItem('visited');
    if (visited) {
      setSkip(true);
      // give parent a tick to avoid calling during render
      setTimeout(() => onComplete(), 0);
      return;
    }
    setSkip(false);

    if (sessionStorage.getItem('visited')) {
      onComplete();
      return;
    }

    if (phase === 'words') {
      const interval = setInterval(() => {
        setIndex((prev) => {
          if (prev >= WORDS.length - 1) {
            clearInterval(interval);
            setTimeout(() => setPhase('bar'), 380);
            return prev;
          }
          return prev + 1;
        });
      }, 380);
      return () => clearInterval(interval);
    } else if (phase === 'bar') {
      const t = setTimeout(() => setPhase('slide'), 1200);
      return () => clearTimeout(t);
    } else if (phase === 'slide') {
      const t = setTimeout(() => {
        sessionStorage.setItem('visited', 'true');
        onComplete();
      }, 800);
      return () => clearTimeout(t);
    }
  }, [mounted, phase, onComplete]);

  // If we haven't yet determined skipping state, don't render anything
  if (!mounted || skip === null) return null;
  if (skip) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper"
      initial={{ y: 0 }}
      animate={phase === 'slide' ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="flex-1 flex items-center justify-center relative w-full h-full">
        <AnimatePresence mode="wait">
          {phase === 'words' && (
            <motion.h1
              key={WORDS[index]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.19 }}
              className="text-ink text-[clamp(3rem,8vw,6rem)] font-cormorant font-light tracking-wide m-0 leading-none absolute"
            >
              {WORDS[index]}
            </motion.h1>
          )}
        </AnimatePresence>
      </div>

      {/* Bar area */}
      <div className="absolute bottom-0 left-0 w-full h-[1px]">
        {phase === 'bar' && (
          <motion.div
            className="h-full bg-[var(--ink)]"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.2, ease: 'linear' }}
          />
        )}
      </div>
    </motion.div>
  );
}
