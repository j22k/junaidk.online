'use client';

import { motion } from 'framer-motion';
import { PROJECTS } from '@/lib/data';

export default function Projects() {
  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-[960px] mx-auto px-6 py-28"
    >
      <hr className="mb-12" />
      <div className="text-[10px] font-dm font-light tracking-[0.25em] uppercase text-ink/40 mb-12">
        03 &mdash; Projects
      </div>

      <div className="flex flex-col border-t border-ink/[0.08]">
        {PROJECTS.map((project, i) => {
          const num = String(i + 1).padStart(2, '0');

          return (
            <div
              key={project.id}
              className="group relative flex flex-col md:flex-row gap-6 md:gap-12 py-8 border-b border-ink/[0.08] px-4 -mx-4 hover:bg-ink/[0.03] transition-colors duration-200"
            >
              <div className="absolute top-4 left-4 text-ink/10 font-cormorant font-light text-6xl pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
                {num}
              </div>

              <div className="flex-1 md:ml-[80px] z-10">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-dm font-medium text-[16px]">
                    {project.name}
                  </h3>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-dm font-light text-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover-underline"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
                
                <p className="font-dm font-light text-[14px] text-ink/50 leading-[1.6] mb-4">
                  {project.description}
                </p>

                <div className="font-dm font-light text-[12px] text-ink/[0.35]">
                  {project.tech.join(', ')}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}