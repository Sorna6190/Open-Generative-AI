import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LUXE RUNWAY — Couture Evening Wear in 3D",
    template: "%s · LUXE RUNWAY",
  },
  description:
    "An immersive 3D runway showroom for luxury evening gowns, bridal couture and red-carpet fashion.",
  keywords: ["luxury", "evening dress", "couture", "3d showroom", "gown", "bridal"],
  openGraph: {
    title: "LUXE RUNWAY",
    description: "Step onto the digital runway. Couture evening wear, rendered in real time.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07060a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-noir text-ivory antialiased">
        <Navbar />
        <CartDrawer />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
