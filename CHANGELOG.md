# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> Entries for versions up to 1.2.0 were reconstructed from git history.

## [1.3.0] - 2026-06-19

### Added
- **Self-hostable remote MCP server on Cloudflare Workers.** The server can now
  be deployed as a public HTTPS endpoint and connected by URL — no install
  required — in addition to the existing npm/stdio usage.
  - Streamable HTTP transport at `/mcp` and legacy SSE at `/sse`
    (`cloudflare/index.js`, via `McpAgent` + a SQLite-backed Durable Object).
  - Build step that bundles all skill + extended content into the Worker
    (`scripts/build-worker-content.js`, `npm run build:worker`).
  - One-push auto-deploy via GitHub Actions
    (`.github/workflows/deploy.yml`) — every push to `main` rebuilds and deploys.
  - `wrangler.jsonc` config and `dev:worker` / `deploy` npm scripts.
  - `cloudflare/DEPLOYMENT.md` with one-time setup instructions.
- `npm test` script wired to the existing `test.js` suite.

### Changed
- Refactored content loading and tool registration into shared, transport-agnostic
  modules (`src/content.js`, `src/content-fs.js`, `src/tools.js`) so the stdio
  server and the Worker run identical logic from a single source. **No change to
  stdio/npm behavior** (verified: all 22 tests pass).

### Fixed
- `test.js` no longer hard-codes a local absolute path; it resolves the project
  directory relative to itself.

## [1.2.0]

### Changed
- Updated documentation for amCharts 5.16.2–5.18.0 API changes.

### Added
- `MapSankeySeries` example in the extended examples.

## [1.1.9]

### Added
- `get_api_reference` tool for per-class API + settings/defaults lookup.
- `scope` parameter on `search_docs` to optionally include the extended docs.
- Real ES-module imports in `get_quick_start` (distinct from the CDN/HTML form).
- Server version now sourced from `package.json`.

## [1.1.8]

### Fixed
- Skill submodule: `MapSankeySeries` data timing; added a further example.

## [1.1.6]

### Fixed
- Skill submodule: corrected `mapCircles` to `nodes.mapPolygons`.

## [1.1.5]

### Fixed
- Cursor line hiding now uses `forceHidden` instead of `visible: false`.

## [1.1.4]

### Added
- MIT `LICENSE` file.

## [1.1.3]

### Added
- MCP Registry metadata (`server.json`).

## [1.1.0]

### Added
- Extended documentation, code examples, and per-class API reference with
  inheritance notes.

## [1.0.0]

### Added
- Initial release of the amCharts 5 MCP server (stdio): chart references,
  core skill docs, search, quick-start templates, and examples.
