'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-[960px] mx-auto px-6 py-32 text-center"
    >
      <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-cormorant italic leading-[1.1] mb-6">
        Let's work together
      </h2>
      <p className="font-dm font-light text-[16px] text-ink/[0.55] mb-12">
        Open to AI Engineer & Full-Stack roles
      </p>

      <div className="flex flex-col gap-6 items-center">
        <a 
          href="mailto:muhammedjunaid@example.com" 
          className="font-dm font-normal text-[15px] text-ink hover-underline"
        >
          muhammedjunaid@example.com ↗
        </a>
        <a 
          href="https://linkedin.com/in/muhammed-junaid-k-90a6791b7" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-dm font-normal text-[15px] text-ink hover-underline"
        >
          linkedin.com/in/muhammed-junaid-k ↗
        </a>
        <a 
          href="https://github.com/j22k" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-dm font-normal text-[15px] text-ink hover-underline"
        >
          github.com/j22k ↗
        </a>
      </div>
    </motion.section>
  );
}
