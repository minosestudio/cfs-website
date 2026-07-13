import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "CFS — Global Furniture. Built with Control.",
  description:
    "CFS is a design-led global furniture manufacturer delivering luxury furniture with precision, control, and consistency — built for architects, designers, and high-end clients worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${playfair.variable} antialiased`}
    >
      <body>
        {children}

        {/* Floating WhatsApp button — fixed bottom-right on every page/section.
            z-30 keeps it below the mobile menu overlay (z-40) so it never blocks
            the nav; safe-area insets keep it clear of notches/home indicators. */}
        <a
          href="https://wa.me/8615627695973?text=Hi%20CFS%2C%20I%27d%20like%20to%20enquire%20about%20sourcing%20furniture."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with CFS on WhatsApp"
          className="group fixed bottom-5 right-5 md:bottom-8 md:right-8 z-30 flex h-[52px] w-[52px] md:h-14 md:w-14 items-center justify-center rounded-full text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)] ring-1 ring-black/5 transition-all duration-300 ease-out hover:scale-110 hover:shadow-[0_12px_32px_rgba(37,211,102,0.45)] active:scale-95"
          style={{
            backgroundColor: "#25D366",
            marginBottom: "env(safe-area-inset-bottom)",
            marginRight: "env(safe-area-inset-right)",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-7 w-7 md:h-8 md:w-8 transition-transform duration-300 group-hover:rotate-[6deg]"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24.044 12.045.044 5.463.044.083 5.443.08 12.026c0 2.096.546 4.142 1.588 5.945L0 24l6.335-1.652a11.882 11.882 0 005.71 1.447h.006c6.585 0 11.946-5.398 11.949-12.03a11.9 11.9 0 00-3.495-8.470" />
          </svg>
        </a>
      </body>
    </html>
  );
}
