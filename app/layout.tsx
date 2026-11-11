import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
const manrope = localFont({
  src: [
    {
      path: "../public/fonts/manrope-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/manrope-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-manrope",
});
import { Header, Footer } from "@/components/site";
export const metadata: Metadata = {
  title: {
    default: "K B Engineering | Engineering, Procurement & Fabrication",
    template: "%s | K B Engineering",
  },
  description:
    "Engineering, procurement and fabrication solutions for industrial equipment and process systems. Connect with K B Engineering in Ranipet, Tamil Nadu.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
