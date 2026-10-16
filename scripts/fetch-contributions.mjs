#!/usr/bin/env node
/**
 * Unified contribution aggregator (GitHub + GitLab).
 *
 * Runs server-side only (GitHub Actions or a local terminal) because it needs
 * secret tokens. It writes `public/data/contributions.json`, which contains
 * ONLY `{ date, count, level }` per day. No repository names, commit messages,
 * SHAs, author emails or platform breakdown ever reach the output file or logs.
 *
 * Environment variables
 * ---------------------
 *   GH_USERNAME          GitHub login                      (default: GaroxXiz)
 *   GH_CONTRIB_TOKEN     GitHub PAT: read:user (+ repo, so private-repo commits
 *                        can be matched for de-duplication)             [required]
 *   GITLAB_TOKEN         GitLab PAT with read_api scope (optional; without it
 *                        the output is GitHub-only)
 *   GITLAB_URL           GitLab base URL                   (default: https://gitlab.com)
 *   GITLAB_AUTHOR_EMAILS Comma-separated commit-author emails of yours on GitLab
 *   GITLAB_USERNAME      Optional. Also matches commits by author name == this
 *   CONTRIB_TIMEZONE     IANA timezone used to bucket GitLab commits into days
 *                        (default: Asia/Jakarta)
 *   CONTRIB_START_YEAR   First year to include             (default: 2024)
 *   CONTRIB_OUTPUT       Output path (default: public/data/contributions.json)
 *
 * De-duplication
 * --------------
 * GitHub's calendar is the base (commits, PRs, issues, reviews). A GitLab commit
 * is only added when its SHA is (a) not already counted from another GitLab
 * project (forks / mirrors) and (b) not present among your GitHub commits
 * (GitHub <-> GitLab mirrors). Only the day-level total is stored.
 */
import { mkdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import fs from "node:fs";

// Load .env file automatically if present (for local runs)
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  try {
    if (typeof process.loadEnvFile === "function") {
      process.loadEnvFile(envPath);
    } else {
      // Fallback parser for older Node runtimes if needed
      const envContent = fs.readFileSync(envPath, "utf8");
      for (const line of envContent.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (!(key in process.env)) {
            process.env[key] = val;
          }
        }
      }
    }
  } catch (err) {
    console.warn("[contrib] Note: Could not load .env file:", err.message);
  }
}

const env = process.env;
const GH_USERNAME = env.GH_USERNAME || "GaroxXiz";
const GH_TOKEN = env.GH_CONTRIB_TOKEN || env.GITHUB_TOKEN || "";
const GITHUB_API = (env.GITHUB_API_URL || "https://api.github.com").replace(/\/+$/, "");
const GITLAB_TOKEN = env.GITLAB_TOKEN || "";
const GITLAB_URL = (env.GITLAB_URL || "https://gitlab.com").replace(/\/+$/, "");
const GITLAB_EMAILS = new Set(
  (env.GITLAB_AUTHOR_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean),
);
const GITLAB_USERNAME = (env.GITLAB_USERNAME || "").trim().toLowerCase();
const TIMEZONE = env.CONTRIB_TIMEZONE || "Asia/Jakarta";
const START_YEAR = Number(env.CONTRIB_START_YEAR || 2024);
const OUTPUT = env.CONTRIB_OUTPUT || "public/data/contributions.json";

const MAX_RETRIES = 4;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- helpers ----------------------------------------------------------

/** fetch with retry/backoff for 429 + 5xx and network errors. */
async function request(url, options = {}, label = "request") {
  let lastErr;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(url, options);
      if (res.ok) return res;
      if (res.status === 429 || res.status >= 500) {
        const retryAfter = Number(res.headers.get("retry-after"));
        const wait = retryAfter > 0 ? retryAfter * 1000 : 1000 * 2 ** attempt;
        lastErr = new Error(`${label}: HTTP ${res.status}`);
        await sleep(Math.min(wait, 60_000));
        continue;
      }
      // Secondary rate limit on GitHub comes back as 403 with remaining=0
      if (res.status === 403 && res.headers.get("x-ratelimit-remaining") === "0") {
        const reset = Number(res.headers.get("x-ratelimit-reset")) * 1000;
        const wait = Math.max(reset - Date.now(), 1000);
        if (wait <= 120_000) {
          lastErr = new Error(`${label}: rate limited`);
          await sleep(wait + 500);
          continue;
        }
      }
      // Deliberately do NOT include the response body: it may echo private data.
      const fatal = new Error(`${label}: HTTP ${res.status}`);
      fatal.fatal = true;
      throw fatal;
    } catch (err) {
      if (err.fatal) throw err; // 4xx etc.: retrying cannot help
      lastErr = err;
      if (attempt === MAX_RETRIES) break;
      await sleep(1000 * 2 ** attempt);
    }
  }
  throw lastErr ?? new Error(`${label}: failed`);
}

