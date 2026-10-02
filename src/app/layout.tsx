import type { Metadata } from 'next';
import { Kantumruy_Pro, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeLanguageProvider } from '@/context/ThemeLanguageContext';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const kantumruy = Kantumruy_Pro({
  subsets: ['khmer', 'latin'],
  variable: '--font-kantumruy',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://heangchhengkhoem.com'),
  title: 'Heang Chhengkhoem — Digital & Tools AI Hub | iOS 27 Ecosystem',
  description: 'The official all-in-one digital ecosystem by Heang Chhengkhoem. 24+ free interactive AI tools, game top-up, Telegram services, TikTok growth, and instant ABA KHQR payment in Cambodia.',
  keywords: [
    'Heang Chhengkhoem',
    'imsela',
    'Khmer AI Tools',
    'Game Topup Cambodia',
    'Telegram Stars Cambodia',
    'Free Fire Topup KHQR',
    'Bakong KHQR',
    'Web Developer Cambodia',
    'iOS 27 modern web',
  ],
  authors: [{ name: 'Heang Chhengkhoem' }],
  openGraph: {
    title: 'Heang Chhengkhoem — Digital & Tools AI Hub',
    description: 'All-in-one digital tools, game top-up, Telegram services & AI suite by Heang Chhengkhoem.',
    type: 'website',
    locale: 'km_KH',
    alternateLocale: 'en_US',
    images: ['/avatar.jpg'],
  },
  icons: {
    icon: '/avatar.jpg',
    apple: '/avatar.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="km" className={`${jakarta.variable} ${kantumruy.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans antialiased selection:bg-cyan-500 selection:text-black">
        <ThemeLanguageProvider>
          {children}
        </ThemeLanguageProvider>
      </body>
    </html>
  );
}
