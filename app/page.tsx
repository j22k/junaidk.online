'use client';

import { useState } from 'react';
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

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="bg-[#F5F5F7] min-h-screen">
      <Preloader onComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <>
          <Navbar />
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <CertEducation />
          <Contact />
          <Footer />
        </>
      )}
    </main>
  );
}