/** Date -> yyyy-MM-dd in the configured timezone. */
const dayFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const toDay = (isoString) => dayFormatter.format(new Date(isoString));

/** Parse the `Link: <...>; rel="next"` header used by the GitHub REST API. */
function nextLink(res) {
  const link = res.headers.get("link");
  if (!link) return null;
  const m = link.split(",").find((p) => /rel="next"/.test(p));
  const url = m && m.match(/<([^>]+)>/);
  return url ? url[1] : null;
}

// ---------- GitHub -----------------------------------------------------------

const ghHeaders = {
  Authorization: `Bearer ${GH_TOKEN}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "portfolio-contrib-sync",
};

const CONTRIB_QUERY = `
query($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        weeks { contributionDays { date contributionCount } }
      }
      commitContributionsByRepository(maxRepositories: 100) {
        repository { nameWithOwner }
      }
    }
  }
}`;

/**
 * Daily GitHub counts + the set of SHAs of your commits (used only in-memory
 * to de-duplicate GitLab mirrors).
 */
async function fetchGitHub(startDate, endDate) {
  const counts = new Map(); // date -> count
  const shas = new Set();
  let shaLookupFailures = 0;
  const nowYear = endDate.getUTCFullYear();

  for (let year = START_YEAR; year <= nowYear; year++) {
    const from = new Date(Date.UTC(year, 0, 1, 0, 0, 0));
    const to = year === nowYear ? endDate : new Date(Date.UTC(year, 11, 31, 23, 59, 59));

    const res = await request(
      `${GITHUB_API}/graphql`,
      {
        method: "POST",
        headers: { ...ghHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({
          query: CONTRIB_QUERY,
          variables: { login: GH_USERNAME, from: from.toISOString(), to: to.toISOString() },
        }),
      },
      "github graphql",
    );
    const json = await res.json();
    if (json.errors?.length || !json.data?.user) {
      throw new Error(`github graphql: query failed for ${year}`);
    }
    const collection = json.data.user.contributionsCollection;
    for (const week of collection.contributionCalendar.weeks) {
      for (const day of week.contributionDays) {
        if (day.date >= startDate) counts.set(day.date, day.contributionCount);
      }
    }

    // Collect commit SHAs per repository for de-duplication (only when GitLab is used).
    if (GITLAB_TOKEN) {
      const repos = collection.commitContributionsByRepository.map((r) => r.repository.nameWithOwner);
      for (const repo of repos) {
        try {
          let url =
            `${GITHUB_API}/repos/${repo}/commits?per_page=100` +
            `&author=${encodeURIComponent(GH_USERNAME)}` +
            `&since=${from.toISOString()}&until=${to.toISOString()}`;
          while (url) {
            const r = await request(url, { headers: ghHeaders }, "github commits");
            for (const c of await r.json()) shas.add(c.sha);
            url = nextLink(r);
          }
        } catch {
          shaLookupFailures++; // never log the repo name
        }
      }
    }
  }
  return { counts, shas, shaLookupFailures };
}

// ---------- GitLab -----------------------------------------------------------

const glHeaders = { "PRIVATE-TOKEN": GITLAB_TOKEN, "User-Agent": "portfolio-contrib-sync" };

/** Follow GitLab offset pagination via the x-next-page header. */
async function* glPages(pathAndQuery, label) {
  let page = "1";
  while (page) {
    const sep = pathAndQuery.includes("?") ? "&" : "?";
    const res = await request(
      `${GITLAB_URL}/api/v4${pathAndQuery}${sep}per_page=100&page=${page}`,
      { headers: glHeaders },
      label,
    );
    yield await res.json();
    page = res.headers.get("x-next-page") || "";
  }
}

/** Unique GitLab commits (by SHA) authored by you, as Map<sha, yyyy-MM-dd>. */
async function fetchGitLab(startDate, endDate) {
  const commits = new Map();
  const since = `${startDate}T00:00:00Z`;
  const until = endDate.toISOString();

  const isMine = (c) => {
    const email = (c.author_email || "").toLowerCase();
    if (GITLAB_EMAILS.has(email)) return true;
    return GITLAB_USERNAME && (c.author_name || "").toLowerCase() === GITLAB_USERNAME;
  };

  // Projects the token's user is a member of (includes private company projects).
  const projectIds = [];
  for await (const batch of glPages(
    `/projects?membership=true&simple=true&archived=false&last_activity_after=${encodeURIComponent(since)}`,
    "gitlab projects",
  )) {
    for (const p of batch) projectIds.push(p.id);
  }

  let skippedProjects = 0;
  for (const id of projectIds) {
    try {
      for await (const batch of glPages(
        `/projects/${id}/repository/commits?all=true&since=${encodeURIComponent(since)}` +
          `&until=${encodeURIComponent(until)}`,
        "gitlab commits",
      )) {
        for (const c of batch) {
          if (!isMine(c) || commits.has(c.id)) continue;
          commits.set(c.id, toDay(c.authored_date || c.created_at));
        }
      }
    } catch {
      skippedProjects++; // e.g. empty repo (404) or no repo access; never log names
    }
  }
  return { commits, projectCount: projectIds.length, skippedProjects };
}

// ---------- aggregation ------------------------------------------------------

/** GitHub-style 0..4 intensity based on the busiest day. */
function levelFor(count, max) {
  if (count <= 0) return 0;
  const r = count / max;
  if (r <= 0.25) return 1;
  if (r <= 0.5) return 2;
  if (r <= 0.75) return 3;
  return 4;
}

function* eachDay(startDate, endDay) {
  const d = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDay}T00:00:00Z`);
  for (; d <= end; d.setUTCDate(d.getUTCDate() + 1)) yield d.toISOString().slice(0, 10);
}

