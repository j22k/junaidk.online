'use client';

import { useEffect, useState } from 'react';
import { SERVICES } from '@/lib/data';

const ITEMS = SERVICES;
const ITEM_HEIGHT = 24;

export default function ServiceList() {
    const [index, setIndex] = useState(0);
    const [enableTransition, setEnableTransition] = useState(true);

    const looped = [...ITEMS, ...ITEMS, ...ITEMS]; // triple for smoother animation

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => prev + 1);
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (index === ITEMS.length) {
            setTimeout(() => {
                setEnableTransition(false);
                setIndex(0);
            }, 600);

            setTimeout(() => {
                setEnableTransition(true);
            }, 620);
        }
    }, [index]);

    return (
        <div
            style={{
                height: `${ITEM_HEIGHT * 6}px`,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}
        >
            <div
                style={{
                    transform: `translateY(-${index * ITEM_HEIGHT}px)`,
                    transition: enableTransition
                        ? 'transform 0.6s ease'
                        : 'none',
                }}
            >
                {looped.map((item, i) => {
                    const isActive = i % ITEMS.length === index % ITEMS.length;

                    return (
                        <div
                            key={i}
                            style={{
                                height: `${ITEM_HEIGHT}px`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px',
                                fontWeight: isActive ? 600 : 400,
                                opacity: isActive ? 1 : 0.2,
                                transition: 'all 0.3s ease',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}
                        >
                            {item}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}