import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond, Lora, Playfair_Display } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: ["400"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-script",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
  display: "swap",
});

const lora = Lora({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hanna & David 2026.05.08.",
  description: "Vida Hanna és Simo Dávid esküvői meghívója - 2026. május 8. Panorama Boutique Hotel, Sepsiszentgyörgy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body
        className={`${greatVibes.variable} ${cormorant.variable} ${lora.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
