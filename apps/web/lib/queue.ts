import { Queue } from "bullmq";
import { redis } from "./redis";

// ── Queue names (single source of truth) ─────────────────────────────────────
export const QUEUES = {
  GITHUB_SYNC: "github-sync",
  GROQ_SUMMARISE: "groq-summarise",
} as const;

// ── Job payload types ─────────────────────────────────────────────────────────
export type GithubSyncPayload = {
  toolId: string;
  owner: string;
  repo: string;
};

export type GroqSummarisePayload = {
  toolId: string;
  owner: string;
  repo: string;
};

// ── Queue instances ───────────────────────────────────────────────────────────
export const githubSyncQueue = new Queue<GithubSyncPayload>(
  QUEUES.GITHUB_SYNC,
  { connection: redis }
);

export const groqSummariseQueue = new Queue<GroqSummarisePayload>(
  QUEUES.GROQ_SUMMARISE,
  { connection: redis }
);

// ── Helper: enqueue both jobs when a tool is submitted ────────────────────────
export async function enqueueToolJobs(
  toolId: string,
  owner: string,
  repo: string
) {
  await Promise.all([
    githubSyncQueue.add(
      "sync-tool",
      { toolId, owner, repo },
      {
        jobId: `github-sync:${toolId}`,  // dedup — won't add if already queued
        attempts: 3,
        backoff: { type: "exponential", delay: 5000 },
      }
    ),
    groqSummariseQueue.add(
      "summarise-tool",
      { toolId, owner, repo },
      {
        jobId: `groq-summarise:${toolId}`,
        attempts: 3,
        backoff: { type: "exponential", delay: 10000 },
      }
    ),
  ]);
}