'use client';

import { useEffect, useRef, useState } from 'react';
import BentoStatCard from './BentoStatCard';
import ServiceList from './ServiceList';
import { PROFILE, CERTIFICATIONS } from '@/lib/data';

function useIntersect(options: any) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, options);
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return [ref, visible] as const;
}

export default function AboutSection() {
  const SOCIAL_LINKS = [
    {
      name: 'LinkedIn',
      href: PROFILE.linkedin,
      icon: <img src="/LinkedIn.svg" alt="LinkedIn" width={30} height={30} />,
    },
    {
      name: 'Github',
      href: PROFILE.github,
      icon: <img src="/GitHub.svg" alt="Github" width={30} height={30} />,
    },
  ];

  const WHITE_SOCIAL_LINKS = [
    {
      name: 'LinkedIn',
      href: PROFILE.linkedin,
      icon: <img src="/white-linkedin.svg" alt="LinkedIn" width={30} height={30} />,
    },
    {
      name: 'Github',
      href: PROFILE.github,
      icon: <img src="/white-github.svg" alt="Github" width={30} height={30} />,
    },
  ];

  return (
    <section id="about" aria-label="About Me">
      <div className="bento-main">
        {/* LEFT SIDE */}
        <div className="bento-left">
          <BentoStatCard className="client-bento"
            title="Projects Built"
            description="Developing intelligence in every line of code"
            value={10}
            suffix="+"
            style={{ borderRight: '1px solid #262626', borderTop: '1px solid #262626' }}
          />

          <div className="bento-cell-left about-me-cell"
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
            }}>
            <div className="bento-label font-hero" style={{ fontSize: '32px', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1, textAlign: 'center', width: '100%', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid #262626', borderBottom: '1px solid #262626' }}>ABOUT ME</div>

            <div className="service-list" style={{ flex: 1 }}>
              <ServiceList />
            </div>
          </div>

          <BentoStatCard
            title="AI Experience"
            description="Specializing in Computer Vision and Large Language Models"
            value={1}
            suffix="yr+"
            className="frontend-Bento"
            style={{ borderRight: '1px solid #262626', borderBottom: '1px solid #262626', borderTop: '1px solid #262626' }}
          />

          <BentoStatCard
            title="Certifications"
            description="AWS Certified Machine Learning & Cloud Technical Essentials"
            value={3}
            badgeUrl={CERTIFICATIONS[0].badgeUrl || null}
            style={{ borderTop: '1px solid #262626', borderBottom: '1px solid #262626' }}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="bento-right">
          <div className="bento-about">
            <span className="im-label font-italic" style={{ color: "#B22222", fontSize: "84px" }}>I’m</span>
            <div className="im-name font-hero" style={{ fontSize: 'clamp(32px, 8vw, 120px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, color: '#262626' }}>
               JUNAID
            </div>

            <p className="about-text" style={{ textAlign: "justify" }}>
               {PROFILE.bio} I blend creative problem-solving with functional AI development to craft systems that are intelligent and user-focused.
            </p>
          </div>

          <div className="bento-socials">
            {SOCIAL_LINKS.map((link) => (
              <a key={link.name} href={link.href} className="social-row-new">
                <div className="social-3d">
                  <div className="social-cube">
                    <div className="social-face social-front social-row">
                      <div className="social-row-left">
                        <div className="social-icon">
                          {link.icon}
                        </div>
                        <div className="social-name">
                          {link.name}
                        </div>
                      </div>
                      <div className="social-row-right">
                        <img src="/arrow.svg" alt="Arrow" width={"35px"} height={"35px"} />
                      </div>
                    </div>

                    <div className="social-face social-bottom social-row">
                      <div className="social-row-left">
                        <div className="social-icon white-icon">
                          {WHITE_SOCIAL_LINKS.find(l => l.name === link.name)?.icon}
                        </div>
                        <div className="social-name white-text">
                          {link.name}
                        </div>
                      </div>
                      <div className="social-row-right rotate-icon">
                        <img src="/white-arrow.svg" alt="Arrow" width="35" height="35" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}