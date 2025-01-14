import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

import MenuDropdown from "./MenuDropdown";
// import UserDropDown from "./UserDropDown";

const CartDropdown = dynamic(() => import("./CartDropdown"), {
  ssr: false,
});

const navs: Array<{
  link: string;
  text: string;
}> = [
  {
    link: "/discovery",
    text: "Discovery",
  },
  {
    link: "/about",
    text: "About",
  },
  {
    link: "/contact-us",
    text: "Contact us",
  },
];

export default function Header() {
  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-primary-100/20 bg-white/30 backdrop-blur">
      <div className="container grid grid-cols-3 items-center py-5 md:grid-cols-5">
        <div className="block md:hidden">
          <MenuDropdown />
        </div>
        <div className="flex items-center justify-center md:justify-start">
          <Link href="/">Filixer Shop</Link>
        </div>
        <div className="col-span-3 hidden items-center justify-center md:flex">
          {navs.map((nav, index) => (
            <Link
              className="px-4 py-1 text-center text-base font-medium"
              href={nav.link}
              key={index}
            >
              {nav.text}
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-end gap-x-3">
          {/* <UserDropDown /> */}
          <CartDropdown />
        </div>
      </div>
    </header>
  );
}
