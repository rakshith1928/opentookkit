"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { FiSearch } from "react-icons/fi";

const navLinks = [
  { href: "/tools", label: "Directory" },
  { href: "/trending", label: "Trending" },
  { href: "/collections", label: "Collections" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    const query = search.trim();
    if (!query) return;

    router.push(`/tools?search=${encodeURIComponent(query)}`);
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100/80 bg-white/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-4 px-6 py-4">

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
        >
          <div className="h-2.5 w-2.5 rounded-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.6)]" />

          <span className="heading-font text-[17px] font-semibold tracking-tight text-gray-900">
            opentoolkit
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden items-center gap-7 text-sm md:flex">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`relative font-medium transition-colors ${active
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
                  }`}
              >
                {label}

                {active && (
                  <span className="absolute -bottom-[18px] left-0 h-0.5 w-full rounded-full bg-blue-600" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Search + auth */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="hidden w-56 items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2 transition-all focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-50 lg:flex lg:w-72"
          >
            <FiSearch
              className="shrink-0 text-gray-400"
              size={14}
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </form>

          {/* Logged out */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium transition-all hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm active:scale-[0.98]">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>

          {/* Logged in */}
          <SignedIn>
            <Link
              href="/submit"
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-sm active:scale-[0.98]"
            >
              + Submit tool
            </Link>

            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}