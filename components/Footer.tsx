import Link from "next/link";
import React from "react";

const footernavs: Array<{
  title: string;
  childs: Array<{
    link: string;
    title: string;
  }>;
}> = [
  {
    title: "Discovery",
    childs: [
      {
        title: "New season",
        link: "#",
      },
      {
        title: "Most searched",
        link: "#",
      },
      {
        title: "Most selled",
        link: "#",
      },
    ],
  },
  {
    title: "About",
    childs: [
      {
        title: "Help",
        link: "#",
      },
      {
        title: "Shipping",
        link: "#",
      },
      {
        title: "Affiliate",
        link: "#",
      },
    ],
  },
  {
    title: "Info",
    childs: [
      {
        title: "Contact us",
        link: "#",
      },
      {
        title: "Privacy Policies",
        link: "#",
      },
      {
        title: "Terms & Conditions",
        link: "#",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#272727] py-14 text-white">
      <div className="container grid grid-cols-1 gap-8 border-t border-white py-6  lg:grid-cols-2">
        <div>
          <Link href="/" className="text-2xl font-bold">
            Shop Now
          </Link>
          <p className="mt-2">
            Your natural candle made for your home and for your wellness.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3">
          {footernavs.map((col, index) => (
            <div className="" key={index}>
              <h6 className="text-base text-primary-100">{col.title}</h6>
              <div className="mt-4 flex flex-col gap-y-2">
                {col.childs.map((child, child_index) => (
                  <Link
                    className="text-base font-medium"
                    key={child_index}
                    href={child.link}
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
