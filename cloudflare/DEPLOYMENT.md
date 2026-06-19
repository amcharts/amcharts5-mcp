# Deploying your own copy to Cloudflare Workers

This guide is for anyone who wants to **run their own instance** of this MCP server
as a remote, URL-addressable endpoint on their **own Cloudflare account**.

> Just want to *use* the server? You don't need any of this — connect your AI client
> to the public hosted instance at `https://mcp.amcharts.com/mcp` (see the README).
> This guide is only for self-hosting.

> **Before you deploy:** the committed `wrangler.jsonc` targets amCharts's own
> production domain (`mcp.amcharts.com`), which lives in amCharts's Cloudflare
> account. It will **not** deploy as-is on your account — you must change one line
> first (see [step 2](#2-point-the-worker-at-your-own-host-edit-wranglerjsonc)).

## The two run modes

This repo ships two ways to run the same server, from the same tool + content code
(`src/content.js`, `src/tools.js`) — so they behave identically:

| Mode | Entry | Transport | How users connect |
|------|-------|-----------|-------------------|
| **npm / local** | `src/index.js` | stdio | `npx @amcharts/amcharts5-mcp` |
| **Remote (this guide)** | `cloudflare/index.js` | Streamable HTTP + SSE | paste a URL — no install |

The Worker loads content from a pre-built bundle (`cloudflare/content.generated.js`)
instead of the filesystem; everything else is shared.

## What you get

A public HTTPS endpoint your AI client connects to by URL:

```
https://<your-host>/mcp    ← Streamable HTTP (modern clients)
https://<your-host>/sse    ← SSE (legacy clients)
```

where `<your-host>` is either your own custom domain or the
`amcharts5-mcp.<your-account>.workers.dev` subdomain Cloudflare assigns.

## How updates work

```
push to main ──▶ GitHub Actions ──▶ checkout (incl. amcharts5-skill submodule)
            ──▶ npm run build:worker (bundle content) ──▶ wrangler deploy
```

If you fork this repo and configure the secrets below, `.github/workflows/deploy.yml`
redeploys your Worker on **every push to `main`**. The content bundle
(`cloudflare/content.generated.js`) is gitignored and rebuilt from source on every
deploy, so it never drifts from the markdown in the repo. You can also deploy manually
from your machine (see [Local development](#local-development)).

## One-time setup

### 1. Cloudflare account + plan

1. A Cloudflare account.
2. **Workers Paid ($5/mo) is recommended.** The Worker fits the free plan's size
   limit (~1.2 MB gzipped vs. the 3 MiB free cap), but full-corpus search can exceed
   the free plan's 10 ms CPU-per-request limit. Paid removes that risk.

### 2. Point the Worker at your own host (edit `wrangler.jsonc`)

The committed `routes` block binds the Worker to `mcp.amcharts.com`. Change it to
something you control:

- **Use your own custom domain** — set `routes[].pattern` to a subdomain in a zone
  that exists in **your** Cloudflare account, e.g. `"mcp.yourdomain.com"`. On deploy,
  Cloudflare creates the DNS record and TLS certificate automatically. Make sure no
  conflicting DNS record for that name already exists.
- **Or skip the custom domain** — delete the entire `routes` block. The Worker is then
  served at `https://amcharts5-mcp.<your-account>.workers.dev`.

Optionally change `"name"` (default `amcharts5-mcp`) if you want a different
`*.workers.dev` subdomain or Worker name.

### 3. Create an API token + note your Account ID

1. **My Profile → API Tokens → Create Token → "Edit Cloudflare Workers"** template.
   Copy the token.
2. Note your **Account ID** (Workers & Pages → right sidebar).

### 4. Deploy

**Option A — automatic (fork + GitHub Actions).** Add two repository secrets to your
fork (**Settings → Secrets and variables → Actions**):

| Secret | Value |
|--------|-------|
| `CLOUDFLARE_API_TOKEN` | the token from step 3 |
| `CLOUDFLARE_ACCOUNT_ID` | your account ID from step 3 |

Then push to `main` (or run the workflow manually via **Actions → Deploy MCP server →
Run workflow**). The first run creates the Worker, the Durable Object, and (if you
kept a `routes` block) your custom domain.

**Option B — manual from your machine.**

```bash
npx wrangler login
npm run deploy        # builds the content bundle, then wrangler deploy
```

## Local development

```bash
npm run build:worker   # regenerate cloudflare/content.generated.js from disk
npm run dev:worker     # run the Worker locally (wrangler dev) at http://localhost:8787
npm test               # run the stdio server test suite
```

`npm run dev:worker` runs fully offline via the local Workers runtime — no Cloudflare
login or account needed to test.

## Notes

- **`McpAgent` uses a SQLite-backed Durable Object** (`AmCharts5MCP`, bound as
  `MCP_OBJECT` in `wrangler.jsonc`) to hold per-session state. Available on both free
  and paid plans.
- **Authless:** the server exposes no OAuth — anyone with the URL can use it, which is
  appropriate for public docs. (Note: Claude's *org-managed* custom-connector flow
  currently assumes OAuth; individual users adding the URL work fine.)
- The npm/stdio package is unaffected by any of this — `agents` and `wrangler` are
  `devDependencies`, and `cloudflare/` is not in the published `files` list.
