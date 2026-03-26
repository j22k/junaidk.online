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
import FAQ from '@/components/FAQ';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="bg-paper min-h-screen">
      <Preloader onComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <>
          <Navbar />
          <Hero />
          <About />
          <FAQ />
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