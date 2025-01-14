import "@/styles/tailwind.css";
import "swiper/css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import * as React from "react";

import AuthProvider from "@/components/AuthProvide";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Filixer Shop",
  description:
    "Filixer Shop is your ultimate destination for unique and stylish finds, crafted to bring joy and inspiration to your everyday moments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen ${inter.className}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
