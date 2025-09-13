import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'leaflet/dist/leaflet.css';
import Header from "../components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tennis Connect México - Conecta con jugadores de tennis",
  description: "La plataforma líder para conectar jugadores de tennis en México. Encuentra compañeros, organiza partidos y mejora tu nivel.",
  keywords: "tennis mexico, jugadores tennis, canchas tennis, partidos tennis, comunidad tennis",
  authors: [{ name: "Tennis Connect México" }],
  robots: "index, follow",
  openGraph: {
    title: "Tennis Connect México - Conecta con jugadores de tennis",
    description: "La plataforma líder para conectar jugadores de tennis en México",
    type: "website",
    locale: "es_MX",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#16a34a',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Preload critical images for better LCP */}
        <link
          rel="preload"
          as="image"
          href="/tennis-court-from-above.jpg"
          type="image/jpeg"
          media="(min-width: 1024px)"
        />
        <link
          rel="preload"
          as="image"
          href="/tennis-court-racket.jpg"
          type="image/jpeg"
          media="(min-width: 768px) and (max-width: 1023px)"
        />
        <link
          rel="preload"
          as="image"
          href="/girl-playing-tennis.jpg"
          type="image/jpeg"
          media="(max-width: 767px)"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
