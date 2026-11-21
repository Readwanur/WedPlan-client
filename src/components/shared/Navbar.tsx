"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  LayoutGrid,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Services", href: "/services" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.add({
        title: "Signed out",
        description: "You have been signed out successfully.",
        type: "success",
      });
      router.push("/");
    } catch (err: unknown) {
      toast.add({
        title: "Sign out failed",
        description: err instanceof Error ? err.message : "Failed to sign out.",
        type: "error",
      });
    }
  };

  const user = session?.user;
  const userRole = (user as { role?: string })?.role || "customer";
  const formattedRole =
    userRole.charAt(0).toUpperCase() + userRole.slice(1);
  const userInitials =
    user?.name
      ?.split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

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
            <Link
              key={link.name}
              href={link.href}
              className="h-9 px-3 inline-flex items-center rounded-lg text-sm font-normal text-[#5C5046] hover:text-[#3A3029] hover:bg-[#F4E7D8]/60 transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Area: Auth Buttons or Profile Dropdown */}
        <div className="hidden md:flex items-center gap-4">
          {isPending ? (
            <div className="h-9 w-32 rounded-full bg-[#EBE0D0] animate-pulse" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                className="inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1 rounded-full border border-[#3A3029]/15 bg-[#F4E7D8]/80 hover:bg-[#F4E7D8] text-left transition-all outline-hidden cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C76B78] shadow-xs"
                aria-label="User profile menu"
              >
                <Avatar size="sm" className="h-8 w-8 ring-1 ring-[#3A3029]/15 shrink-0">
                  <AvatarImage
                    src={user.image || ""}
                    alt={user.name || "User avatar"}
                  />
                  <AvatarFallback className="bg-[#344E41] text-[#F4E7D8] text-xs font-medium">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-sm font-semibold text-[#3A3029]">
                    {user.name}
                  </span>
                  <span className="text-xs text-[#5C5046] capitalize">
                    {formattedRole}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-60 min-w-60 bg-[#F4E7D8] border border-[#3A3029]/10 text-[#3A3029] p-1.5 rounded-2xl shadow-xl shadow-[#3A3029]/10"
              >
                {/* User Name, Email & Role Header */}
                <div className="px-3.5 pt-3 pb-2.5">
                  <p className="text-[15px] font-semibold text-[#3A3029] leading-tight">
                    {user.name}
                  </p>
                  <p className="text-xs text-[#5C5046] mt-0.5 truncate">
                    {user.email}
                  </p>
                  <div className="mt-2.5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#C76B78]/15 text-[#9E3E4D] border border-[#C76B78]/25">
                      {formattedRole}
                    </span>
                  </div>
                </div>

                <DropdownMenuSeparator className="bg-[#3A3029]/10 my-1" />

                {/* Dashboard & Profile Settings */}
                <div className="p-0.5 space-y-0.5">
                  <DropdownMenuItem className="p-0">
                    <Link
                      href="/dashboard"
                      className="flex w-full items-center gap-3 px-3 py-2 text-sm text-[#3A3029] hover:bg-[#EBE0D0] rounded-lg transition-colors cursor-pointer"
                    >
                      <LayoutGrid
                        className="w-4 h-4 text-[#C76B78]"
                        strokeWidth={1.75}
                      />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="p-0">
                    <Link
                      href="/settings/profile"
                      className="flex w-full items-center gap-3 px-3 py-2 text-sm text-[#3A3029] hover:bg-[#EBE0D0] rounded-lg transition-colors cursor-pointer"
                    >
                      <Settings
                        className="w-4 h-4 text-[#C76B78]"
                        strokeWidth={1.75}
                      />
                      <span>Profile Settings</span>
                    </Link>
                  </DropdownMenuItem>
                </div>

                <DropdownMenuSeparator className="bg-[#3A3029]/10 my-1" />

                {/* Logout */}
                <div className="p-0.5">
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 px-3 py-2 text-sm text-[#DC2626] hover:bg-[#DC2626]/10 rounded-lg transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-[#DC2626]" strokeWidth={1.75} />
                    <span>SignOut</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
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
            </>
          )}
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
          {/* User info if logged in */}
          {user && (
            <div className="flex items-center gap-3 pb-3 border-b border-[#3A3029]/10">
              <Avatar size="sm" className="h-9 w-9 ring-1 ring-[#3A3029]/15 shrink-0">
                <AvatarImage
                  src={user.image || ""}
                  alt={user.name || "User avatar"}
                />
                <AvatarFallback className="bg-[#344E41] text-[#F4E7D8] text-xs font-medium">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#3A3029] truncate">
                  {user.name}
                </p>
                <p className="text-xs text-[#5C5046] truncate">{user.email}</p>
                <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#C76B78]/15 text-[#9E3E4D] border border-[#C76B78]/25">
                  {formattedRole}
                </span>
              </div>
            </div>
          )}

          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="h-9 px-3 inline-flex items-center rounded-lg text-sm font-normal text-[#3A3029] hover:bg-[#EBE0D0] transition-colors duration-150"
              >
                {link.name}
              </Link>
            ))}

            {user && (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="h-9 px-3 inline-flex items-center gap-2.5 rounded-lg text-sm font-normal text-[#3A3029] hover:bg-[#EBE0D0] transition-colors duration-150"
                >
                  <LayoutGrid
                    className="w-4 h-4 text-[#C76B78]"
                    strokeWidth={1.75}
                  />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/settings/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="h-9 px-3 inline-flex items-center gap-2.5 rounded-lg text-sm font-normal text-[#3A3029] hover:bg-[#EBE0D0] transition-colors duration-150"
                >
                  <Settings
                    className="w-4 h-4 text-[#C76B78]"
                    strokeWidth={1.75}
                  />
                  <span>Profile Settings</span>
                </Link>
              </>
            )}
          </nav>

          <div className="pt-3 border-t border-[#3A3029]/10 flex items-center justify-between gap-4">
            {user ? (
              <Button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignOut();
                }}
                className="w-full h-9 rounded-lg text-sm font-medium bg-[#E11D48]/10 text-[#E11D48] hover:bg-[#E11D48]/20 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" strokeWidth={1.75} />
                <span>Logout</span>
              </Button>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
