"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { signIn, signUp } from "@/lib/auth-client";
import { ArrowLeft, Camera, Eye, EyeOff, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState<string>("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await signUp.email({
        name,
        email,
        password,
        image: image || undefined,
        callbackURL: "/",
      });
      if (error) {
        // setError(error.message || "Failed to create account");
        toast.add({
          title: `${error.message}`,
          description: "Failed to create account",
          type: "error",
        });
        return;
      }
      toast.add({
        title: `Welcome to the WedPlan family, ${data?.user.name}`,
        description: "Your account has been created successfully.",
        type: "success",
      });
      router.push("/");
      console.log("Sign up:", { name, email, image, data });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err: unknown) {
      toast.add({
        title: "Sign up failed",
        description:
          err instanceof Error ? err.message : "Failed to sign up with Google",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#E5E8CF] text-[#3A3029] flex flex-col items-center justify-center px-4 py-4 sm:py-6">
      <div className="w-full max-w-sm space-y-2.5">
        {/* Top Back to Home Button & Logo Row */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="h-8 px-2.5 inline-flex items-center gap-1.5 rounded-lg text-xs font-medium text-[#5C5046] hover:text-[#3A3029] hover:bg-[#F4E7D8]/60 transition-colors duration-150"
          >
            <ArrowLeft
              className="w-3.5 h-3.5 text-[#7A6E63]"
              strokeWidth={1.5}
            />
            <span>Home</span>
          </Link>

          <Link href="/" className="inline-flex items-center">
            <Image
              src="/WedPlan_logo.png"
              alt="WedPlan"
              width={160}
              height={50}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Compact Auth Card */}
        <div className="surface-card rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm">
          <div className="space-y-0.5 text-center">
            <h1 className="font-serif text-xl sm:text-2xl font-normal tracking-[-0.02em] text-[#3A3029]">
              Create an account
            </h1>
            <p className="text-xs text-[#5C5046]">
              Sign up to shortlist and book wedding services
            </p>
          </div>

          <Button
            type="button"
            onClick={handleGoogleSignUp}
            className="btn-secondary w-full h-8.5 rounded-lg text-xs font-medium gap-2 cursor-pointer"
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

          <div className="flex items-center gap-2.5">
            <div className="h-px flex-1 bg-[#3A3029]/10" />
            <span className="text-[11px] text-[#7A6E63]">or</span>
            <div className="h-px flex-1 bg-[#3A3029]/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Profile Picture Upload & Name */}
            <div className="flex items-center gap-3 pb-1">
              <label
                htmlFor="signup-avatar"
                className="relative flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full surface-raised border border-dashed border-[#7A6E63]/40 hover:border-[#B45764] transition-colors overflow-hidden group"
                title="Upload profile photo"
              >
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Camera
                    className="w-4 h-4 text-[#7A6E63] group-hover:text-[#B45764] transition-colors"
                    strokeWidth={1.5}
                  />
                )}
                <input
                  id="signup-avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </label>

              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="signup-name"
                    className="block text-xs font-medium text-[#3A3029]"
                  >
                    Full name
                  </label>
                  {image && (
                    <button
                      type="button"
                      onClick={() => setImage("")}
                      className="text-[10px] text-[#7A6E63] hover:text-[#DC2626] inline-flex items-center gap-0.5"
                    >
                      <X className="w-2.5 h-2.5" /> Remove photo
                    </button>
                  )}
                </div>
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="surface-raised w-full h-8.5 rounded-lg px-3 text-sm text-[#3A3029] placeholder:text-[#7A6E63] focus:outline-none focus:border-[#B45764]"
                />
              </div>
            </div>

            <div className="space-y-0.5">
              <label
                htmlFor="signup-email"
                className="block text-xs font-medium text-[#3A3029]"
              >
                Email
              </label>
              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="surface-raised w-full h-8.5 rounded-lg px-3 text-sm text-[#3A3029] placeholder:text-[#7A6E63] focus:outline-none focus:border-[#B45764]"
              />
            </div>

            <div className="space-y-0.5">
              <label
                htmlFor="signup-password"
                className="block text-xs font-medium text-[#3A3029]"
              >
                Password
              </label>
              <div className="surface-raised flex items-center rounded-lg px-3 h-8.5 focus-within:border-[#B45764]">
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
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

            <div className="space-y-0.5">
              <label
                htmlFor="signup-confirm-password"
                className="block text-xs font-medium text-[#3A3029]"
              >
                Confirm password
              </label>
              <div className="surface-raised flex items-center rounded-lg px-3 h-8.5 focus-within:border-[#B45764]">
                <input
                  id="signup-confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full bg-transparent text-sm text-[#3A3029] placeholder:text-[#7A6E63] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="ml-2 text-[#7A6E63] hover:text-[#3A3029] cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                  ) : (
                    <Eye className="w-4 h-4" strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-[#DC2626] font-medium pt-0.5">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full h-8.5 rounded-lg text-xs font-medium cursor-pointer mt-1"
            >
              {isSubmitting ? "Creating account..." : "Sign up"}
            </Button>
          </form>

          <p className="text-xs text-[#5C5046] text-center pt-0.5">
            Already have an account?{" "}
            <Link
              href="/signIn"
              className="font-medium text-[#3A3029] underline underline-offset-4 hover:text-[#B45764]"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
