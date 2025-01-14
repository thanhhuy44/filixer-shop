import { List } from "@phosphor-icons/react/dist/ssr";
import React from "react";

export default function MenuDropdown() {
  return (
    <div className="relative p-1">
      <button type="button">
        <List size={28} />
      </button>
    </div>
  );
}
