import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { redis } from "@/lib/redis";

export async function GET() {
  const health: Record<string, string> = {};

  // ── Check Postgres ──────────────────────────────────────────────────────────
  try {
    await prisma.$queryRaw`SELECT 1`;
    health.postgres = "ok";
  } catch (e) {
    health.postgres = `error: ${(e as Error).message}`;
  }

  // ── Check Redis ─────────────────────────────────────────────────────────────
  try {
    await redis.ping();
    health.redis = "ok";
  } catch (e) {
    health.redis = `error: ${(e as Error).message}`;
  }

  const allOk = Object.values(health).every((v) => v === "ok");

  return NextResponse.json(
    {
      status: allOk ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      services: health,
    },
    { status: allOk ? 200 : 503 }
  );
}