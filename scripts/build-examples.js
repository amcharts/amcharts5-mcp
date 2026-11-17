#!/usr/bin/env node

/**
 * Refreshes extended/examples from amcharts.com: scrape, clean, check.
 *
 * Usage: npm run build:examples [-- --changed] [-- slug | category/slug ...]
 *   With no arguments every demo on amcharts.com (its demos sitemap) is
 *   re-scraped; --changed only the new or changed ones; otherwise the named ones.
 *
 * Cleaning always runs after the scrape, even when some demos failed: the ones
 * that did scrape are raw until cleaned, and must not be left that way. The
 * exit code is non-zero if the scrape, a cleaning pass or the check failed.
 */

import { spawnSync } from "child_process";

function run(script, args = []) {
  const result = spawnSync(process.execPath, [script, ...args], { stdio: "inherit" });
  return result.status === 0;
}

let ok = run("scripts/scrape-demos.js", process.argv.slice(2));

const steps = [
  ["scripts/clean-examples2.js"],
  ["scripts/clean-all.js", ["extended/examples"]],
  ["scripts/check-examples.js"],
];
for (const [script, args] of steps) {
  if (!run(script, args)) {
    ok = false;
    break;
  }
}

process.exit(ok ? 0 : 1);
