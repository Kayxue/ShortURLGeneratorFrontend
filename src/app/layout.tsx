import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ShortURL Generator",
  description: "A ShortURL Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 添加導航欄 */}
        <nav className="bg-blue-600 text-white p-4">
          <ul className="flex space-x-4 ms-auto">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/analytics" className="hover:underline">
                Analytics
              </Link>
            </li>
            <li>
              <a href="https://1drv.ms/p/c/838befa8c41b5c8d/EbfsoqIYviBGh2v93_eafmUBXbIbpQ3pEhV2rFsL9uqt9g?e=zZtP95" className="hover:underline">
                Slides
              </a>
            </li>
          </ul>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
