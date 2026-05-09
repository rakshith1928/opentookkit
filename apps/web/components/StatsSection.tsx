"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { id: "tools", target: 1240, label: "tools indexed", suffix: "" },
  { id: "upvotes", target: 38420, label: "total upvotes", suffix: "" },
  { id: "sync", target: 6, label: "star sync interval", suffix: "h" },
  { id: "contributors", target: 847, label: "contributors", suffix: "" },
];

function useCountUp(target: number, triggered: boolean, duration = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!triggered) return;

    let startTime: number | null = null;
    const start = 0;

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(start + (target - start) * eased));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    }

    requestAnimationFrame(step);
  }, [triggered, target, duration]);

  return value;
}

function StatItem({
  stat,
  triggered,
}: {
  stat: (typeof STATS)[0];
  triggered: boolean;
}) {
  const value = useCountUp(stat.target, triggered);

  return (
    <div className="text-center md:text-left">
      <div className="flex items-baseline justify-center md:justify-start gap-1">
        <span className="stat-number text-4xl font-semibold tracking-tighter text-gray-900">
          {stat.id === "upvotes"
            ? value.toLocaleString()
            : value}
          {stat.suffix}
        </span>
      </div>
      <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-400">
        {stat.label}
      </div>
    </div>
  );
}

export default function StatsSection() {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Trigger count-up when section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="border-b border-gray-100 bg-white py-7">
      <div className="max-w-screen-xl mx-auto px-6">
        <div
          ref={ref}
          className="max-w-5xl mx-auto rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
        >
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((stat) => (
              <StatItem key={stat.id} stat={stat} triggered={triggered} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}