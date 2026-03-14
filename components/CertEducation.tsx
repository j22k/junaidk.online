'use client';

import { motion } from 'framer-motion';
import { CERTIFICATIONS, EDUCATION } from '@/lib/data';

export default function CertEducation() {
  const visibleCerts = CERTIFICATIONS.filter(c => !c.placeholder);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-[960px] mx-auto px-6 py-28"
    >
      <hr className="mb-12" />
      <div className="text-[10px] font-dm font-light tracking-[0.25em] uppercase text-ink/40 mb-12">
        05 &mdash; Certifications & Education
      </div>

      <div className="flex flex-col gap-24">
        {/* Certifications */}
        <div>
          <h3 className="font-cormorant italic text-[clamp(2rem,4vw,3rem)] mb-8">Certifications</h3>
          <div className="flex flex-col border-t border-ink/[0.08]">
            {visibleCerts.map((cert) => (
              <div key={cert.id} className="group py-6 border-b border-ink/[0.08] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:bg-ink/[0.03] transition-colors duration-200 px-4 -mx-4">
                <div className="flex items-center gap-5">
                  {cert.badgeUrl && (
                    <div className="w-12 h-12 flex-shrink-0 opacity-80 mix-blend-multiply grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={cert.badgeUrl} alt={cert.name} className="w-full h-full object-contain" />
                    </div>
                  )}
                  <div className="font-dm font-medium text-[15px] leading-snug">
                    {cert.name}
                  </div>
                </div>
                <div className="font-dm font-light text-[13px] text-ink/40 text-left sm:text-right ml-[68px] sm:ml-0">
                  {cert.issuer} &middot; {cert.issuedDate}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="font-cormorant italic text-[clamp(2rem,4vw,3rem)] mb-8">Education</h3>
          <div className="flex flex-col border-t border-ink/[0.08]">
            {EDUCATION.map((edu) => (
              <div key={edu.id} className="group py-6 border-b border-ink/[0.08] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:bg-ink/[0.03] transition-colors duration-200 px-4 -mx-4">
                <div className="flex items-center gap-5">
                  {edu.logoUrl && (
                    <div className="w-12 h-12 flex-shrink-0 opacity-80 mix-blend-multiply grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={edu.logoUrl} alt={edu.institution} className="w-full h-full object-contain" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-dm font-medium text-[15px] leading-snug">
                      {edu.degree}
                    </span>
                    <span className="font-dm font-light text-[13px] text-ink/50 mt-1">
                      {edu.institution}, {edu.location}
                    </span>
                  </div>
                </div>
                <div className="font-dm font-light text-[13px] text-ink/40 text-left sm:text-right whitespace-nowrap ml-[68px] sm:ml-0">
                  {edu.startYear} &mdash; {edu.endYear}
                  {edu.cgpa && <div className="mt-1">CGPA: {edu.cgpa}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}