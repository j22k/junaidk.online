'use client';

import { useEffect, useState, useRef } from 'react';
import { PROFILE } from '@/lib/data';

export default function Loader() {
  const nameValue = PROFILE.name.split(" ")[1] || PROFILE.name.split(" ")[0]; // Get Junaid
  const text = nameValue.toUpperCase();
  const [display, setDisplay] = useState(Array(text.length).fill(''));
  const [hidden, setHidden] = useState(false);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const revealLetter = () => {
      const currentIndex = currentIndexRef.current;

      if (currentIndex >= text.length) {
        setTimeout(() => setHidden(true), 500);
        return;
      }

      let iterations = 0;

      const interval = setInterval(() => {
        // 🔁 Scramble phase
        setDisplay((prev) => {
          const updated = [...prev];
          updated[currentIndex] =
            chars[Math.floor(Math.random() * chars.length)];
          return updated;
        });

        iterations++;

        if (iterations > 5) {
          clearInterval(interval);

          // ✅ FORCE LOCK correct letter
          setDisplay((prev) => {
            const updated = [...prev];
            updated[currentIndex] = text[currentIndex];
            return updated;
          });

          currentIndexRef.current += 1;

          // slight delay before next letter
          setTimeout(
            revealLetter,
            currentIndex === text.length - 2 ? 120 : 50
          );
        }
      }, 40);
    };

    revealLetter();
  }, [text]);

  return (
    <div className={`loader${hidden ? ' hidden' : ''}`} aria-hidden="true">
      <div
        className="loader-name font-hero"
        style={{
          fontSize: 'clamp(28px, 8vw, 84px)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          display: 'flex',
          gap: '8px',
        }}
      >
        {display.map((char, i) => (
          <span key={i}>{char}</span>
        ))}
      </div>
    </div>
  );
}