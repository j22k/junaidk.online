import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Muhammed Junaid K — AI Engineer',
  description: 'AI Engineer | Computer Vision | AWS | LLMs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#F5F5F7] text-[#1D1D1F]">
        {children}
      </body>
    </html>
  );
}
