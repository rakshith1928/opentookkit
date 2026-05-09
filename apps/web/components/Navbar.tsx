"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { FiSearch } from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [search, setSearch] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/tools?search=${encodeURIComponent(search.trim())}`);
  }

  const navLinks = [
    { href: "/tools", label: "Directory" },
    { href: "/trending", label: "Trending" },
    { href: "/collections", label: "Collections" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
        >
          <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
          <span className="font-semibold text-lg tracking-tighter">
            opentoolkit
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-7 text-sm">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-medium transition-colors ${pathname === href
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
                }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Search + auth */}
        <div className="flex items-center gap-3">

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2 w-64 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-50 transition-all"
          >
            <FiSearch className="text-gray-400 shrink-0" size={14} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools..."
              className="bg-transparent text-sm outline-none w-full placeholder:text-gray-400"
            />
          </form>

          {/* Auth */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 text-sm font-medium border border-gray-200 hover:bg-gray-50 rounded-2xl transition-colors">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link
              href="/submit"
              className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-colors"
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