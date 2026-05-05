"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const path = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-13 max-w-5xl items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-mono text-sm font-medium">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          opentoolkit
        </Link>

        {/* Nav links */}
        <nav className="flex items-center">
          {[
            { href: "/tools", label: "directory" },
            { href: "/trending", label: "trending" },
            { href: "/collections", label: "collections" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-md font-mono text-xs transition-colors ${path === href
                  ? "text-gray-900 font-medium"
                  : "text-gray-500 hover:text-gray-900"
                }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-2">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="rounded-md border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50 transition-colors">
                sign in
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link
              href="/submit"
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 transition-colors"
            >
              + submit tool
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

      </div>
    </header>
  );
}