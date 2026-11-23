#!/usr/bin/env node
// Runs the hosted Worker locally (never deployed), ends sessions in every way a
// client can, and fails if any Durable Object keeps storage afterwards. Stored
// data is billed, so an object that is never deleted costs money for good.
import { execFileSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = 8796;
const BASE = `http://127.0.0.1:${PORT}`;
const IDLE_SECONDS = 8;
const JSON_HEADERS = { "content-type": "application/json", accept: "application/json, text/event-stream" };
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
const post = (sessionId, body) => send("/mcp", "POST", { ...JSON_HEADERS, ...(sessionId ? { "mcp-session-id": sessionId } : {}) }, body);
const end = (sessionId) => send("/mcp", "DELETE", { "mcp-session-id": sessionId });
const open = async () => {
  const sessionId = (await post(null, INITIALIZE)).headers.get("mcp-session-id");
  await post(sessionId, INITIALIZED);
  await post(sessionId, TOOL_CALL);
  return sessionId;
};

async function runSessions() {
  // Ended by the client
  await end(await open());

  // Left idle
  await open();

  // A server-to-client stream open while the session ends
  const withStream = await open();
  const stream = new AbortController();
  await fetch(`${BASE}/mcp`, { headers: { accept: "text/event-stream", "mcp-session-id": withStream }, signal: stream.signal });
  await wait(300);
  await end(withStream);
  await wait(2500);
  stream.abort();

  // Late requests for a session that has ended
  const ended = await open();
  await end(ended);
  await wait(2500);
  await post(ended, TOOL_CALL);
  await send("/mcp", "GET", { accept: "text/event-stream", "mcp-session-id": ended });
  await end(ended);

  // Legacy SSE, opened and closed
  const sse = new AbortController();
  const legacy = await fetch(`${BASE}/sse`, { headers: { accept: "text/event-stream" }, signal: sse.signal });
  await legacy.body.getReader().read();
  sse.abort();

  // IDs this server never issued
  await post(MADE_UP_ID, TOOL_CALL);
  await send("/mcp", "GET", { accept: "text/event-stream", "mcp-session-id": MADE_UP_ID });
  await end(MADE_UP_ID);
  await send(`/sse/message?sessionId=${MADE_UP_ID}`, "POST", { "content-type": "application/json" }, TOOL_CALL);
  await send(`/sse/message?sessionId=${MADE_UP_ID}`, "POST", { "content-type": "application/json" }, "not json");
}

function objectsWithStorage(state) {
  const files = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (entry.name.endsWith(".sqlite") && entry.name !== "metadata.sqlite") files.push(path);
    }
  };
  walk(join(state, "v3", "do"));
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
    try { ready = (await fetch(`${BASE}/`)).ok; } catch {}
    if (!ready) await wait(2000);
  }
  if (!ready) throw new Error("the local Worker didn't start");
  await runSessions();
  await wait((IDLE_SECONDS + 12) * 1000);
  stop();
  await wait(2500);
  const { total, kept } = objectsWithStorage(state);
  if (total === 0) throw new Error("no Durable Objects were created, so nothing was checked");
  if (kept > 0) throw new Error(`${kept} of ${total} Durable Objects still hold storage`);
  console.log(`All ${total} Durable Objects were deleted.`);
  exitCode = 0;
} catch (error) {
  console.error(`Storage check failed: ${error.message}`);
} finally {
  stop();
  try { rmSync(state, { recursive: true, force: true }); } catch {}
}
process.exit(exitCode);
