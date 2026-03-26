import { PROFILE } from '@/lib/data';

export default function SeoJsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    jobTitle: PROFILE.role,
    url: typeof PROFILE.github === 'string' ? PROFILE.github : undefined,
    email: PROFILE.email,
    sameAs: [PROFILE.linkedin, PROFILE.github],
    address: {
      "@type": "PostalAddress",
      addressLocality: PROFILE.location,
    },
  } as const;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
    />
  );
}
