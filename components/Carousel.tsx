'use client';

import { useState, useRef, useEffect } from 'react';
import { PROJECTS } from '@/lib/data';

function useVisibleCount() {
    const [count, setCount] = useState(3);
    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            if (w <= 480) setCount(1);
            else if (w <= 768) setCount(1);
            else if (w <= 1024) setCount(2);
            else setCount(3);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);
    return count;
}

export default function WorkCarousel() {
    const [index, setIndex] = useState(0);
    const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
    const startX = useRef(0);
    const isDragging = useRef(false);
    const autoSlideRef = useRef<NodeJS.Timeout | null>(null);
    const visibleCount = useVisibleCount();

    const data = PROJECTS.map(p => ({
        title: p.name,
        image: p.imageUrl || `/projects/${p.id}.jpg`, // Use custom image if available, else fallback
        date: 'Project', // You can add date to lib/data.ts if needed
        tag: p.tech.join(', '),
        desc: p.description,
    }));

    const maxIndex = Math.max(0, data.length - visibleCount);

    // Auto slide — restart when visibleCount changes
    useEffect(() => {
        autoSlideRef.current = setInterval(() => {
            setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }, 3000);
        return () => {
            if (autoSlideRef.current) clearInterval(autoSlideRef.current);
        };
    }, [maxIndex]);

    // Clamp index when window resizes
    useEffect(() => {
        setIndex((prev) => Math.min(prev, maxIndex));
    }, [maxIndex]);

    const handleStart = (e: any) => {
        if (autoSlideRef.current) clearInterval(autoSlideRef.current);
        isDragging.current = true;
        startX.current = e.touches ? e.touches[0].clientX : e.clientX;
    };

    const handleEnd = (e: any) => {
        if (!isDragging.current) return;
        const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const diff = startX.current - endX;
        if (diff > 40) setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        else if (diff < -40) setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
        isDragging.current = false;
    };

    const slideWidthPct = 100 / visibleCount;
    const carouselHeight = visibleCount === 1 ? 380 : 420;
    const imageHeight = visibleCount === 1 ? 260 : 240;

    return (
        <div className="carousel-wrapper" style={{
            width: '100%',
            maxWidth: '1608px',
            margin: '0 auto',
            userSelect: 'none',
        }}>
            <div
                style={{
                    borderTop: '1px solid #262626',
                    borderBottom: '1px solid #262626',
                    borderLeft: '1px solid #262626',
                    overflow: 'hidden',
                    position: 'relative',
                    height: `${carouselHeight}px`,
                }}
                onMouseDown={handleStart}
                onMouseUp={handleEnd}
                onTouchStart={handleStart}
                onTouchEnd={handleEnd}
            >
                <div
                    style={{
                        display: 'flex',
                        transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                        transform: `translateX(-${index * slideWidthPct}%)`,
                    }}
                >
                    {data.map((item, i) => {
                        const isFlipped = flippedIndex === i;
                        const shortText = item.desc.length > 210
                            ? item.desc.slice(0, 210) + '...'
                            : item.desc;

                        return (
                            <div
                                key={i}
                                className="carousel-slide"
                                style={{
                                    minWidth: `${slideWidthPct}%`,
                                    borderRight: '1px solid #262626',
                                    height: `${carouselHeight}px`,
                                    flexShrink: 0,
                                }}
                            >
                                <div style={{ width: '100%', height: '100%', padding: '18px' }}>
                                    <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
                                        <div className="flip-inner">
                                            {/* FRONT */}
                                            <div className="flip-front">
                                                <div className="carousel-image bg-neutral-100 flex items-center justify-center" style={{
                                                        width: '100%',
                                                        height: `${imageHeight}px`,
                                                        marginBottom: '12px',
                                                        border: '1px solid #eee',
                                                        overflow: 'hidden',
                                                        position: 'relative'
                                                    }}>
                                                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    fontSize: '12px',
                                                    marginBottom: '12px',
                                                }}>
                                                    <span>{item.date}</span>
                                                    <span style={{ maxWidth: '55%', textAlign: 'right' }}>{item.tag}</span>
                                                </div>
                                                <p style={{ fontSize: '12px', color: '#8a8a8a', lineHeight: '1.6', textAlign: 'justify' }}>
                                                    {shortText}
                                                    {item.desc.length > 120 && (
                                                        <span
                                                            className="view-more"
                                                            onClick={() => setFlippedIndex(i)}
                                                        > view more</span>
                                                    )}
                                                </p>
                                            </div>

                                            {/* BACK */}
                                            <div className="flip-back">
                                                <h3 className="card-title">{item.title}</h3>
                                                <p className="full-desc" style={{ fontSize: '12px', textAlign: 'justify' }}>{item.desc}</p>
                                                <button
                                                    className="back-btn"
                                                    onClick={() => setFlippedIndex(null)}
                                                >
                                                    Back
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Dot indicators */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        style={{
                            width: i === index ? '24px' : '8px',
                            height: '8px',
                            borderRadius: '999px',
                            background: i === index ? '#262626' : '#c0c0c0',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            padding: 0,
                        }}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
