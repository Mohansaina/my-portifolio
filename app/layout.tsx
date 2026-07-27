import type { Metadata } from "next";
import { Kanit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Mohan Ruttala | Full Stack Engineer & Software Developer",
  description: "Full Stack Engineer based in Visakhapatnam, India. Specializing in React, Next.js, TypeScript, Node.js, Python, & AI-driven digital experiences.",
  keywords: ["Mohan Ruttala", "Full Stack Developer", "Visakhapatnam", "React Developer", "Next.js", "Software Engineer", "Web Applications"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${kanit.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
      data-theme="cyan"
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#07080c] text-on-surface selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
