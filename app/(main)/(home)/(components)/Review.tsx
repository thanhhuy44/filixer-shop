import React from "react";

import CustomerReview from "@/components/CustomerReview";

import Section from "./Section";

export default function Review() {
  return (
    <Section
      title="Testimonials"
      subtitle="Some quotes from our happy customers"
      className="bg-[#56B280]/10"
    >
      <div className="grid grid-cols-1 gap-x-6 md:grid-cols-3">
        <CustomerReview />
        <CustomerReview />
        <CustomerReview />
      </div>
    </Section>
  );
}
