import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: {
    default: "Apex Velocity | Hypercars Engineered for Eternity",
    template: "%s | Apex Velocity",
  },
  description:
    "Apex Velocity crafts the world's most extraordinary hypercars. Experience the pinnacle of automotive engineering, luxury, and performance.",
  keywords: [
    "hypercar",
    "supercar",
    "luxury automotive",
    "performance car",
    "electric hypercar",
    "Apex Velocity",
  ],
  authors: [{ name: "Apex Velocity" }],
  creator: "Apex Velocity",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://apexvelocity.com",
    siteName: "Apex Velocity",
    title: "Apex Velocity | Hypercars Engineered for Eternity",
    description:
      "Experience the pinnacle of automotive engineering, luxury, and performance.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Apex Velocity Hypercar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Velocity | Hypercars Engineered for Eternity",
    description:
      "Experience the pinnacle of automotive engineering, luxury, and performance.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full antialiased" style={{ background: "#02040A", color: "#F5F5F5" }}>
        <QueryProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <Navigation />
            <main>{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
