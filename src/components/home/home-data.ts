import {
  Camera,
  Building2,
  Flower2,
  UtensilsCrossed,
  Palette,
  Shirt,
  ShieldCheck,
  Wallet,
  Headphones,
  Clock,
  type LucideIcon,
} from "lucide-react";

export type WeddingCategoryName =
  | "Photography & Videography"
  | "Wedding Venues"
  | "Decoration & Florist"
  | "Catering Services"
  | "Makeup & Styling"
  | "Wedding Fashion";

export interface WeddingServiceRecord {
  id: string;
  name: string;
  category: WeddingCategoryName;
  price: number;
  priceUnit: string;
  location: string;
  image: string;
  status: "approved" | "pending" | "rejected";
  isActive: boolean;
  shortSummary: string;
  highlights: string[];
  vendor: {
    name: string;
    role: string;
    avatar: string;
    rating: number;
    reviewsCount: number;
    verified: boolean;
    experienceYears: number;
    phone: string;
  };
}

export interface CategoryConfig {
  id: string;
  name: WeddingCategoryName;
  description: string;
  startingPrice: string;
  vendorCount: number;
  icon: LucideIcon;
  image: string;
}

export interface BenefitItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  couple: string;
  weddingDate: string;
  bookedCategories: WeddingCategoryName[];
  quote: string;
  rating: number;
  avatar: string;
}

/**
 * Dummy database records including 6 approved & active services
 * plus pending/inactive records to enforce "Display only approved and active services".
 */
