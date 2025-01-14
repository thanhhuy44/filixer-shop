import Image from "next/image";
import React from "react";

import Thumbnail from "@/assets/images/home/learn-more.png";
import Button from "@/components/Button";

import Section from "./Section";

export default function LearnMore() {
  return (
    <Section className="bg-[#F7F8FA]">
      <div className="grid grid-cols-1 items-center gap-x-8 md:grid-cols-2">
        <div className="flex flex-col gap-y-10">
          <div>
            <h2 className="text-[40px] font-semibold">
              Premium fabrics and timeless designs
            </h2>
            <p className="text-primary-100">
              Made for your comfort and everyday style
            </p>
          </div>
          <ul className="flex list-disc flex-col gap-y-2 pl-6">
            <li>
              <p>
                <strong>Eco-sustainable:</strong> Crafted with sustainable
                materials and mindful production practices
              </p>
            </li>
            <li>
              <p>
                <strong>Skin-friendly:</strong> 100% natural, gentle, and
                allergy-safe fabrics
              </p>
            </li>
            <li>
              <p>
                <strong>Handmade:</strong> Each piece is carefully crafted with
                attention to detail and love
              </p>
            </li>
            <li>
              <p>
                <strong>Durable quality:</strong> Designed to last, combining
                style and resilience
              </p>
            </li>
          </ul>
          <Button className="w-full md:w-fit">Learn more</Button>
        </div>
        <Image
          loading="lazy"
          src={Thumbnail}
          alt="Learn More"
          className="hidden h-auto w-full md:block"
        />
      </div>
    </Section>
  );
}
