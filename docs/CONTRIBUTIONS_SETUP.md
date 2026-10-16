# Unified Contribution Heatmap – Setup

The portfolio shows **one** GitHub-style heatmap whose daily count is the combined
GitHub + GitLab activity. It does **not** touch GitHub's native contribution graph
(GitLab activity can't be added to that graph) and the public UI never reveals the
data sources.

## How it works

```
GitHub Actions (cron, every 6h + on push)
  └─ scripts/fetch-contributions.mjs      ← runs with repository SECRETS
       ├─ GitHub GraphQL  → daily contribution counts (+ your commit SHAs, memory only)
       ├─ GitLab REST     → your commits from every project you are a member of
       ├─ de-duplicate (SHA) → combine into one count per day
       └─ writes public/data/contributions.json  →  [{ date, count, level }]
  └─ npm run build → publish to gh-pages
Browser → fetches /data/contributions.json → <ActivityCalendar/> (green squares)
```

* The browser only ever receives `{ date, count, level }`. No repo names, commit
  messages, SHAs, e-mails or per-platform numbers are written to the file or the CI logs.
* GitHub Pages is static hosting, so "server-side" = the GitHub Actions job.
  Tokens exist only as encrypted repository secrets.
* If a sync fails (rate limit, expired token, API outage) the job aborts **before**
  deploying, so the last good data stays online. If the data file is missing, the UI
  falls back to the original GitHub-only calendar.

### De-duplication rules

* Base = GitHub's calendar (commits, PRs, issues, reviews – as GitHub counts them).
* A GitLab commit is added only if its SHA was **not** already counted from another
  GitLab project (forks/mirrors) **and** is **not** one of your GitHub commits
  (GitHub ⇄ GitLab mirrors).
* Commits are matched to you by author e-mail (`GITLAB_AUTHOR_EMAILS`) and, optionally,
  author name (`GITLAB_USERNAME`).

### Timezone

GitHub's per-day numbers use GitHub's own day boundaries. GitLab commit timestamps
are bucketed into days using `CONTRIB_TIMEZONE` (default `Asia/Jakarta`). Set it to your
GitHub profile's timezone to keep both aligned.

## One-time configuration

### 1. Create tokens

| Token | Where | Scopes |
|-------|-------|--------|
| GitHub PAT (classic) | Settings → Developer settings → Tokens | `read:user` and `repo` (`repo` lets the job list commits of **private** repos for de-duplication; without it, mirrors of private repos may be double counted) |
| GitLab PAT | GitLab → Preferences → Access tokens | `read_api` |

> To include private-repo activity in GitHub's own numbers, enable
> *Profile → Contribution settings → "Private contributions"* on GitHub.

### 2. Add repository secrets / variables

GitHub repo → **Settings → Secrets and variables → Actions**

Secrets:

* `GH_CONTRIB_TOKEN` – the GitHub PAT
* `GITLAB_TOKEN` – the GitLab PAT
* `GITLAB_AUTHOR_EMAILS` – comma-separated e-mails you commit with on GitLab, e.g. `me@company.com,me@users.noreply.gitlab.com`
* `GITLAB_USERNAME` – *(optional)* author name as it appears in your GitLab commits

Variables:

* `GITLAB_URL` – *(only for self-hosted GitLab)* e.g. `https://gitlab.company.com`
* `CONTRIB_TIMEZONE` – *(optional)* IANA timezone, e.g. `Asia/Jakarta`

### 3. Switch deployment to the workflow

Settings → Pages → **Source: Deploy from a branch → `gh-pages` / root** (already how
`npm run deploy` publishes). Then run **Actions → "Sync contributions & deploy" → Run workflow**.

> Use the workflow for deployments. A manual `npm run deploy` from your machine builds
> without the secrets, so the live site falls back to the GitHub-only calendar until
> the next workflow run (≤ 6 h).

## Local testing

```bash
# PowerShell
$env:GH_CONTRIB_TOKEN="..."; $env:GITLAB_TOKEN="..."; $env:GITLAB_AUTHOR_EMAILS="me@company.com"
npm run contrib:sync      # writes public/data/contributions.json (git-ignored)
npm run dev
```

Never commit tokens or `.env` files (both are git-ignored). Prefer short-lived tokens
and rotate them periodically.

## Troubleshooting

* **Workflow fails with `HTTP 401`** – token expired / wrong scope.
* **`GH_CONTRIB_TOKEN secret is not configured`** – add the secret (step 2).
* **GitLab total looks low** – check `GITLAB_AUTHOR_EMAILS` matches the e-mail on the
  commits (GitLab → Profile → Emails) and that the token user is a project member.
* **Slight count differences vs GitHub's graph** – timezone (see above) or private
  repos not covered by the token scope.
