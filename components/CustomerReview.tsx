import { Star } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import React from "react";

export default function CustomerReview() {
  return (
    <div className="flex flex-col items-center gap-y-4 rounded-md bg-white p-4 text-center shadow-card">
      <Image
        loading="lazy"
        src="https://dosi-in.com/images/detailed/190/dosiin-bobui-angel-b-bobui-logo-teesbone-white-190166190166.jpg"
        alt="avatar"
        width={84}
        height={84}
        className="aspect-square h-20 w-20 rounded-full object-cover object-center"
      />
      <div className="flex items-center justify-center gap-x-1 text-2xl text-primary-100">
        <Star weight="fill" />
        <Star weight="fill" />
        <Star weight="fill" />
        <Star weight="fill" />
        <Star weight="fill" />
      </div>
      <p className="text-2xl font-medium">
        “I love it! No more air fresheners”
      </p>
      <p className="text-lg text-gray-500">User Name</p>
    </div>
  );
}
