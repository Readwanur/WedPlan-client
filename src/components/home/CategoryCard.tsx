"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CategoryConfig, WeddingCategoryName } from "./home-data";

interface CategoryCardProps {
  category: CategoryConfig;
  isSelected: boolean;
  featured?: boolean;
  onSelectCategory: (name: WeddingCategoryName) => void;
}

export function CategoryCard({
  category,
  isSelected,
  featured = false,
  onSelectCategory,
}: CategoryCardProps) {
  return (
    <Card
      className={`surface-card rounded-2xl p-4 flex ${
        featured
          ? "flex-col sm:flex-row items-stretch gap-5"
          : "flex-col justify-between gap-4"
      } ring-0 ${isSelected ? "border-[#B45764]" : ""}`}
    >
      {/* Category Image */}
      <div
        className={`relative overflow-hidden rounded-lg bg-[#EBE0D0] shrink-0 ${
          featured ? "h-44 sm:h-auto sm:w-48" : "h-36 w-full"
        }`}
      >
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover"
        />
      </div>

      {/* Category Details & Action */}
      <div className="flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-base font-medium text-[#3A3029]">
              {category.name}
            </h3>
            <span className="font-mono text-xs text-[#7A6E63] tabular-nums shrink-0">
              {category.vendorCount} vendors
            </span>
          </div>
          <p className="text-sm text-[#5C5046] leading-relaxed">
            {category.description}
          </p>
        </div>

        <div className="pt-3 border-t border-[#3A3029]/10 flex items-center justify-between gap-2">
          <span className="font-mono text-xs text-[#5C5046] tabular-nums">
            {category.startingPrice}
          </span>
          <Button
            type="button"
            onClick={() => onSelectCategory(category.name)}
            className={`h-8 rounded-lg px-3 text-xs font-medium gap-2 cursor-pointer ${
              isSelected ? "btn-green" : "btn-secondary"
            }`}
          >
            <span>{isSelected ? "Selected" : "Explore"}</span>
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
