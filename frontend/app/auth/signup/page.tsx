"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // signup (backend)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/signup", form);
      router.push("/auth/signin");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl">
        <h2 className="text-xl font-semibold text-neutral-100">
          Create your account
        </h2>
        <p className="mt-1 text-sm text-neutral-400">Sign up to continue</p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {/* First name */}
          <Field label="First name">
            <Input
              name="firstName"
              placeholder="Tyler"
              value={form.firstName}
              onChange={handleChange}
              className="dark-input"
            />
          </Field>

          {/* Last name */}
          <Field label="Last name">
            <Input
              name="lastName"
              placeholder="Durden"
              value={form.lastName}
              onChange={handleChange}
              className="dark-input"
            />
          </Field>

          {/* Email */}
          <Field label="Email" className="sm:col-span-2">
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="dark-input"
            />
          </Field>

          {/* Password */}
          <Field label="Password" className="sm:col-span-2">
            <Input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="dark-input"
              autoComplete="current-password"
            />
          </Field>

          {/* Error */}
          {error && (
            <p className="sm:col-span-2 text-sm text-red-500">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="sm:col-span-2 h-11 rounded-md 
              bg-linear-to-br from-neutral-800 to-neutral-700 
              text-sm font-medium text-white 
              transition hover:opacity-90 
              disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign up →"}
          </button>

          {/* Divider */}
          <div className="sm:col-span-2 my-2 h-px bg-neutral-800" />

          {/* Social buttons */}
          <SocialButton
            icon={<IconBrandGithub />}
            label="Continue with GitHub"
            onClick={() => {
              alert("Social login coming soon 🚧");
            }}
          />

          <SocialButton
            icon={<IconBrandGoogle />}
            label="Continue with Google"
            onClick={() => {
              alert("Social login coming soon 🚧");
            }}
          />
        </form>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <Label className="text-sm text-neutral-300">{label}</Label>
      {children}
    </div>
  );
}

function SocialButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-10 w-full items-center gap-2 rounded-md 
        border border-neutral-700 bg-neutral-800 
        px-4 text-sm text-neutral-200 
        transition hover:bg-neutral-700"
    >
      {icon}
      {label}
    </button>
  );
}
