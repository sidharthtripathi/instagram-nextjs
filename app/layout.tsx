import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
// import { Inter } from "next/font/google";
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Separator } from '@/components/ui/separator';
import Head from 'next/head';
export const metadata: Metadata = {
  title: 'Instagram',
  description: 'Instagram like app built using NextJS'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </Head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar />
          <Separator />
          {children}
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
