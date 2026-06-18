'use client';

import { PROFILE } from '@/lib/data';

export default function SocialLinks() {
    const links = [
        {
            name: 'LINKEDIN',
            url: PROFILE.linkedin,
        },
        {
            name: 'GITHUB',
            url: PROFILE.github,
        },
    ];

    return (
        <div style={styles.container}>
            {links.map((link) => (
                <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                    style={styles.link}
                >
                    {link.name}
                </a>
            ))}
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        gap: '48px',
        letterSpacing: '2px',
    },
    link: {
        fontSize: '12px',
        fontWeight: '500',
        color: '#333',
        cursor: 'pointer',
        paddingBottom: '4px',
        textDecoration: 'none',
        borderBottom: '1px solid transparent',
        transition: 'all 0.2s ease',
    },
};