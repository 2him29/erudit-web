import type { Metadata } from "next";
import { Newsreader, DM_Mono, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
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
      className={`${newsreader.variable} ${dmMono.variable} ${hanken.variable}`}
    >
      <body className="bg-cream text-olive antialiased overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
