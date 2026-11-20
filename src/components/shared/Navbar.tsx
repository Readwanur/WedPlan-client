"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Services", href: "#featured-services" },
  { name: "Categories", href: "#service-categories" },
  { name: "Why WedPlan", href: "#why-wedplan" },
  { name: "Testimonials", href: "#testimonials" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#E5E8CF]/95 backdrop-blur-md border-b border-[#3A3029]/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <Link
          href="/"
          className="inline-flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-[#C76B78] rounded-sm"
        >
          <Image
            src="/WedPlan_logo.png"
            alt="WedPlan"
            width={220}
            height={72}
            priority
            className="h-14 w-auto object-contain -ml-3"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-1"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="h-9 px-3 inline-flex items-center rounded-lg text-sm font-normal text-[#5C5046] hover:text-[#3A3029] hover:bg-[#F4E7D8]/60 transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Auth: Quiet Sign in link + one button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/signIn"
            className="h-9 px-2 inline-flex items-center text-sm font-medium text-[#5C5046] hover:text-[#3A3029] transition-colors duration-150"
          >
            Sign in
          </Link>
          <Button
            nativeButton={false}
            render={<Link href="/signUp" />}
            className="btn-primary h-9 rounded-lg px-4 text-sm font-medium"
          >
            Sign up
          </Button>
        </div>

        {/* Mobile Menu Trigger */}
        <Button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="btn-secondary md:hidden h-9 w-9 rounded-lg p-0"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <X className="w-4 h-4 text-[#3A3029]" strokeWidth={1.5} />
          ) : (
            <Menu className="w-4 h-4 text-[#3A3029]" strokeWidth={1.5} />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F4E7D8] border-b border-[#3A3029]/10 px-6 py-4 space-y-3">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="h-9 px-3 inline-flex items-center rounded-lg text-sm font-normal text-[#3A3029] hover:bg-[#EBE0D0] transition-colors duration-150"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#3A3029]/10 flex items-center justify-between gap-4">
            <Link
              href="/signIn"
              onClick={() => setMobileMenuOpen(false)}
              className="h-9 px-3 inline-flex items-center text-sm font-medium text-[#5C5046] hover:text-[#3A3029]"
            >
              Sign in
            </Link>
            <Button
              nativeButton={false}
              render={
                <Link
                  href="/signUp"
                  onClick={() => setMobileMenuOpen(false)}
                />
              }
              className="btn-primary h-9 rounded-lg px-4 text-sm font-medium"
            >
              Sign up
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
