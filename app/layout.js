import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'leaflet/dist/leaflet.css';
import Header from "../components/Header";

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
