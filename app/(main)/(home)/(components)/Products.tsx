import React from "react";

import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";

import Section from "./Section";

interface Props {
  data: Product[];
}

export default function Products({ data }: Props) {
  return (
    <Section
      title="Products"
      subtitle="Order it for you or for your beloved ones "
    >
      {data?.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((product, index) => (
            <ProductCard {...product} key={index} />
          ))}
        </div>
      ) : null}
    </Section>
  );
}
