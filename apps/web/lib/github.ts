import { Octokit } from "@octokit/rest";

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Parse "https://github.com/owner/repo" → { owner, repo }
export function parseGithubUrl(url: string): { owner: string; repo: string } | null {
  try {
    const { pathname } = new URL(url);
    const parts = pathname.replace(/^\//, "").replace(/\/$/, "").split("/");
    if (parts.length < 2) return null;
    return { owner: parts[0], repo: parts[1] };
  } catch {
    return null;
  }
}

// Validate repo exists + fetch basic metadata
export async function fetchRepoMetadata(owner: string, repo: string) {
  const { data } = await octokit.repos.get({ owner, repo });
  return {
    name: data.name,
    description: data.description ?? "",
    stars: data.stargazers_count,
    forks: data.forks_count,
    license: data.license?.spdx_id ?? null,
    homepage: data.homepage ?? null,
    topics: data.topics ?? [],
  };
}