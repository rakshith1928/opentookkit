import Redis from "ioredis";

declare global {
  var __redis: Redis | undefined;
}

function createRedisClient() {
  const client = new Redis(process.env.REDIS_URL ?? "redis://localhost:6379", {
    maxRetriesPerRequest: null, // required by BullMQ
    enableReadyCheck: false,
  });

  client.on("error", (err) => {
    console.error("[Redis] connection error:", err);
  });

  return client;
}

export const redis = globalThis.__redis ?? createRedisClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__redis = redis;
}