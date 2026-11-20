"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Check, Calendar, PhoneCall } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { WeddingServiceRecord } from "./home-data";

interface ServiceDetailModalProps {
  service: WeddingServiceRecord | null;
  onClose: () => void;
}

export function ServiceDetailModal({
  service,
  onClose,
}: ServiceDetailModalProps) {
  const [requestedId, setRequestedId] = useState<string | null>(null);

  if (!service) return null;

  const isRequested = requestedId === service.id;

  return (
    <Dialog open={Boolean(service)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="surface-floating sm:max-w-xl rounded-2xl p-5 overflow-hidden border border-[#3A3029]/10 gap-5">
        {/* Top Cover Image (nested radius = 16 - 8 = 8px) */}
        <div className="relative h-52 w-full overflow-hidden rounded-lg bg-[#EBE0D0]">
          <Image
            src={service.image}
            alt={service.name}
            fill
            sizes="(max-width: 768px) 100vw, 540px"
            className="object-cover"
          />
        </div>

        {/* Header & Price */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <DialogHeader className="gap-1">
            <div className="inline-flex items-center gap-2 text-xs text-[#7A6E63]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#344E41]" />
              <span>{service.category}</span>
            </div>
            <DialogTitle className="text-xl font-medium text-[#3A3029]">
              {service.name}
            </DialogTitle>
            <DialogDescription className="text-xs text-[#7A6E63] flex items-center gap-2">
              <MapPin
                className="w-4 h-4 text-[#7A6E63] shrink-0"
                strokeWidth={1.5}
              />
              <span>{service.location}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="text-right">
            <p className="font-mono text-xl font-medium tabular-nums text-[#3A3029]">
              ${service.price.toLocaleString()}
            </p>
            <p className="font-mono text-xs text-[#7A6E63] tabular-nums">
              {service.priceUnit}
            </p>
          </div>
        </div>

        {/* Summary & Inclusions */}
        <div className="space-y-4">
          <p className="text-sm text-[#5C5046] leading-relaxed">
            {service.shortSummary}
          </p>

          <div>
            <h4 className="text-xs font-medium text-[#7A6E63] mb-2">
              Package inclusions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.highlights.map((item) => (
                <div
                  key={item}
                  className="surface-raised rounded-lg px-3 py-2 flex items-center gap-2 text-xs text-[#3A3029]"
                >
                  <Check
                    className="w-4 h-4 text-[#5C5046] shrink-0"
                    strokeWidth={1.5}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vendor Information Bar */}
          <div className="surface-raised rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar size="default">
                <AvatarImage
                  src={service.vendor.avatar}
                  alt={service.vendor.name}
                />
                <AvatarFallback>
                  {service.vendor.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-[#3A3029]">
                  {service.vendor.name}
                </p>
                <p className="text-xs text-[#7A6E63]">
                  {service.vendor.role} · {service.vendor.experienceYears} years
                  active
                </p>
              </div>
            </div>

            <div className="font-mono text-xs text-[#5C5046] tabular-nums">
              {service.vendor.rating.toFixed(1)} rating ·{" "}
              {service.vendor.reviewsCount} reviews
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            <Button
              type="button"
              onClick={() => setRequestedId(service.id)}
              className="btn-primary flex-1 h-10 rounded-lg text-sm font-medium gap-2 cursor-pointer"
            >
              {isRequested ? (
                <>
                  <Check className="w-4 h-4" strokeWidth={1.5} />
                  <span>Availability request sent</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" strokeWidth={1.5} />
                  <span>Request date availability</span>
                </>
              )}
            </Button>

            <Button
              nativeButton={false}
              render={<a href={`tel:${service.vendor.phone}`} />}
              className="btn-green h-10 rounded-lg px-4 text-sm font-medium gap-2"
            >
              <PhoneCall className="w-4 h-4" strokeWidth={1.5} />
              <span>Call vendor</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
