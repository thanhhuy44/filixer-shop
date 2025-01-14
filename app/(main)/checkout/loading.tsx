import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import * as React from "react";

function Page() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center">
      <CircleNotch
        className="size-8 animate-spin text-primary-100"
        weight="bold"
      />
    </main>
  );
}

export default Page;
