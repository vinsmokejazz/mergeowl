import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter', 
});

const instrument = Instrument_Serif({ 
  weight: "400", 
  style: ['normal', 'italic'],
  subsets: ["latin"],
  variable: '--font-instrument',
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
})

export const metadata: Metadata = {
  title: "MergeOwl — AI Code Reviews",
  description: "Automated AI code reviews for your GitHub PRs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${instrument.variable} ${jetbrains.variable} font-sans`}>{children}</body>
    </html>
  );
}