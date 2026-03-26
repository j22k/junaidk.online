'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import CertEducation from '@/components/CertEducation';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SnakeBackground from '@/components/SnakeBackground';

const SECTIONS = [
  { id: 'hero', render: () => <Hero /> },
  { id: 'about', render: () => <About /> },
  { id: 'experience', render: () => <Experience /> },
  { id: 'projects', render: () => <Projects /> },
  { id: 'skills', render: () => <Skills /> },
  { id: 'cert', render: () => <CertEducation /> },
  { id: 'contact-footer', render: () => (
    <div className="flex flex-col w-full h-full justify-center">
      <Contact />
      <Footer />
    </div>
  )},
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const isTransitioning = useRef(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Prevent triggering multiple times during a single transition
      if (isTransitioning.current) return;
      
      const threshold = 40; // minimum scroll movement to trigger
      if (Math.abs(e.deltaY) < threshold) return;

      // Adjust lockout duration to match the new smooth, slower animation
      const lockoutDuration = 1200; 

      if (e.deltaY > 0) {
        // user scrolled down -> navigate physically next
        if (currentIndex < SECTIONS.length - 1) {
          isTransitioning.current = true;
          setDirection(1);
          setCurrentIndex((prev) => prev + 1);
          setTimeout(() => { isTransitioning.current = false; }, lockoutDuration);
        }
      } else {
        // user scrolled up -> navigate physically previous
        if (currentIndex > 0) {
          isTransitioning.current = true;
          setDirection(-1);
          setCurrentIndex((prev) => prev - 1);
          setTimeout(() => { isTransitioning.current = false; }, lockoutDuration);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentIndex]);

  const CurrentSection = SECTIONS[currentIndex].render;

  // Smoother, slower transitions using window width
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100vw" : "-100vw",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? "100vw" : "-100vw",
      opacity: 0,
    }),
  };

  return (
    <main className="bg-paper fixed inset-0 w-screen h-screen overflow-hidden">
      <SnakeBackground />
      <Preloader onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <>
          <Navbar />
          <div className="relative w-full h-full">
            <AnimatePresence 
              initial={false} 
              custom={direction} 
              mode="wait"
            >
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "tween", duration: 1.0, ease: [0.25, 1, 0.5, 1] },
                  opacity: { duration: 0.5 },
                }}
                className="absolute inset-0 w-full h-full flex flex-col justify-center items-center overflow-hidden px-4 md:px-8 py-20"
              >
                <div className="w-full max-w-5xl max-h-full flex flex-col justify-center [&_section]:!w-full [&_section]:!py-0 [&_section]:!my-0 [&_.mb-12]:!mb-4 [&_.mb-6]:!mb-2 [&_.py-8]:!py-3 [&_.py-6]:!py-2 [&_.py-28]:!py-0 [&_.py-24]:!py-0">
                  <CurrentSection />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}
    </main>
  );
}