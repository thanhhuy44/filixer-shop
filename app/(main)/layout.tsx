import "@/styles/tailwind.css";
import "swiper/css";

import type { Metadata } from "next";
import * as React from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

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
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
