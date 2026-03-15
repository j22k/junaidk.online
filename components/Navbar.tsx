'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { IconSun, IconMoon } from '@tabler/icons-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const LINKS = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-40 bg-transparent flex justify-center py-6 px-6"
      >
        <div className="w-full max-w-[960px] flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-cormorant italic text-[22px] text-ink leading-none">
              JK
            </Link>
            <div className="hidden md:block w-[3px] h-[3px] rounded-full bg-ink/40" />
          </div>

          <div className="hidden md:flex items-center gap-10">
            {LINKS.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="font-dm font-light text-[12px] text-ink/50 hover:text-ink transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="text-ink/50 hover:text-ink transition-colors duration-300 ml-4 flex items-center justify-center p-1"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <IconSun size={18} stroke={1.5} /> : <IconMoon size={18} stroke={1.5} />}
              </button>
            )}
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden flex flex-col gap-[4px] p-2"
          >
            <div className="w-6 h-[1px] bg-ink" />
            <div className="w-6 h-[1px] bg-ink" />
            <div className="w-6 h-[1px] bg-ink" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-paper flex flex-col items-center justify-center p-6">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-8 p-2 text-ink/50 hover:text-ink text-sm font-dm"
          >
            [ Close ]
          </button>

          <div className="flex flex-col gap-8 text-center">
            {LINKS.map(link => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-cormorant text-4xl text-ink font-light tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            {mounted && (
              <button
                onClick={() => {
                  setTheme(theme === 'dark' ? 'light' : 'dark');
                  setIsOpen(false);
                }}
                className="text-ink/60 hover:text-ink mt-8 flex items-center justify-center p-2"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <IconSun size={28} stroke={1.2} /> : <IconMoon size={28} stroke={1.2} />}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
