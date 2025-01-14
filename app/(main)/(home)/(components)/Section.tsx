import React, { HTMLProps, ReactNode } from "react";

interface Props {
  title?: string;
  children?: ReactNode;
  subtitle?: string;
  className?: HTMLProps<HTMLElement>["className"];
}

export default function Section({
  children,
  title,
  subtitle,
  className,
}: Props) {
  return (
    <section className={`py-12 2xl:py-20 ${className}`}>
      <div className="container flex flex-col gap-y-8">
        {title ? (
          <div>
            {title ? (
              <h2 className="text-center text-2xl font-semibold md:text-3xl xl:text-4xl">
                {title}
              </h2>
            ) : null}
            {subtitle ? (
              <p className="mt-2 text-center text-lg text-gray-800">
                {subtitle}
              </p>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