export const RAW_SERVICES_DATABASE: WeddingServiceRecord[] = [
  {
    id: "srv-101",
    name: "Greenhouse Lawn & Banquet Hall",
    category: "Wedding Venues",
    price: 4500,
    priceUnit: "Full Day Rental",
    location: "Gulshan, Dhaka",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
    status: "approved",
    isActive: true,
    shortSummary:
      "Indoor hall and outdoor lawn accommodating up to 650 guests with dedicated bridal dressing rooms and parking.",
    highlights: [
      "Up to 650 banquet guests",
      "Bridal & groom dressing suites",
      "Outdoor lawn + indoor dining hall",
      "Full generator backup & parking",
    ],
    vendor: {
      name: "Emerald Hospitality",
      role: "Venue Partner",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80",
      rating: 4.9,
      reviewsCount: 184,
      verified: true,
      experienceYears: 12,
      phone: "+8801711223344",
    },
  },
  {
    id: "srv-102",
    name: "Complete Wedding Photography & Cinematography",
    category: "Photography & Videography",
    price: 1850,
    priceUnit: "3-Event Package",
    location: "Banani, Dhaka",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
    status: "approved",
    isActive: true,
    shortSummary:
      "Full coverage for Holud, Wedding, and Reception with two senior photographers, cinematography team, and printed photo albums.",
    highlights: [
      "2 Lead Photographers + 2 Cinematographers",
      "Full-length film & 5-minute highlight trailer",
      "80-page printed photo album",
      "All edited photos via online gallery",
    ],
    vendor: {
      name: "Frame & Focus Studio",
      role: "Photography Team",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80",
      rating: 4.9,
      reviewsCount: 242,
      verified: true,
      experienceYears: 9,
      phone: "+8801819556677",
    },
  },
  {
    id: "srv-103",
    name: "Fresh Floral Stage & Hall Decoration",
    category: "Decoration & Florist",
    price: 2400,
    priceUnit: "Stage + Entrance + Dining",
    location: "Dhanmondi, Dhaka",
    image:
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=80",
    status: "approved",
    isActive: true,
    shortSummary:
      "Custom wedding stage backdrop, fresh flower entrance gate, table centerpieces, and warm ambient stage lighting.",
    highlights: [
      "Fresh roses, orchids, and seasonal florals",
      "Custom stage & photo booth setup",
      "Entrance archway & walkway lighting",
      "Guest table floral centerpieces",
    ],
    vendor: {
      name: "Sadia Floral Design",
      role: "Event Decorator",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80",
      rating: 4.8,
      reviewsCount: 159,
      verified: true,
      experienceYears: 8,
      phone: "+8801713889900",
    },
  },
  {
    id: "srv-104",
    name: "Traditional Shahi Wedding Catering",
    category: "Catering Services",
    price: 2800,
    priceUnit: "300 Guests Full Menu",
    location: "Uttara, Dhaka",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=80",
    status: "approved",
    isActive: true,
    shortSummary:
      "Basmati Kacchi Biryani, chicken roast, beef rezala, borhani, and traditional desserts with full crockery and waitstaff.",
    highlights: [
      "Basmati Kacchi Biryani & Chicken Roast",
      "Beef Rezala, Jali Kebab & Borhani",
      "Firni, Jorda & live coffee station",
      "All cutlery, crockery & trained waiters",
    ],
    vendor: {
      name: "Nawab Catering Service",
      role: "Wedding Caterer",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
      rating: 4.9,
      reviewsCount: 310,
      verified: true,
      experienceYears: 18,
      phone: "+8801911334455",
    },
  },
  {
    id: "srv-105",
    name: "Bridal Makeup & Hair Styling Package",
    category: "Makeup & Styling",
    price: 950,
    priceUnit: "Holud + Wedding + Reception",
    location: "Baridhara, Dhaka",
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1000&q=80",
    status: "approved",
    isActive: true,
    shortSummary:
      "Complete bridal makeover, hair styling, saree/lehenga draping, and jewelry setting for all three wedding events.",
    highlights: [
      "HD long-wear bridal makeup",
      "Custom hairstyle & floral hair accessories",
      "Complete outfit & veil draping",
      "Pre-event trial consultation included",
    ],
    vendor: {
      name: "Zara Bridal Studio",
      role: "Bridal Makeup Artist",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80",
      rating: 4.9,
      reviewsCount: 276,
      verified: true,
      experienceYears: 10,
      phone: "+8801715667788",
    },
  },
  {
    id: "srv-106",
    name: "Handwoven Bridal Lehenga & Groom Sherwani",
    category: "Wedding Fashion",
    price: 3200,
    priceUnit: "Couple Outfit Set",
    location: "Gulshan, Dhaka",
    image:
      "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=1000&q=80",
    status: "approved",
    isActive: true,
    shortSummary:
      "Made-to-measure bridal lehenga in pure Katan silk with zardozi embroidery and a coordinated groom sherwani set.",
    highlights: [
      "Custom-fitted bridal lehenga & dupatta",
      "Matching groom sherwani, pagri & shawl",
      "3 fitting sessions at our Gulshan studio",
      "Alterations and pressing before delivery",
    ],
    vendor: {
      name: "House of Meher",
      role: "Bridal Wear Designer",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&q=80",
      rating: 4.8,
      reviewsCount: 138,
      verified: true,
      experienceYears: 15,
      phone: "+8801611778899",
    },
  },
  // Non-approved / inactive records to ensure filtering logic only renders approved & active services
  {
    id: "srv-998-pending",
    name: "Unverified Budget Hall (Pending Review)",
    category: "Wedding Venues",
    price: 1200,
    priceUnit: "Per Event",
    location: "Mirpur, Dhaka",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
    status: "pending",
    isActive: true,
    shortSummary: "Pending admin approval.",
    highlights: [],
    vendor: {
      name: "Pending Vendor",
      role: "Applicant",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80",
      rating: 4.0,
      reviewsCount: 2,
      verified: false,
      experienceYears: 1,
      phone: "",
    },
  },
  {
    id: "srv-999-inactive",
    name: "Archived Seasonal Florist (Inactive)",
    category: "Decoration & Florist",
    price: 900,
    priceUnit: "Per Event",
    location: "Sylhet",
    image:
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80",
    status: "approved",
    isActive: false,
    shortSummary: "Currently inactive listing.",
    highlights: [],
    vendor: {
      name: "Archived Vendor",
      role: "Florist",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80",
      rating: 4.5,
      reviewsCount: 10,
      verified: true,
      experienceYears: 3,
      phone: "",
    },
  },
];

