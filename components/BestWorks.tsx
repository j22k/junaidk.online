'use client';

import WorkCarousel from "./Carousel";
import Link from 'next/link';

export default function BestWorks() {
    return (
        <div id="projects" aria-label="Projects" className="work-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingLeft: 'auto', paddingRight: 'auto', gap: '42px', maxWidth: '1440px', margin: '0 auto' }}>
            <div className='heading-container' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <div className="my-text font-italic" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1, textAlign: 'left', width: '100%', color: '#B22222', marginBottom: '12px' }}>
                    Best
                </div>

                <div className="tool-text font-hero" style={{ fontSize: 'clamp(48px, 8vw, 64px)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1, textTransform: 'uppercase', textAlign: 'left', width: '100%' }}>
                    PROJECTS
                </div>
            </div>

            <WorkCarousel />

            <div
                className="arrow-bottom"
                style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    border: '1px solid #262626', // Added border for visibility
                }}
                onMouseEnter={() => {
                    const ring = document.querySelector('.cursor-ring');
                    if (ring) ring.classList.add('hovering');
                }}
                onMouseLeave={() => {
                    const ring = document.querySelector('.cursor-ring');
                    if (ring) ring.classList.remove('hovering');
                }}
                onClick={() => {
                    const section = document.getElementById('toolkit');
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
            >
                <img
                    src="/arrowButton.svg"
                    alt="arrow-bottom"
                    style={{ width: '64px', height: '64px', transform: 'rotate(90deg)' }}
                />
            </div>
        </div>
    );
}   