import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/tailwind.css";
import "swiper/css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login",
  description: "Login page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen w-screen items-center justify-center p-3">
          <div className="grid w-full max-w-4xl grid-cols-2 rounded-md border border-gray-100 bg-white p-8 shadow-card">
            {children}
            <div></div>
          </div>
        </main>
      </body>
    </html>
  );
}
