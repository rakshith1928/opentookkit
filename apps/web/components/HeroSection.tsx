"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SignInButton, useUser } from "@clerk/nextjs";

export default function HeroSection() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const descRef = useRef<HTMLParagraphElement>(null);

  // Word-by-word fade-in on description text
  useEffect(() => {
    const el = descRef.current;
    if (!el) return;

    const text = el.dataset.text ?? "";
    const words = text.split(" ");
    el.innerHTML = "";

    words.forEach((word, i) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.style.opacity = "0";
      span.style.transition = `opacity 0.3s ease ${i * 35}ms`;
      el.appendChild(span);
      setTimeout(() => {
        span.style.opacity = "1";
      }, 250);
    });
  }, []);

  function handleSubmit() {
    if (isSignedIn) {
      router.push("/submit");
    }
  }

  return (
    <section className="relative bg-[#0a0a0a] text-white py-28 md:py-36 overflow-hidden">

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_55%)] pointer-events-none" />

      {/* Content */}
      <div className="relative max-w-screen-xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">

          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm mb-8">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              <span className="font-medium text-blue-300">open source</span>
            </div>
            <div className="w-px h-3 bg-white/20" />
            <span className="font-medium text-white/70">community-driven</span>
          </div>

          {/* Heading */}
          <h1 className="blur-in heading-font text-6xl md:text-7xl font-semibold leading-[1.08] tracking-[-0.02em] mb-6">
            The OSS AI tool directory
            <br />
            <span className="text-blue-400">for developers</span>
          </h1>

          {/* Animated description */}
          <p
            ref={descRef}
            data-text="Discover, upvote, and track the best open-source AI tools. Star history charts, AI-generated summaries, and weekly trending digests."
            className="max-w-lg mx-auto text-lg text-white/70 leading-relaxed tracking-[0.01em] mb-9 flex flex-wrap justify-center gap-x-[0.15em]"
          />

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => router.push("/tools")}
              className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl text-sm transition-all hover:shadow-md active:scale-[0.98]"
            >
              Browse directory
            </button>

            {isSignedIn ? (
              <button
                onClick={handleSubmit}
                className="w-full sm:w-auto px-7 py-3.5 border border-white/20 hover:bg-white/5 text-white font-medium rounded-2xl text-sm transition-all active:scale-[0.98]"
              >
                Submit a tool
              </button>
            ) : (
              <SignInButton mode="modal">
                <button className="w-full sm:w-auto px-7 py-3.5 border border-white/20 hover:bg-white/5 text-white font-medium rounded-2xl text-sm transition-all active:scale-[0.98]">
                  Submit a tool
                </button>
              </SignInButton>
            )}
          </div>

        </div>
      </div>

    </section>
  );
}