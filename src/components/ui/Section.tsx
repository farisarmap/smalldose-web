import type { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "div";
}

export function Section({ as = "section", className = "", ...props }: SectionProps) {
  const Tag = as;
  return <Tag className={`py-12 sm:py-16 lg:py-20 ${className}`.trim()} {...props} />;
}
