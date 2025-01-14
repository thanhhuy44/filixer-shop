import Image from "next/image";
import React from "react";

import BackgroundHero from "@/assets/images/home/background-hero.jpg";
import Button from "@/components/Button";

export default function Hero() {
  return (
    <section className="relative">
      <Image
        loading="lazy"
        width={0}
        height={0}
        src={BackgroundHero}
        alt="hero-background"
        className="h-[700px] w-full object-cover object-center"
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="flex w-full max-w-[730px] flex-col items-center justify-center gap-y-8 rounded bg-gray-100/80 p-6 backdrop-blur-sm md:p-12 lg:p-16 xl:p-20">
          <div className="text-center">
            <div className="text-[40px] font-medium">
              <h1>🙌</h1>
              <h1>Filixer Shop</h1>
            </div>
            <p className="text-lg">
              Filixer Shop is your ultimate destination for unique and stylish
              finds, crafted to bring joy and inspiration to your everyday
              moments.
            </p>
          </div>
          <Button>Discovery our products</Button>
        </div>
      </div>
    </section>
  );
}
