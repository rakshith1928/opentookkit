import Link from "next/link";
import Navbar from "@/components/Navbar";

const STATS = [
  { num: "1,240", label: "tools indexed" },
  { num: "38k", label: "total upvotes" },
  { num: "6h", label: "star sync interval" },
  { num: "847", label: "contributors" },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4">

        {/* Hero */}
        <section className="py-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-mono text-xs text-blue-600">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            open source · community-driven
          </div>

          <h1 className="mb-4 text-4xl font-semibold leading-tight tracking-tight">
            The OSS AI tool directory
            <br />
            <span className="text-blue-600">for developers</span>
          </h1>

          <p className="mb-8 max-w-lg text-base text-gray-500 leading-relaxed">
            Discover, upvote, and track the best open-source AI tools.
            Star history charts, AI-generated summaries, and weekly trending digests.
          </p>

          <div className="flex items-center gap-3">
            <Link
              href="/tools"
              className="rounded-md bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-700 transition-colors"
            >
              Browse directory
            </Link>
            <Link
              href="/submit"
              className="rounded-md border border-gray-200 px-5 py-2 text-sm hover:bg-gray-50 transition-colors"
            >
              Submit a tool
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap gap-8 border-t border-gray-100 pt-8">
            {STATS.map(({ num, label }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="font-mono text-xl font-medium">{num}</span>
                <span className="text-xs text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        </section>

      </main>
    </>
  );
}