'use client';

interface MarqueeProps {
  items: { name: string; src: string }[];
  speed?: number;
  direction?: 'left' | 'right';
}

export default function Marquee({ items, speed = 20, direction = 'left' }: MarqueeProps) {
  // Duplicate twice to ensure seamless scrolling
  const duplicatedItems = [...items, ...items];

  return (
    <div className="border-y border-[#262626] py-4 bg-white/50 backdrop-blur-sm" style={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `${direction === 'left' ? 'scrollLeft' : 'scrollRight'} ${speed}s linear infinite`,
        }}
      >
        {duplicatedItems.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', margin: '0 32px' }}>
            <img src={item.src} alt={item.name} style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scrollRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
}