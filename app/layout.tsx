import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'AI-Civ TestUniverse - Constitutional AI Testing Framework',
  description: 'Universal Software Testing with Evidence, Governance, and Confidence. AI-powered test orchestration that wraps your favorite tools, eliminates noise, and proves every finding.',
  keywords: ['testing', 'AI', 'security', 'automation', 'QA', 'DevOps', 'CI/CD'],
  authors: [{ name: 'AI-Civ Team' }],
  openGraph: {
    title: 'AI-Civ TestUniverse',
    description: 'Constitutional AI Multi-Agent Testing Framework',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Civ TestUniverse',
    description: 'Constitutional AI Multi-Agent Testing Framework',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
