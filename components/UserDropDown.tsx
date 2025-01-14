"use client";

import { User } from "@phosphor-icons/react/dist/ssr/User";
import { useClickAway } from "@uidotdev/usehooks";
import Link from "next/link";
import { useSession } from "next-auth/react";
import React, { LegacyRef, useState } from "react";

export default function UserDropDown() {
  const [open, setOpen] = useState<boolean>(false);
  const { data } = useSession();
  console.log("🚀 ~ UserDropDown ~ data:", data?.info);

  const ref = useClickAway(() => setOpen(false));

  return (
    <div ref={ref as LegacyRef<HTMLDivElement>} className="relative p-1">
      <button onClick={() => setOpen((prev) => !prev)} type="button">
        <User size={24} />
      </button>
      <div
        className={`absolute left-1/2 top-full z-10 mt-1 flex origin-top -translate-x-1/2 items-center rounded-md bg-white text-sm font-medium shadow-card duration-300 ${
          open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
      >
        <Link className="p-2 duration-200 hover:text-primary-100" href="/login">
          Login
        </Link>
        <span>/</span>
        <Link
          className="p-2 duration-200 hover:text-primary-100"
          href="/register"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
