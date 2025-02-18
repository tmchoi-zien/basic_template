"use client";
import "@/css/globals.css";
import Provider from "@/components/Provider";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
