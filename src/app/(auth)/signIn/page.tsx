"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { signIn } from "@/lib/auth-client";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Ready for better-auth integration:
      // await signIn.email({ email, password });
      const { data, error } = await signIn.email({
        email: email, // required, The email address of the user.
        password: password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
        rememberMe: false, // If false, the user will be signed out when the browser is closed. (optional) (default: true)
      });
      if (error) {
        toast.add({
          title: `SignIn failed`,
          description: `${error.message}`,
          type: "error",
        });
        return;
      }
      console.log(data, error);
      if (data?.user) {
        toast.add({
          title: `Welcome back, ${data.user.name}!`,
          description: "Signed in successfullly.",
          type: "success",
        });
        router.push("/");
      }
      console.log("Sign in:", { email, password });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err: unknown) {
      toast.add({
        title: "Sign in failed",
        description:
          err instanceof Error ? err.message : "Failed to sign in with Google",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#E5E8CF] text-[#3A3029] flex flex-col items-center justify-center px-4 py-12 relative">
      <div className="w-full max-w-sm space-y-6">
        {/* Top Back to Home Button */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="h-9 px-3 inline-flex items-center gap-2 rounded-lg text-xs font-medium text-[#5C5046] hover:text-[#3A3029] hover:bg-[#F4E7D8]/60 transition-colors duration-150"
          >
            <ArrowLeft className="w-4 h-4 text-[#7A6E63]" strokeWidth={1.5} />
            <span>Home</span>
          </Link>
        </div>

        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/WedPlan_logo.png"
              alt="WedPlan"
              width={200}
              height={66}
              priority
              className="h-14 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Simple Auth Card */}
        <div className="surface-card rounded-2xl p-6 sm:p-7 space-y-5">
          <div className="space-y-1 text-center">
            <h1 className="font-serif text-2xl font-normal tracking-[-0.02em] text-[#3A3029]">
              Sign in
            </h1>
            <p className="text-xs text-[#5C5046]">
              Enter your details to continue to WedPlan
            </p>
          </div>

          <Button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn-secondary w-full h-10 rounded-lg text-sm font-medium gap-2.5 cursor-pointer"
          >
            <svg
              className="w-4 h-4 shrink-0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Continue with Google</span>
          </Button>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-[#3A3029]/10" />
            <span className="text-xs text-[#7A6E63]">or</span>
            <div className="h-px flex-1 bg-[#3A3029]/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="signin-email"
                className="block text-xs font-medium text-[#3A3029]"
              >
                Email
              </label>
              <input
                id="signin-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="surface-raised w-full h-10 rounded-lg px-3 text-sm text-[#3A3029] placeholder:text-[#7A6E63] focus:outline-none focus:border-[#B45764]"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="signin-password"
                className="block text-xs font-medium text-[#3A3029]"
              >
                Password
              </label>
              <div className="surface-raised flex items-center rounded-lg px-3 h-10 focus-within:border-[#B45764]">
                <input
                  id="signin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-transparent text-sm text-[#3A3029] placeholder:text-[#7A6E63] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="ml-2 text-[#7A6E63] hover:text-[#3A3029] cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                  ) : (
                    <Eye className="w-4 h-4" strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full h-10 rounded-lg text-sm font-medium cursor-pointer"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="text-xs text-[#5C5046] text-center pt-1">
            Don&apos;t have an account?{" "}
            <Link
              href="/signUp"
              className="font-medium text-[#3A3029] underline underline-offset-4 hover:text-[#B45764]"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
