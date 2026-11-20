"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const footerCategories = [
  "Photography & Videography",
  "Wedding Venues",
  "Decoration & Florist",
  "Catering Services",
  "Makeup & Styling",
  "Wedding Fashion",
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient
            id="igGrad"
            cx="0.2"
            cy="1"
            r="1"
            gradientTransform="matrix(0 -1.6 1.6 0 -.2 1)"
          >
            <stop offset="0%" stopColor="#FFD521" />
            <stop offset="10%" stopColor="#F50000" />
            <stop offset="50%" stopColor="#B900B4" />
            <stop offset="100%" stopColor="#4000C8" />
          </radialGradient>
        </defs>
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="5.5"
          fill="url(#igGrad)"
        />
        <circle cx="12" cy="12" r="4.2" stroke="#FFFFFF" strokeWidth="1.8" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" fill="#1877F2" />
        <path
          d="M13.5 12.5h2l.3-2.5h-2.3V8.5c0-.7.2-1.2 1.2-1.2h1.2V5.1c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.2-3.2 3.3V10H8.8v2.5h2V18.5h2.7v-6z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com",
    icon: (
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" fill="#E60023" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 5.5c-3.6 0-6.5 2.6-6.5 6 0 1.9 1 3.5 2.5 4.3.2.1.4 0 .4-.2.1-.3.2-1 .3-1.3 0-.2 0-.2-.2-.4-.6-.7-.9-1.6-.9-2.6 0-2.3 1.8-4.3 4.6-4.3 2.5 0 3.9 1.5 3.9 3.6 0 2.7-1.2 5-3 5-.9 0-1.7-.8-1.5-1.7.3-1.1.8-2.3.8-3.1 0-.7-.4-1.3-1.2-1.3-.9 0-1.7 1-1.7 2.3 0 .8.3 1.4.3 1.4s-1 4.2-1.2 5c-.3 1.3-.1 3-.1 3.1 0 .1.1.2.2.1.2-.2 2.1-2.6 2.4-3.8l.6-2.5c.3.6 1.3 1.1 2.3 1.1 3 0 5.1-2.8 5.1-6.5 0-2.8-2.4-5.5-6.2-5.5z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
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

            {/* Social Links: Instagram, Facebook, Pinterest */}
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="surface-card h-9 w-9 rounded-lg inline-flex items-center justify-center text-[#5C5046] hover:text-[#3A3029] hover:bg-[#EBE0D0] transition-colors duration-150"
                >
                  {social.icon}
                </a>
              ))}
            </div>
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
            <h4 className="text-sm font-medium text-[#3A3029] mb-3">Contact</h4>
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
                  href="mailto:rrumon710@gmail.com"
                  className="hover:text-[#3A3029] transition-colors duration-150"
                >
                  rrumon710@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6E63]">
          <p className="tabular-nums">© {new Date().getFullYear()} WedPlan</p>
          <p>Crafted for couples & verified wedding artisans worldwide.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
