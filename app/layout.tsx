import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import SeoJsonLd from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: 'Muhammed Junaid — AI Engineer',
  description: 'AI Engineer | Computer Vision | AWS | LLMs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-paper text-ink transition-colors duration-500">
        <SeoJsonLd />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
