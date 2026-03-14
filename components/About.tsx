'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { PROFILE, STATS } from '@/lib/data';

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1500;
      const increment = value / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          clearInterval(timer);
          setCount(value);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [value, isInView]);

  return <span ref={ref}>{count}</span>;
}

export default function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-[960px] mx-auto px-6 py-28"
    >
      <hr className="mb-12" />
      <div className="text-[10px] font-dm font-light tracking-[0.25em] uppercase text-ink/40 mb-12">
        01 &mdash; About
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-16">
        <div>
          <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-cormorant italic leading-[1.1] mb-8">
            About me
          </h2>
          <div className="text-[16px] font-dm font-light leading-[1.8] text-ink/[0.55] space-y-6">
            <p>{PROFILE.bio}</p>
          </div>
        </div>

        <div className="flex flex-col">
          {STATS.map((stat, i) => (
            <div key={i} className="py-6 border-b border-ink/[0.08] first:border-t flex flex-col gap-1">
              <div className="font-cormorant font-semibold text-5xl">
                <AnimatedNumber value={stat.value} />{stat.suffix}
              </div>
              <div className="font-dm font-light text-sm text-ink/50">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}