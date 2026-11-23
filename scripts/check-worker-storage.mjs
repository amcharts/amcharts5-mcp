#!/usr/bin/env node
// Runs the hosted Worker locally (never deployed) and checks what it stores.
// /mcp must create no Durable Object. A legacy SSE session must leave nothing
// once it has gone idle, however it ended. Stored data is billed, so an object
// that is never deleted costs money for good.
import { execFileSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = await new Promise((resolve, reject) => {
  const probe = createServer();
  probe.once("error", reject);
  probe.listen(0, "127.0.0.1", () => {
    const { port } = probe.address();
    probe.close(() => resolve(port));
  });
});
const BASE = `http://127.0.0.1:${PORT}`;
const IDLE_SECONDS = 8;
const JSON_HEADERS = { "content-type": "application/json", accept: "application/json, text/event-stream" };
const SSE_HEADERS = { "content-type": "application/json" };
const INITIALIZE = { jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-03-26", capabilities: {}, clientInfo: { name: "storage-check", version: "1" } } };
const INITIALIZED = { jsonrpc: "2.0", method: "notifications/initialized" };
const TOOL_CALL = { jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: "search_all", arguments: { query: "pie chart" } } };
const MADE_UP_ID = "0123456789abcdef".repeat(4);

if (!existsSync(join(ROOT, "cloudflare", "content.generated.js"))) {
  console.error("Run `npm run build:worker` first.");
  process.exit(1);
}

const wait = (ms) => new Promise((done) => setTimeout(done, ms));
const send = async (path, method, headers = {}, body) => {
  const response = await fetch(BASE + path, { method, headers, body: body === undefined ? undefined : typeof body === "string" ? body : JSON.stringify(body) });
  await response.text();
  return response;
};

// Every way /mcp is used, including clients that still send a session ID
async function useMcp() {
  const withId = { ...JSON_HEADERS, "mcp-session-id": MADE_UP_ID };
  await send("/mcp", "POST", JSON_HEADERS, INITIALIZE);
  await send("/mcp", "POST", JSON_HEADERS, INITIALIZED);
  await send("/mcp", "POST", JSON_HEADERS, TOOL_CALL);
  await send("/mcp", "POST", withId, TOOL_CALL);
  await send("/mcp", "POST", JSON_HEADERS, "not json");
  await send("/mcp", "GET", { accept: "text/event-stream", "mcp-session-id": MADE_UP_ID });
  await send("/mcp", "DELETE", { "mcp-session-id": MADE_UP_ID });
}

// Opens a legacy SSE stream; returns its message address and a way to read and close it
async function openSse() {
  const control = new AbortController();
  const stream = await fetch(`${BASE}/sse`, { headers: { accept: "text/event-stream" }, signal: control.signal });
  const reader = stream.body.getReader();
  const decoder = new TextDecoder();
  let seen = "";
  const until = async (pattern) => {
    while (!pattern.test(seen)) {
      const { done, value } = await reader.read();
      if (done) throw new Error("the SSE stream ended early");
      seen += decoder.decode(value, { stream: true });
    }
  };
  await until(/data: \S*sessionId=\S+\r?\n/);
  return { endpoint: /data: (\S*sessionId=\S+)/.exec(seen)[1], until, close: () => control.abort() };
}

async function useSse() {
  // Opened and closed
  (await openSse()).close();

  // Used, then closed
  const used = await openSse();
  await send(used.endpoint, "POST", SSE_HEADERS, INITIALIZE);
  await used.until(/"id":1\b/);
  await send(used.endpoint, "POST", SSE_HEADERS, INITIALIZED);
  await send(used.endpoint, "POST", SSE_HEADERS, TOOL_CALL);
  await used.until(/"id":2\b/);
  used.close();

  // A late message after the session's stream has gone, and broken JSON
  const late = await openSse();
  late.close();
  await wait(500);
  await send(late.endpoint, "POST", SSE_HEADERS, TOOL_CALL);
  await send(late.endpoint, "POST", SSE_HEADERS, "not json");

  // A stream still open when the idle cleanup runs
  const held = await openSse();

  // IDs this server never issued
  await send(`/sse/message?sessionId=${MADE_UP_ID}`, "POST", SSE_HEADERS, TOOL_CALL);
  await send(`/sse/message?sessionId=${MADE_UP_ID}`, "POST", SSE_HEADERS, "not json");
  await send(`/sse?sessionId=${MADE_UP_ID}`, "GET", { accept: "text/event-stream" });

  return () => held.close();
}

function objectFiles(state) {
  const files = [];
  const walk = (dir) => {
    if (!existsSync(dir)) return;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (entry.name.endsWith(".sqlite") && entry.name !== "metadata.sqlite") files.push(path);
    }
  };
  walk(join(state, "v3", "do"));
  return files;
}

function objectsWithStorage(state) {
  const files = objectFiles(state);
  const kept = files.filter((file) => {
    const db = new DatabaseSync(file, { readOnly: true });
    const { n } = db.prepare("SELECT COUNT(*) n FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").get();
    db.close();
    return n > 0;
  });
  return { total: files.length, kept: kept.length };
}

const state = mkdtempSync(join(tmpdir(), "amcharts5-mcp-storage-"));
const config = JSON.parse(readFileSync(join(ROOT, "wrangler.jsonc"), "utf8").replace(/^\s*\/\/.*$/gm, ""));
delete config.routes;
delete config.$schema;
config.main = "../cloudflare/index.js";
const configFile = join(ROOT, ".wrangler", "storage-check.local.json");
mkdirSync(dirname(configFile), { recursive: true });
writeFileSync(configFile, JSON.stringify(config));

const child = spawn("npx", ["wrangler", "dev", "--config", configFile.replace(/\\/g, "/"), "--local", "--port", String(PORT), "--ip", "127.0.0.1", "--persist-to", state.replace(/\\/g, "/"), "--var", `IDLE_TTL_SECONDS:${IDLE_SECONDS}`, "--show-interactive-dev-session=false"], { cwd: ROOT, shell: true, detached: process.platform !== "win32", stdio: "ignore" });
const stop = () => {
  try {
    if (process.platform === "win32") execFileSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore" });
    else process.kill(-child.pid);
  } catch {}
  rmSync(configFile, { force: true });
};

let exitCode = 1;
try {
  let ready = false;
  for (let i = 0; i < 90 && !ready; i++) {
    try { ready = (await (await fetch(`${BASE}/`)).text()).startsWith("amCharts 5 MCP server"); } catch {}
    if (!ready) await wait(2000);
  }
  if (!ready) throw new Error("the local Worker didn't start");
  await useMcp();
  await wait(1000);
  const fromMcp = objectFiles(state).length;
  if (fromMcp > 0) throw new Error(`/mcp created ${fromMcp} Durable Objects`);
  const closeHeldStream = await useSse();
  await wait((IDLE_SECONDS + 12) * 1000);
  closeHeldStream();
  await wait(2000);
  stop();
  await wait(2500);
  const { total, kept } = objectsWithStorage(state);
  if (total === 0) throw new Error("no SSE session created a Durable Object, so nothing was checked");
  if (kept > 0) throw new Error(`${kept} of ${total} Durable Objects still hold storage`);
  console.log(`/mcp created no Durable Objects, and all ${total} SSE sessions were deleted.`);
  exitCode = 0;
} catch (error) {
  console.error(`Storage check failed: ${error.message}`);
} finally {
  stop();
  try { rmSync(state, { recursive: true, force: true }); } catch {}
}
process.exit(exitCode);
