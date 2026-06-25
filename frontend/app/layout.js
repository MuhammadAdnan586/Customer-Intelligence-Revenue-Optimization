import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Customer Intelligence & Revenue Optimization System",
  description:
    "SQL-driven analytics dashboard built on the Olist Brazilian e-commerce dataset.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${inter.variable} ${mono.variable} font-body`}
      >
        {children}
      </body>
    </html>
  );
}
