"use client";
import Link from "next/link";

type Tool = {
  id: string;
  name: string;
  slug: string;
  desc: string;
  tags: string[];
  stars: number;
  upvotes: number;
};

function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString();
}

export default function ToolCard({ tool }: { tool: Tool }) {
  const initials = tool.name.slice(0, 2).toUpperCase();

  return (
    <Link href={`/tools/${tool.slug}`}>
      <div className="group rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:ring-2 hover:ring-blue-50 cursor-pointer">

        {/* Top row */}
        <div className="mb-3 flex items-start justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 font-mono text-xs font-medium text-gray-700">
            {initials}
          </div>
          <button
            onClick={(e) => e.preventDefault()}
            className="flex flex-col items-center gap-0.5"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded border border-gray-200 text-xs text-gray-400 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-colors">
              ▲
            </div>
            <span className="font-mono text-xs text-gray-400">{fmt(tool.upvotes)}</span>
          </button>
        </div>

        {/* AI badge */}
        <div className="mb-2 inline-flex items-center gap-1 rounded border border-blue-100 bg-blue-50 px-1.5 py-0.5 font-mono text-xs text-blue-500">
          AI summary
        </div>

        {/* Content */}
        <p className="mb-1 text-sm font-medium text-gray-900">{tool.name}</p>
        <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-gray-500">
          {tool.desc}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-gray-100 bg-gray-50 px-1.5 py-0.5 font-mono text-xs text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 font-mono text-xs text-gray-400">
            <span className="text-amber-400">★</span>
            {fmt(tool.stars)}
          </div>
        </div>

      </div>
    </Link>
  );
}