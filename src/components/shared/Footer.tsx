"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const footerCategories = [
  "Photography & Videography",
  "Wedding Venues",
  "Decoration & Florist",
  "Catering Services",
  "Makeup & Styling",
  "Wedding Fashion",
];

const Footer = () => {
  return (
    <footer className="mt-20 pt-16 pb-12 border-t border-[#3A3029]/10 bg-[#E5E8CF] text-[#3A3029]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-[#3A3029]/10">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-3">
            <Link
              href="/"
              className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-[#C76B78] rounded-sm"
            >
              <Image
                src="/WedPlan_logo.png"
                alt="WedPlan"
                width={200}
                height={66}
                className="h-12 w-auto object-contain -ml-3"
              />
            </Link>

            <p className="text-sm leading-relaxed text-[#5C5046] max-w-sm">
              Compare itemized wedding packages and book verified venues,
              photographers, decorators, caterers, makeup artists, and bridal
              couturiers in Bangladesh.
            </p>
          </div>

          {/* Column 2: Service Categories */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-medium text-[#3A3029] mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-sm">
              {footerCategories.map((category) => (
                <li key={category}>
                  <a
                    href="#service-categories"
                    className="text-[#5C5046] hover:text-[#3A3029] transition-colors duration-150"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-medium text-[#3A3029] mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#featured-services"
                  className="text-[#5C5046] hover:text-[#3A3029] transition-colors duration-150"
                >
                  Featured services
                </a>
              </li>
              <li>
                <a
                  href="#service-categories"
                  className="text-[#5C5046] hover:text-[#3A3029] transition-colors duration-150"
                >
                  All categories
                </a>
              </li>
              <li>
                <a
                  href="#why-wedplan"
                  className="text-[#5C5046] hover:text-[#3A3029] transition-colors duration-150"
                >
                  Why WedPlan
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-[#5C5046] hover:text-[#3A3029] transition-colors duration-150"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <Link
                  href="/signIn"
                  className="text-[#5C5046] hover:text-[#3A3029] transition-colors duration-150"
                >
                  Sign in
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-medium text-[#3A3029] mb-3">
              Contact
            </h4>
            <div className="space-y-2 text-sm text-[#5C5046]">
              <div className="flex items-start gap-2">
                <MapPin
                  className="w-4 h-4 text-[#7A6E63] shrink-0 mt-0.5"
                  strokeWidth={1.5}
                />
                <span>Suite 402, Gulshan Avenue, Dhaka</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone
                  className="w-4 h-4 text-[#7A6E63] shrink-0"
                  strokeWidth={1.5}
                />
                <a
                  href="tel:+8801410054022"
                  className="font-mono text-xs tabular-nums hover:text-[#3A3029] transition-colors duration-150"
                >
                  +880 1410054022
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail
                  className="w-4 h-4 text-[#7A6E63] shrink-0"
                  strokeWidth={1.5}
                />
                <a
                  href="mailto:wedding@wedplan.com"
                  className="hover:text-[#3A3029] transition-colors duration-150"
                >
                  wedding@wedplan.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6E63]">
          <p className="tabular-nums">
            © {new Date().getFullYear()} WedPlan
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/signIn"
              className="hover:text-[#3A3029] transition-colors duration-150"
            >
              Vendor portal
            </Link>
            <Link
              href="/signUp"
              className="hover:text-[#3A3029] transition-colors duration-150"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
