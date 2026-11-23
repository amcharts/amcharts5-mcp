#!/usr/bin/env node
// Prints the hosted server's anonymous usage counts from Workers Analytics Engine.
// Needs CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN (permission: Account Analytics Read).
// Usage: npm run usage -- [--days 30] [--dataset amcharts5_mcp_usage]
const option = (name, fallback) => {
  const at = process.argv.indexOf(`--${name}`);
  return at > 0 ? process.argv[at + 1] ?? fallback : fallback;
};
const days = Number(option("days", 30));
const dataset = option("dataset", "amcharts5_mcp_usage");
const { CLOUDFLARE_ACCOUNT_ID: account, CLOUDFLARE_API_TOKEN: token } = process.env;

if (!account || !token) {
  console.error("Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN (permission: Account Analytics Read).");
  process.exit(1);
}
if (!Number.isInteger(days) || days < 1 || days > 92 || !/^[a-z0-9_]+$/.test(dataset)) {
  console.error("--days must be 1 to 92, and --dataset a dataset name.");
  process.exit(1);
}

// Analytics Engine can sample, so a count is the sum of the sample intervals
const query = `SELECT toStartOfInterval(timestamp, INTERVAL '1' DAY) AS day, index1 AS app, blob1 AS route, blob2 AS kind, blob3 AS tool, blob4 AS result, SUM(_sample_interval) AS n
FROM ${dataset}
WHERE timestamp > NOW() - INTERVAL '${days}' DAY
GROUP BY day, app, route, kind, tool, result
ORDER BY day
FORMAT JSON`;

const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/analytics_engine/sql`, {
  method: "POST",
  headers: { authorization: `Bearer ${token}` },
  body: query,
});
const text = await response.text();
if (!response.ok) {
  console.error(`Cloudflare answered ${response.status}: ${text.slice(0, 300)}`);
  process.exit(1);
}
let data;
try {
  data = JSON.parse(text).data;
} catch {}
if (!Array.isArray(data)) {
  console.error(`Cloudflare's answer wasn't a result table: ${text.slice(0, 300)}`);
  process.exit(1);
}
const rows = data.map((row) => ({ ...row, day: String(row.day).slice(0, 10), n: Number(row.n) }));
if (!rows.length) {
  console.log(`No usage counted in the last ${days} days.`);
  process.exit(0);
}

const total = (list) => list.reduce((sum, row) => sum + row.n, 0);
const table = (title, key, list) => {
  console.log(`\n${title}`);
  const groups = new Map();
  for (const row of list) groups.set(row[key], (groups.get(row[key]) || 0) + row.n);
  for (const [name, n] of [...groups].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(9)}  ${String(Math.round((n / total(list)) * 100)).padStart(3)}%  ${name || "-"}`);
  }
};

const connections = rows.filter((row) => row.kind === "connection");
const toolCalls = rows.filter((row) => row.kind === "tool");
console.log(`Last ${days} days: ${total(connections)} connections, ${total(toolCalls)} tool calls`);

console.log("\nPer day (connections, tool calls)");
for (const day of [...new Set(rows.map((row) => row.day))]) {
  console.log(`  ${day}  ${String(total(connections.filter((row) => row.day === day))).padStart(7)}  ${String(total(toolCalls.filter((row) => row.day === day))).padStart(7)}`);
}
if (connections.length) table("Connections by app", "app", connections);
if (toolCalls.length) {
  // A tool call has only the HTTP user agent to go by, and many clients don't name themselves there
  table("Tool calls by app (from the user agent, so often \"other\")", "app", toolCalls);
  table("Tool calls by tool", "tool", toolCalls);
  const answered = toolCalls.filter((row) => row.route === "mcp");
  if (answered.length) table("Tool call results on /mcp", "result", answered);
}
table("Requests by route", "route", rows);
