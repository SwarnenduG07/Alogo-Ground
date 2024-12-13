import { Providers } from "@/components/problemsubmitbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Algo-Prep",
  description: "Practice Your Dsa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>
          {children}
        </Providers>
        </body>
    </html>
  );
}
