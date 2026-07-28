import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Display. Personality comes from optical width and size, not weight.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

// Body.
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

// Utility face: labels, years, stats, code.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohan Ruttala — Full-stack engineer",
  description:
    "Full-stack engineer in Visakhapatnam, India. React, Next.js, TypeScript, Node.js and Python — plus bespoke luxury jewelry storefronts.",
  keywords: [
    "Mohan Ruttala",
    "Full Stack Developer",
    "Visakhapatnam",
    "React Developer",
    "Next.js",
    "Software Engineer",
    "Web Applications",
  ],
  authors: [{ name: "Mohan Ruttala" }],
  icons: {
    icon: [
      { url: "/myprofile.jpg", type: "image/jpeg" },
      { url: "/icon.jpg", type: "image/jpeg" },
    ],
    shortcut: "/myprofile.jpg",
    apple: "/myprofile.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0c0e",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrumentSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-ink-0 text-text-mid">{children}</body>
    </html>
  );
}
