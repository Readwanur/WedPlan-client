"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { ArrowRight, Search, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  RAW_SERVICES_DATABASE,
  SERVICE_CATEGORIES,
  WHY_CHOOSE_BENEFITS,
  TESTIMONIALS,
  type WeddingCategoryName,
  type WeddingServiceRecord,
} from "@/components/home/home-data";
import { SectionHeader } from "@/components/home/SectionHeader";
import { ServiceCard } from "@/components/home/ServiceCard";
import { CategoryCard } from "@/components/home/CategoryCard";
import { ServiceDetailModal } from "@/components/home/ServiceDetailModal";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeServiceModal, setActiveServiceModal] =
    useState<WeddingServiceRecord | null>(null);

  // Display only approved and active services from the database
  const approvedAndActiveServices = useMemo(() => {
    return RAW_SERVICES_DATABASE.filter(
      (service) => service.status === "approved" && service.isActive === true
    );
  }, []);

  // Filter approved & active services by category and search query
  const filteredServices = useMemo(() => {
    return approvedAndActiveServices.filter((service) => {
      const matchesCategory =
        selectedCategory === "All" || service.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.vendor.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [approvedAndActiveServices, selectedCategory, searchQuery]);

  const handleSelectCategory = (categoryName: WeddingCategoryName) => {
    setSelectedCategory(categoryName);
    const section = document.getElementById("featured-services");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const heroSheetServices = approvedAndActiveServices.slice(0, 3);
  const heroSheetTotal = heroSheetServices.reduce((sum, s) => sum + s.price, 0);
  const leadCategories = SERVICE_CATEGORIES.slice(0, 2);
  const compactCategories = SERVICE_CATEGORIES.slice(2);
  const leadTestimonial = TESTIMONIALS[0];
  const secondaryTestimonials = TESTIMONIALS.slice(1);

  return (
    <div className="min-h-screen bg-[#E5E8CF] text-[#3A3029]">
      {/* =====================================================================
          1. BANNER SECTION
          Asymmetric split: Left headline & actions, Right wedding scene +
          real coded Wedding Celebration Sheet preview
      ====================================================================== */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headline, Subhead, Two Actions */}
            <div className="lg:col-span-5 space-y-6">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-normal tracking-[-0.03em] text-[#3A3029] leading-[1.06]">
                Compare itemized wedding packages and book verified vendors
              </h1>

              <p className="text-lg text-[#5C5046] leading-[28px] max-w-[36rem]">
                Venues, photography, stage florals, Shahi catering, bridal
                makeup, and custom couture in Dhaka—with upfront package rates
                for every event.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  nativeButton={false}
                  render={<a href="#featured-services" />}
                  className="btn-primary h-11 rounded-lg px-5 text-sm font-medium gap-2"
                >
                  <span>Explore wedding services</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </Button>

                <Button
                  nativeButton={false}
                  render={<a href="#service-categories" />}
                  className="btn-secondary h-11 rounded-lg px-5 text-sm font-medium"
                >
                  Browse categories
                </Button>
              </div>
            </div>

            {/* Right Column: Wedding Photograph + Coded Product Moment (Celebration Sheet) */}
            <div className="lg:col-span-7">
              <div className="surface-card rounded-2xl p-4 space-y-4">
                {/* Wedding-Themed Photograph */}
                <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-lg bg-[#EBE0D0]">
                  <Image
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85"
                    alt="Outdoor floral wedding arch and garden reception setup in Dhaka"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                </div>

                {/* Product Preview Moment: Itemized Wedding Celebration Sheet */}
                <div className="surface-raised rounded-lg p-4 space-y-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 pb-2 border-b border-[#3A3029]/10">
                    <div>
                      <p className="text-sm font-medium text-[#3A3029]">
                        3-day wedding itinerary estimate
                      </p>
                      <p className="text-xs text-[#7A6E63]">
                        Holud, Nikah & Reception · Gulshan, Dhaka
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#7A6E63] mr-2">
                        Package total
                      </span>
                      <span className="font-mono text-base font-medium tabular-nums text-[#3A3029]">
                        ${heroSheetTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="divide-y divide-[#3A3029]/10">
                    {heroSheetServices.map((srv) => (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => setActiveServiceModal(srv)}
                        className="w-full py-2 flex items-center justify-between gap-4 text-left hover:bg-[#F4E7D8]/70 px-2 -mx-2 rounded-md transition-colors duration-150 cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#344E41] shrink-0" />
                          <span className="text-sm text-[#3A3029] truncate">
                            {srv.name}
                          </span>
                          <span className="hidden sm:inline text-xs text-[#7A6E63] shrink-0">
                            · {srv.vendor.name}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-[#5C5046] tabular-nums shrink-0">
                          ${srv.price.toLocaleString()}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. DYNAMIC SECTION 1: FEATURED WEDDING SERVICES
          Shows 6 approved and active services from the database.
          Card Data: Service Image, Service Name, Category, Price, Location,
          Vendor Information, and View Details Button.
      ====================================================================== */}
      <section
        id="featured-services"
        className="py-16 lg:py-20 border-t border-[#3A3029]/10"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            title="Featured wedding services"
            description="Approved and active packages with itemized deliverables and direct vendor availability."
          />

          {/* Filter Bar: Equal 36px Row Height & 8px Gap */}
          <div className="mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className={`h-9 rounded-lg px-3.5 text-xs font-medium cursor-pointer ${
                  selectedCategory === "All" ? "btn-green" : "btn-secondary"
                }`}
              >
                All{" "}
                <span className="font-mono tabular-nums ml-1">
                  {approvedAndActiveServices.length}
                </span>
              </Button>
              {SERVICE_CATEGORIES.map((cat) => (
                <Button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`h-9 rounded-lg px-3.5 text-xs font-medium cursor-pointer ${
                    selectedCategory === cat.name
                      ? "btn-primary"
                      : "btn-secondary"
                  }`}
                >
                  {cat.name}
                </Button>
              ))}
            </div>

            <div className="surface-card flex items-center gap-2 rounded-lg px-3 h-9 min-w-0 sm:min-w-[220px]">
              <Search
                className="w-4 h-4 text-[#7A6E63] shrink-0"
                strokeWidth={1.5}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                aria-label="Search wedding services"
                className="w-full bg-transparent text-sm text-[#3A3029] placeholder:text-[#7A6E63] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="text-[#7A6E63] hover:text-[#3A3029]"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              )}
            </div>
          </div>

          {/* Services Grid */}
          {filteredServices.length === 0 ? (
            <Card className="surface-card rounded-2xl p-8 text-center max-w-md mx-auto ring-0">
              <CardContent className="space-y-3 p-0">
                <h3 className="text-base font-medium text-[#3A3029]">
                  No matching services
                </h3>
                <p className="text-sm text-[#5C5046]">
                  No approved packages match your current filter.
                </p>
                <Button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="btn-primary h-9 rounded-lg px-4 text-xs font-medium cursor-pointer"
                >
                  Reset filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onViewDetails={setActiveServiceModal}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          3. DYNAMIC SECTION 2: WEDDING SERVICE CATEGORIES
          Varied Grid Rhythm: 2 wide lead categories above 4 compact categories
      ====================================================================== */}
      <section
        id="service-categories"
        className="py-16 lg:py-20 border-t border-[#3A3029]/10"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            title="Wedding service categories"
            description="Select a category to filter packages for your ceremony and reception."
            action={
              selectedCategory !== "All" ? (
                <Button
                  type="button"
                  onClick={() => setSelectedCategory("All")}
                  className="btn-secondary h-9 rounded-lg px-3.5 text-xs font-medium gap-2 cursor-pointer"
                >
                  <span>Clear filter: {selectedCategory}</span>
                  <X className="w-4 h-4 text-[#7A6E63]" strokeWidth={1.5} />
                </Button>
              ) : undefined
            }
          />

          <div className="space-y-6">
            {/* Row 1: 2 Wide Lead Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {leadCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  featured
                  isSelected={selectedCategory === category.name}
                  onSelectCategory={handleSelectCategory}
                />
              ))}
            </div>

            {/* Row 2: 4 Compact Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {compactCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  isSelected={selectedCategory === category.name}
                  onSelectCategory={handleSelectCategory}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. ADDITIONAL REQUIRED SECTION: WHY CHOOSE WEDPLAN?
          Asymmetric editorial ledger: Dark green summary + 2x2 hairline grid
      ====================================================================== */}
      <section
        id="why-wedplan"
        className="py-16 lg:py-20 border-t border-[#3A3029]/10"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Column: Dark Green Summary Panel */}
            <div className="lg:col-span-5 rounded-2xl bg-[#344E41] p-6 sm:p-8 text-[#F4E7D8] flex flex-col justify-between gap-8">
              <div className="space-y-4">
                <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-[-0.02em] leading-[1.15] text-[#F4E7D8]">
                  Why choose WedPlan
                </h2>

                <p className="text-sm sm:text-base text-[#E5E8CF]/85 leading-relaxed">
                  Every vendor on WedPlan is audited for past events, business
                  registration, and active availability before their packages go
                  live.
                </p>

                <div className="pt-2 space-y-2.5 text-sm text-[#F4E7D8]/90">
                  <div className="flex items-center gap-2.5">
                    <Check
                      className="w-4 h-4 text-[#E5E8CF] shrink-0"
                      strokeWidth={1.5}
                    />
                    <span>Only approved and active vendors listed</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check
                      className="w-4 h-4 text-[#E5E8CF] shrink-0"
                      strokeWidth={1.5}
                    />
                    <span>Upfront package rates and clear deliverables</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check
                      className="w-4 h-4 text-[#E5E8CF] shrink-0"
                      strokeWidth={1.5}
                    />
                    <span>Reviews tied to completed wedding bookings</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <Button
                  nativeButton={false}
                  render={<a href="#featured-services" />}
                  className="btn-primary h-10 rounded-lg px-4 text-sm font-medium"
                >
                  Explore wedding services
                </Button>
              </div>
            </div>

            {/* Right Column: Clean 2x2 Hairline Ledger without decorative icon boxes */}
            <div className="lg:col-span-7 surface-card rounded-2xl grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#3A3029]/10 overflow-hidden">
              <div className="divide-y divide-[#3A3029]/10 flex flex-col">
                {WHY_CHOOSE_BENEFITS.slice(0, 2).map((benefit, idx) => (
                  <div
                    key={benefit.id}
                    className="p-6 flex-1 flex flex-col justify-between gap-4"
                  >
                    <span className="font-mono text-xs text-[#7A6E63] tabular-nums">
                      0{idx + 1}
                    </span>
                    <div className="space-y-1.5">
                      <h3 className="text-base font-medium text-[#3A3029]">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-[#5C5046] leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="divide-y divide-[#3A3029]/10 flex flex-col">
                {WHY_CHOOSE_BENEFITS.slice(2, 4).map((benefit, idx) => (
                  <div
                    key={benefit.id}
                    className="p-6 flex-1 flex flex-col justify-between gap-4"
                  >
                    <span className="font-mono text-xs text-[#7A6E63] tabular-nums">
                      0{idx + 3}
                    </span>
                    <div className="space-y-1.5">
                      <h3 className="text-base font-medium text-[#3A3029]">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-[#5C5046] leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. ADDITIONAL REQUIRED SECTION: CUSTOMER TESTIMONIALS
          Varied Grid Rhythm: 1 wide lead couple story + 2 stacked reviews
      ====================================================================== */}
      <section
        id="testimonials"
        className="py-16 lg:py-20 border-t border-[#3A3029]/10"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            title="Customer testimonials"
            description="Notes from couples who booked their venues, catering, and photography through WedPlan."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Lead Couple Story (6 cols) */}
            <Card className="lg:col-span-6 surface-card rounded-2xl p-6 flex flex-col justify-between gap-6 ring-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 text-xs text-[#7A6E63]">
                  <span>{leadTestimonial.weddingDate}</span>
                  <span className="font-mono tabular-nums">
                    {leadTestimonial.rating.toFixed(1)} / 5.0
                  </span>
                </div>

                <p className="text-lg text-[#3A3029] leading-relaxed">
                  &ldquo;{leadTestimonial.quote}&rdquo;
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#3A3029]/10">
                <div className="flex items-center gap-3">
                  <Avatar size="default">
                    <AvatarImage
                      src={leadTestimonial.avatar}
                      alt={leadTestimonial.couple}
                    />
                    <AvatarFallback>
                      {leadTestimonial.couple.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-sm font-medium text-[#3A3029]">
                      {leadTestimonial.couple}
                    </h3>
                    <p className="text-xs text-[#7A6E63]">
                      Booked 3 packages via WedPlan
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {leadTestimonial.bookedCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleSelectCategory(cat)}
                      className="surface-raised rounded-md px-2.5 py-1 text-xs text-[#5C5046] hover:text-[#3A3029] transition-colors duration-150 cursor-pointer"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Stacked Couple Reviews (6 cols) */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {secondaryTestimonials.map((item) => (
                <Card
                  key={item.id}
                  className="surface-card rounded-2xl p-6 flex-1 flex flex-col justify-between gap-4 ring-0"
                >
                  <p className="text-sm text-[#3A3029] leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  <div className="pt-3 border-t border-[#3A3029]/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar size="sm">
                        <AvatarImage src={item.avatar} alt={item.couple} />
                        <AvatarFallback>
                          {item.couple.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-sm font-medium text-[#3A3029]">
                          {item.couple}
                        </h3>
                        <p className="text-xs text-[#7A6E63]">
                          {item.weddingDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {item.bookedCategories.slice(0, 2).map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => handleSelectCategory(cat)}
                          className="surface-raised rounded-md px-2 py-1 text-xs text-[#5C5046] hover:text-[#3A3029] transition-colors duration-150 cursor-pointer"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. SERVICE DETAILS DIALOG MODAL (ShadCN Dialog)
      ====================================================================== */}
      <ServiceDetailModal
        service={activeServiceModal}
        onClose={() => setActiveServiceModal(null)}
      />
    </div>
  );
}
