import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Product } from "@/types";
import { formatMoney } from "@/utils/helpers";

export default function ProductCard(data: Product) {
  return (
    <div className="block shadow-card">
      <Link
        href={`/product/${data.slug}`}
        className="block aspect-square w-full overflow-hidden"
      >
        <Image
          width={2000}
          height={2000}
          src={data.thumbnails[0].url}
          alt="product-image"
          className="size-full object-cover object-center duration-200 hover:scale-105 md:aspect-square md:object-center"
        />
      </Link>
      <div className="px-4 py-3">
        <Link href={`/product/${data.slug}`}>
          <h5 className="text-base font-medium leading-7 duration-150 hover:text-primary-100">
            {data.name}
          </h5>
        </Link>
        <div className="flex items-center justify-end">
          <p>
            <span className="text-sm text-gray-400 line-through">
              {formatMoney(data.originPrice)}
            </span>
            {"  "}
            <span className="text-xl font-medium text-primary-100">
              {formatMoney(data.price)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