export const SERVICE_CATEGORIES: CategoryConfig[] = [
  {
    id: "cat-photo",
    name: "Photography & Videography",
    description:
      "Event photographers and cinematographers for Holud, Wedding, and Reception coverage.",
    startingPrice: "From $1,200",
    vendorCount: 68,
    icon: Camera,
    image:
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "cat-venues",
    name: "Wedding Venues",
    description:
      "Convention halls, garden lawns, resorts, and hotel ballrooms with guest parking.",
    startingPrice: "From $2,500",
    vendorCount: 45,
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "cat-decor",
    name: "Decoration & Florist",
    description:
      "Stage design, fresh floral entry gates, table centerpieces, and event lighting.",
    startingPrice: "From $1,100",
    vendorCount: 54,
    icon: Flower2,
    image:
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "cat-catering",
    name: "Catering Services",
    description:
      "Full wedding banquets, Kacchi biryani chefs, live food stations, and waitstaff.",
    startingPrice: "From $1,800",
    vendorCount: 62,
    icon: UtensilsCrossed,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "cat-makeup",
    name: "Makeup & Styling",
    description:
      "Bridal makeup artists, hair stylists, and saree or lehenga draping professionals.",
    startingPrice: "From $550",
    vendorCount: 81,
    icon: Palette,
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "cat-fashion",
    name: "Wedding Fashion",
    description:
      "Bridal lehengas, Katan sarees, groom sherwanis, and custom wedding tailoring.",
    startingPrice: "From $1,500",
    vendorCount: 49,
    icon: Shirt,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80",
  },
];

export const WHY_CHOOSE_BENEFITS: BenefitItem[] = [
  {
    id: "vetted",
    icon: ShieldCheck,
    title: "Verified & Approved Vendors",
    description:
      "Every vendor is reviewed for past work, business credentials, and active availability before being listed.",
  },
  {
    id: "pricing",
    icon: Wallet,
    title: "Clear Package Pricing",
    description:
      "See exact package rates and inclusions upfront so you can compare services within your budget.",
  },
  {
    id: "concierge",
    icon: Headphones,
    title: "Direct Vendor Coordination",
    description:
      "Check date availability and connect directly with venue managers, photographers, and decorators.",
  },
  {
    id: "workflow",
    icon: Clock,
    title: "All Wedding Services in One Place",
    description:
      "Shortlist venues, catering, decor, photography, makeup, and outfits without juggling dozens of tabs.",
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    couple: "Farhan & Tasnim",
    weddingDate: "October 2026 • Dhaka",
    bookedCategories: [
      "Wedding Venues",
      "Photography & Videography",
      "Decoration & Florist",
    ],
    quote:
      "Having clear package prices upfront saved us weeks of phone calls. We booked our venue in Gulshan along with our photography and stage decor team in just a few days.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "test-2",
    couple: "Rafsan & Nabila",
    weddingDate: "September 2026 • Dhaka",
    bookedCategories: [
      "Catering Services",
      "Makeup & Styling",
      "Wedding Fashion",
    ],
    quote:
      "Nawab Catering handled our 400-guest reception smoothly and the food was praised by everyone. Booking verified vendors gave both of our families real peace of mind.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "test-3",
    couple: "Zayan & Mehnaz",
    weddingDate: "August 2026 • Chittagong",
    bookedCategories: [
      "Photography & Videography",
      "Wedding Venues",
      "Wedding Fashion",
    ],
    quote:
      "We were organizing our wedding while living abroad. Being able to filter approved vendors by category and see real portfolio details made planning from a distance simple.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80",
  },
];
