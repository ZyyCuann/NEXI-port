import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/lib/theme-provider';
import { DevicePreviewProvider } from '@/lib/device-preview-context';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NEXII PORT — Nusantara Export and Import Infrastructure',
  description:
    'NEXII PORT is a programmable trade assurance infrastructure designed to help SME exporters and international buyers transact with transparency, automation, and confidence through AI-assisted verification, tokenized escrow state, blockchain audit trail, and future CBDC compatibility.',
  keywords: [
    'NEXII PORT',
    'trade assurance',
    'SME export',
    'tokenized escrow',
    'blockchain audit',
    'CBDC',
    'digital trade',
    'Indonesia export',
  ],
  openGraph: {
    title: 'NEXII PORT — Reinventing Trade Trust',
    description:
      'Digital Trade Assurance & Programmable Settlement Infrastructure for SME exporters.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <DevicePreviewProvider>
            {children}
          </DevicePreviewProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
