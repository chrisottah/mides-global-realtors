import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "Mides Global Realtors | Your Trusted Real Estate Partner in Lagos",
  description: "Find your dream home or investment property in Lekki, VI, Ikoyi, Ajah, and across Nigeria. Over 5 years of excellence in property sales and rentals.",
  keywords: "real estate lagos, property for sale lekki, rent apartment ajah, mides global realtors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}