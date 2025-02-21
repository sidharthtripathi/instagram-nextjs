import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
// import { Inter } from "next/font/google";
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Separator } from '@/components/ui/separator';

// const inter = Inter({ subsets: ["latin"] });

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
