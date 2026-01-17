import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rare Developers | Developing Beyond Ordinary",
  description: "Premium software development studio crafting innovative digital solutions. We transform ideas into exceptional products with cutting-edge technology.",
  keywords: ["software development", "web development", "mobile apps", "enterprise solutions", "SafeShare"],
  authors: [{ name: "Rare Developers" }],
  openGraph: {
    title: "Rare Developers | Developing Beyond Ordinary",
    description: "Premium software development studio crafting innovative digital solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
