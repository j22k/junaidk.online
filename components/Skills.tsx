'use client';

import { motion } from 'framer-motion';
import { SKILLS } from '@/lib/data';

export default function Skills() {
  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-[960px] mx-auto px-6 py-28"
    >
      <hr className="mb-12" />
      <div className="text-[10px] font-dm font-light tracking-[0.25em] uppercase text-ink/40 mb-12">
        04 &mdash; Skills
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
        {SKILLS.map((category) => (
          <div key={category.label} className="flex flex-col gap-3">
            <h3 className="font-dm font-medium text-[11px] uppercase tracking-wide">
              {category.label}
            </h3>
            <p className="font-dm font-light text-[16px] text-ink/50 leading-[1.8]">
              {category.items.join(', ')}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}