#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { loadContentFromDisk } from "./content-fs.js";
import { registerTools } from "./tools.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// Single source of truth for the server version: package.json
const PKG = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf-8"));
const VERSION = PKG.version;

// Load and index all content from disk (submodule + extended/).
const content = loadContentFromDisk();

const server = new McpServer({
  name: "amcharts5",
  version: VERSION,
});

registerTools(server, content);

const transport = new StdioServerTransport();
await server.connect(transport);
