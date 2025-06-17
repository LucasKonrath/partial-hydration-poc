import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { headers } from 'next/headers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Optimize font loading
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap', // Optimize font loading
});

// Enable static generation for this layout
export const dynamic = 'force-static';

// Add cache control headers and metadata
export async function generateMetadata() {
  const headersList = headers();
  
  return {
    title: "Next.js App with Partial Hydration",
    description: "An optimized Next.js application using partial hydration and progressive enhancement",
    metadataBase: new URL('https://your-domain.com'),
    openGraph: {
      title: 'Next.js App with Partial Hydration',
      description: 'An optimized Next.js application using partial hydration and progressive enhancement',
      type: 'website',
    },
    other: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    }
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://jsonplaceholder.typicode.com" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
