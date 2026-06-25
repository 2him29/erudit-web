import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Érudit Connect Lounge | Alger",
  description:
    "Un havre de paix au cœur d'Alger. Espace pour savourer, connecter et créer. Coffee shop & lounge — Samedi à Jeudi, 8h–18h.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="bg-espresso text-cream antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
