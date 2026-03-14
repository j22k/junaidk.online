'use client';

import { motion } from 'framer-motion';
import { EXPERIENCES } from '@/lib/data';

export default function Experience() {
  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-[960px] mx-auto px-6 py-28"
    >
      <hr className="mb-12" />
      <div className="text-[10px] font-dm font-light tracking-[0.25em] uppercase text-ink/40 mb-12">
        02 &mdash; Experience
      </div>

      <div className="flex flex-col border-t border-ink/[0.08]">
        {EXPERIENCES.map((exp, i) => {
          const isCurrent = exp.endDate.toLowerCase() === 'present';

          return (
            <div
              key={exp.id}
              className="group flex flex-col sm:flex-row sm:items-baseline justify-between py-6 border-b border-ink/[0.08] transition-colors duration-200 hover:bg-ink/[0.03] px-4 -mx-4"
            >
              <div className="flex flex-col mb-2 sm:mb-0">
                <div className="flex items-center gap-2">
                  {isCurrent && (
                    <span className="w-[3px] h-[3px] bg-ink rounded-full" />
                  )}
                  <span className="font-dm font-medium text-[14px]">
                    {exp.role}
                  </span>
                </div>
                <span className="font-dm font-light text-[14px] text-ink/50">
                  {exp.company}
                </span>

                <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {exp.tech.slice(0, 3).map(tech => (
                    <span key={tech} className="font-dm font-light text-[10px] text-ink/40 border border-ink/[0.08] px-2 py-0.5 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="font-dm font-light text-[12px] text-ink/40 sm:text-right">
                {exp.startDate} &mdash; {exp.endDate}
                {exp.location && <span> &middot; {exp.location}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}