async function main() {
  if (!GH_TOKEN) {
    if (env.CI === "true") throw new Error("GH_CONTRIB_TOKEN secret is not configured.");
    console.warn("[contrib] GH_CONTRIB_TOKEN is not set; skipping (existing data file left untouched).");
    return;
  }
  const useGitLab = Boolean(GITLAB_TOKEN);
  if (useGitLab && GITLAB_EMAILS.size === 0 && !GITLAB_USERNAME) {
    throw new Error("GITLAB_TOKEN is set but neither GITLAB_AUTHOR_EMAILS nor GITLAB_USERNAME is configured.");
  }

  const startDate = `${START_YEAR}-01-01`;
  const endDate = new Date();
  const today = toDay(endDate.toISOString());

  const gh = await fetchGitHub(startDate, endDate);
  let gitlabAdded = 0;
  const gitlabByDay = new Map();
  let gl = null;
  if (useGitLab) {
    gl = await fetchGitLab(startDate, endDate);
    for (const [sha, day] of gl.commits) {
      if (gh.shas.has(sha)) continue; // already counted on GitHub (mirror)
      gitlabByDay.set(day, (gitlabByDay.get(day) || 0) + 1);
      gitlabAdded++;
    }
  }

  const totals = new Map();
  for (const day of eachDay(startDate, today)) {
    totals.set(day, (gh.counts.get(day) || 0) + (gitlabByDay.get(day) || 0));
  }
  const max = Math.max(1, ...totals.values());
  const days = [...totals].map(([date, count]) => ({ date, count, level: levelFor(count, max) }));

  const out = path.resolve(OUTPUT);
  await mkdir(path.dirname(out), { recursive: true });
  const tmp = `${out}.tmp`;
  await writeFile(
    tmp,
    JSON.stringify({ generatedAt: new Date().toISOString(), timezone: TIMEZONE, days }),
    "utf8",
  );
  await rename(tmp, out); // atomic: a failed run never leaves a half-written file

  // Aggregate-only logging (public CI logs must not reveal private details).
  const sum = days.reduce((a, d) => a + d.count, 0);
  console.log(`[contrib] days=${days.length} total=${sum} gitlabSource=${useGitLab ? "on" : "off"}`);
  if (useGitLab) {
    console.log(
      `[contrib] gitlab: uniqueCommits=${gl.commits.size} addedAfterDedup=${gitlabAdded} ` +
        `projectsScanned=${gl.projectCount} projectsSkipped=${gl.skippedProjects}`,
    );
  }
  if (gh.shaLookupFailures > 0) {
    console.warn(
      `[contrib] warning: ${gh.shaLookupFailures} GitHub repo(s) could not be listed for de-duplication ` +
        `(token needs 'repo' scope for private repos).`,
    );
  }
}

main().catch((err) => {
  // Exit non-zero so CI aborts and the previously deployed data stays in place.
  console.error(`[contrib] failed: ${err.message}`);
  process.exit(1);
});
