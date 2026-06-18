'use client';

import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { PROFILE } from "@/lib/data";

// Scramble text effect
function useScramble(text: string, trigger: number) {
  const [display, setDisplay] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  useEffect(() => {
    let iteration = 0;
    let frame: number;

    const animate = () => {
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iteration) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration += 0.4;

      if (iteration < text.length) {
        frame = requestAnimationFrame(animate);
      } else {
        setDisplay(text);
      }
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, [trigger, text]);

  return display;
}

function scrambleLetter(el: any, original: string) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let iteration = 0;

  const interval = setInterval(() => {
    el.innerText = chars[Math.floor(Math.random() * chars.length)];

    if (iteration > 5) {
      el.innerText = original;
      clearInterval(interval);
    }

    iteration++;
  }, 30);
}

export default function HeroSection() {
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTrigger((prev) => prev + 1);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  const nameValue = PROFILE.name.split(" ")[1] || PROFILE.name.split(" ")[0]; // Get Junaid
  const name = useScramble(nameValue.toUpperCase(), trigger);

  return (
    <section id="hero" className="hero-section" aria-label="Hero">
      <Navbar />

      {/* Top info bar */}
      <div className="hero-top-bar">
        <div className="hero-top-left" style={{ animation: 'slideLeft 0.8s 1.5s cubic-bezier(0.4,0,0.2,1) both' }}>
          <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '2px' }}>AI Engineer</div>
          <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '2px' }}>AWS Certified</div>
        </div>
        <div className="hero-top-right" style={{ animation: 'slideRight 0.8s 1.5s cubic-bezier(0.4,0,0.2,1) both' }}>
          <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '2px' }}>B.Tech AI &amp; DS</div>
          <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '2px' }}>MES Engineering College</div>
          <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '2px' }}>Batch '25</div>
        </div>
      </div>

      {/* Name pushed to the bottom of the section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'flex-end',
          overflow: 'visible',
        }}
      >
        <div className="hero-big-name">

          {/* Image sits behind text via absolute positioning */}
          <img src="/hero.png" alt={PROFILE.name} className="hero-image" />

          {/* Scrambled name text */}
          <span
            className="font-hero"
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'block',
              animation: 'slideUp 1s 0.4s cubic-bezier(0.4,0,0.2,1) both',
              fontSize: 'clamp(48px, 28vw, 292px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            {name.split('').map((char, i) => (
              <span
                key={i}
                className="letter"
                onMouseEnter={(e: any) => scrambleLetter(e.target, char)}
              >
                {char}
              </span>
            ))}
          </span>

        </div>
      </div>
    </section>
  );
}
