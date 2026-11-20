import React from "react";

interface SectionHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function SectionHeader({
  title,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div className="space-y-2 max-w-xl">
        <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-[-0.02em] text-[#3A3029] leading-[1.15]">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-[#5C5046] leading-relaxed">
          {description}
        </p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
