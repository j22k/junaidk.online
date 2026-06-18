import "./globals.css";
import localFont from 'next/font/local';
import { Plus_Jakarta_Sans } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700'],
});

const heroFont = localFont({
  src: './fonts/MyHeroFont.woff2',
  variable: '--font-hero',
});

const italicFont = localFont({
  src: './fonts/MySelfFont.woff2',
  variable: '--font-italic',
});

const statFont = localFont({
  src: './fonts/MyStatFont.woff2',
  variable: '--font-stat',
});

export const metadata = {
  title: "Muhammed Junaid | AI Engineer",
  description: "Portfolio of Muhammed Junaid, AI Engineer specializing in Computer Vision and LLMs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${heroFont.variable} ${italicFont.variable} ${statFont.variable}`}>
       <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}