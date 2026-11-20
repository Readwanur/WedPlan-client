"use client";

import React from "react";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { WeddingServiceRecord } from "./home-data";

interface ServiceCardProps {
  service: WeddingServiceRecord;
  onViewDetails: (service: WeddingServiceRecord) => void;
}

export function ServiceCard({ service, onViewDetails }: ServiceCardProps) {
  const vendorInitials = service.vendor.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  return (
    <Card className="surface-card rounded-2xl p-4 flex flex-col justify-between gap-4 ring-0">
      <div className="space-y-4">
        {/* 1. Service Image (inner radius = 16 - 8 = 8px) */}
        <div className="relative h-48 w-full overflow-hidden rounded-lg bg-[#EBE0D0]">
          <Image
            src={service.image}
            alt={service.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        {/* 2. Category, Price, Service Name & Location */}
        <CardContent className="p-0 space-y-2">
          <div className="flex items-baseline justify-between gap-2">
            <span className="inline-flex items-center gap-2 text-xs text-[#7A6E63]">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#344E41] shrink-0"
                aria-hidden="true"
              />
              <span>{service.category}</span>
            </span>
            <span className="font-mono text-base font-medium tabular-nums text-[#3A3029]">
              ${service.price.toLocaleString()}
            </span>
          </div>

          <h3 className="text-base font-medium text-[#3A3029] leading-snug line-clamp-1">
            {service.name}
          </h3>

          <div className="flex items-center justify-between gap-2 text-xs text-[#7A6E63]">
            <span className="inline-flex items-center gap-2 truncate">
              <MapPin
                className="w-4 h-4 text-[#7A6E63] shrink-0"
                strokeWidth={1.5}
              />
              <span className="truncate">{service.location}</span>
            </span>
            <span className="font-mono tabular-nums shrink-0">
              {service.priceUnit}
            </span>
          </div>

          <p className="text-sm text-[#5C5046] leading-relaxed line-clamp-2 pt-1">
            {service.shortSummary}
          </p>
        </CardContent>
      </div>

      {/* 3. Vendor Information & View Details Button */}
      <CardFooter className="p-0 pt-3 border-t border-[#3A3029]/10 flex flex-col items-stretch gap-3">
        <div className="surface-raised rounded-lg px-3 py-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <Avatar size="sm">
              <AvatarImage
                src={service.vendor.avatar}
                alt={service.vendor.name}
              />
              <AvatarFallback>{vendorInitials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-xs font-medium text-[#3A3029] truncate">
                {service.vendor.name}
              </p>
              <p className="text-xs text-[#7A6E63] truncate">
                {service.vendor.role}
              </p>
            </div>
          </div>

          <div className="shrink-0 font-mono text-xs text-[#5C5046] tabular-nums">
            {service.vendor.rating.toFixed(1)} · {service.vendor.reviewsCount}
          </div>
        </div>

        <Button
          type="button"
          onClick={() => onViewDetails(service)}
          className="btn-primary w-full h-9 rounded-lg text-sm font-medium gap-2 cursor-pointer"
        >
          <span>View details</span>
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </Button>
      </CardFooter>
    </Card>
  );
}
