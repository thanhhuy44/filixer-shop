import React from "react";

import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";

import Section from "./Section";

interface Props {
  data: Product[];
}

export default function Popular({ data }: Props) {
  return (
    <Section
      title="Popular"
      subtitle="Our top selling product that you may like"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((product, index) => (
          <ProductCard {...product} key={index} />
        ))}
      </div>
    </Section>
  );
}
