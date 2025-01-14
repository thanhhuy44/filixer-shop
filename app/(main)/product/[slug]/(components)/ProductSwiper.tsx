"use client";

import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Image from "next/image";
import React, { useState } from "react";
import Swiper from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperContainer, SwiperSlide } from "swiper/react";

import { MediaAsset } from "@/types";

export default function ProductSwiper({ images }: { images: MediaAsset[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper>();

  return (
    <div className="flex flex-col gap-y-8">
      <div>
        <SwiperContainer
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                loading="lazy"
                alt="product image"
                width={1000}
                height={1000}
                className="aspect-square h-auto w-full object-cover object-center"
                src={image.url}
              />
            </SwiperSlide>
          ))}
        </SwiperContainer>
      </div>
      <div>
        <SwiperContainer
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          slidesPerView={4}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                loading="lazy"
                alt="product image"
                width={1000}
                height={1000}
                className="aspect-square h-auto w-full object-cover object-center"
                src={image.url}
              />
            </SwiperSlide>
          ))}
        </SwiperContainer>
      </div>
    </div>
  );
}
