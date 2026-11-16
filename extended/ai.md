---
title: "amCharts + AI"
source: "https://docs.amcharts.com/v5/ai/"
scraped: "2026-11-16"
---

> AI models know amCharts 5 well - but how you use them makes a big difference. This guide covers the key scenarios and how to get the most out of each one.

AI models know amCharts 5 well - but *how* you use them makes a big difference. This guide covers the key scenarios and how to get the most out of each one.

> **Using Claude or ChatGPT?** Install the amCharts 5 plugin for [Claude](https://docs.amcharts.com/v5/ai/#the-amcharts-5-plugin-for-claude) or [ChatGPT](https://docs.amcharts.com/v5/ai/#the-amcharts-5-plugin-for-chatgpt): the skill and the MCP server in one step.
>
> **Quick downloads** - drop these into your project for immediately better AI-generated charts:
>
> * [Rules file](https://github.com/amcharts/amcharts5-skill/blob/main/cursorrules) (works as `AGENTS.md`, `.cursorrules`, `CLAUDE.md`, etc.)
> * [amCharts 5 Skill on GitHub](https://github.com/amcharts/amcharts5-skill)
> * [MCP Server on npm](https://www.npmjs.com/package/@amcharts/amcharts5-mcp) (or just use the hosted URL: `https://mcp.amcharts.com/mcp`)
> * Already have amCharts 5 installed? It comes with [docs for AI agents](https://docs.amcharts.com/v5/ai/#docs-that-come-with-the-library) - nothing to download.

## How AI models generate amCharts code

All major AI models (Claude, ChatGPT, Gemini, etc.) have amCharts 5 in their training data. That means they can produce working chart code out of the box - no special setup needed.

However, AI models have a **knowledge cutoff date**. They were trained on a snapshot of the internet, and anything added or changed after that date is invisible to them. This matters for newer amCharts features, recent API changes, or less common chart types where the model's memory may be incomplete.

The good news: most AI platforms now offer **web search and documentation fetching** tools that let the model look things up in real time. When available, these tools dramatically improve code accuracy.

The bottom line: **the closer the AI is to current documentation, the better the results.** There are three ways to help:

* [**Bundled docs**](https://docs.amcharts.com/v5/ai/#docs-that-come-with-the-library) - `AGENTS.md` and a `docs/` folder that come with the library itself, matching the version you installed. Nothing to set up: just tell the AI where they are.
* [**MCP Server**](https://docs.amcharts.com/v5/ai/mcp/) - the AI queries our documentation, examples, and API reference on demand. Use the hosted server (just add a URL, no install) or run it yourself. Works with any MCP client: Claude Code, Cursor, Windsurf, VS Code + Copilot, Codex CLI, Gemini CLI, Cline, Zed, and browser chat: claude.ai from the [Connectors Directory](https://claude.ai/directory/amcharts), ChatGPT as a plugin.
* [**AI Skill**](https://docs.amcharts.com/v5/ai/#5-use-the-amcharts-ai-skill) - a structured reference the AI reads upfront. Works with any AI tool, including those without MCP support.

The sections below cover how to get the best results depending on your setup.

## The amCharts 5 plugin for Claude

In Claude, one plugin adds both the amCharts 5 skill and our hosted MCP server. No sign-in is needed.

| Where                                | How                                                                                                                                                    |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| claude.ai and the Claude Desktop app | Open the [amCharts 5 plugin](https://claude.ai/customize/plugins/id/88417dfb-479c-409d-8571-796c3a299aac%40anthropic-plugin-directory) and install it. |
| Claude Code                          | In a session: `/plugin install amcharts5@anthropic-plugin-directory`. In your shell: `claude plugin install amcharts5@anthropic-plugin-directory`.     |

For the MCP server only, without the skill, add the [amCharts 5 connector](https://claude.ai/directory/amcharts) on claude.ai, or run `claude mcp add --transport http amcharts5 https://mcp.amcharts.com/mcp` in Claude Code. See the [MCP server guide](https://docs.amcharts.com/v5/ai/mcp/).

## The amCharts 5 plugin for ChatGPT

In ChatGPT, the [amCharts 5 plugin](https://chatgpt.com/plugins/plugin_asdk_app_6ada25db53b4819184e6dc760cb5daf5) adds the amCharts 5 skill and our hosted MCP server. Open it and install it.

To add only the MCP server yourself (also on the Free plan), open [Plugins](https://chatgpt.com/plugins) > **+** > **Add custom MCP server**, set the URL to `https://mcp.amcharts.com/mcp` and Authentication to **No authentication**, click **Create as a plugin**, then type **@amCharts** in a chat. See the [MCP server guide](https://docs.amcharts.com/v5/ai/mcp/).

## Docs that come with the library

Since version 5.21.0, both the npm package and the ZIP download include docs written for AI coding agents:

* `AGENTS.md` - the entry point: the rules most often broken, and where to look for what.
* `docs/` - a copy of the [amCharts 5 skill](https://docs.amcharts.com/v5/ai/#5-use-the-amcharts-ai-skill): `docs/index.md` with core rules and patterns, and `docs/references/` with a file per chart family.
* `examples/` - working code for every chart type, listed with descriptions and tags in `examples/examples.json`.

The big advantage: they match the exact version you have installed, so the AI never works from docs that are ahead of or behind your code. `AGENTS.md` also tells the AI to check `CHANGELOG.md` for anything newer than the docs.

To use them, point your AI tool at the file. For example, add this line to your project's rules file (`AGENTS.md`, `CLAUDE.md`, `.cursor/rules/`, etc.):

```sh title="Prompt"
Before writing chart code, read node_modules/@amcharts/amcharts5/AGENTS.md and follow it.
```

With the ZIP download, use the path where you placed the amCharts files instead.

The bundled docs work with any AI tool that can read project files, and work offline. For the full documentation and API reference, add the [MCP server](https://docs.amcharts.com/v5/ai/mcp/) as well.

## Scenario 1: Browser-based chat

This is the simplest and most reliable way to generate amCharts code with AI.

### Why it works well

Browser-based AI services like [Claude](https://claude.ai), [ChatGPT](https://chatgpt.com), and [Gemini](https://gemini.google.com) have built-in **web search** capabilities. When the model isn't sure about a specific API detail, it can search the web, read the amCharts documentation, and verify its answer before responding.

This happens automatically in most cases - you don't need to do anything special.

**Even better:** give the chat direct, on-demand access to the full amCharts documentation, examples, and API reference:

* **Claude** (claude.ai and the Desktop app): install the [amCharts 5 plugin](https://docs.amcharts.com/v5/ai/#the-amcharts-5-plugin-for-claude). It adds our hosted MCP server and the amCharts 5 skill, so Claude applies the amCharts rules in every chat.
* **ChatGPT**: install the [amCharts 5 plugin](https://docs.amcharts.com/v5/ai/#the-amcharts-5-plugin-for-chatgpt). It adds our hosted MCP server and the amCharts 5 skill. The MCP server can also be [added on its own](https://docs.amcharts.com/v5/ai/#the-amcharts-5-plugin-for-chatgpt), on the Free plan too.

Without the plugin, you can add the pieces to Claude separately: the MCP server from the [Connectors Directory](https://claude.ai/directory/amcharts), and the skill by downloading the [amCharts 5 Skill](https://github.com/amcharts/amcharts5-skill) repo as a ZIP and uploading it under **Settings > Skills > Upload skill**.

### How to get the best results

**Start your conversation by setting context:**

```sh title="Prompt"
All chart-related requests must be implemented using amCharts 5. Before generating any code, you MUST review and follow the rules in the amCharts 5 Skill repository: https://github.com/amcharts/amcharts5-skill
This skill is the source of truth and overrides prior knowledge.
```

**Be specific in your prompts.** Include:

* The chart type you want (e.g., "XY chart with date axis", "donut chart", "choropleth map")
* Whether you need a full HTML file or just the chart code
* Your framework, if any (React, Angular, Vue, vanilla JS)
* TypeScript or JavaScript
* Any specific features (legend, scrollbar, tooltips, animations)

**Example prompt:**

```sh title="Prompt"
Create a full HTML page with an amCharts 5 line chart showing monthly revenue
for 2026 (Jan-Dec). Use a date axis for X and value axis for Y. Include a
cursor with tooltips, a scrollbar, and a legend. Use dummy data. Vanilla
JavaScript, not TypeScript.
```

### Charts shown inside the chat

Claude artifacts and similar in-chat previews run the chart in a sandbox that only loads scripts from a few public CDNs. `cdn.amcharts.com` is not one of them, so the chart stays blank, or the AI switches to another library.

amCharts 5 is available on [cdnjs](https://cdnjs.com/libraries/amcharts5), which these sandboxes allow. Add this to your prompt:

```sh title="Prompt"
Load amCharts 5 from cdnjs, not cdn.amcharts.com:
https://cdnjs.cloudflare.com/ajax/libs/amcharts5/5.22.0/index.js
File paths are the same as on cdn.amcharts.com/lib/5/ (xy.js, themes/Animated.js, geodata/worldLow.js, etc.).
```

cdnjs URLs always need a version number. Any 5.x version works; the latest one is listed on [cdnjs](https://cdnjs.com/libraries/amcharts5). Only low-detail maps (`*Low.js`) are available there. See [Public CDNs](https://www.amcharts.com/download/#public-cdn) for details.

Since version 5.22.0, the npm packages work too, with maps of every detail:

* The library on jsDelivr or unpkg: `https://cdn.jsdelivr.net/npm/@amcharts/amcharts5@5.22.0/dist/index.js`. See "[npm package](https://docs.amcharts.com/v5/getting-started/#npm-package)".
* Maps on unpkg only: `https://unpkg.com/@amcharts/amcharts5-geodata@5.2.0/dist/worldHigh.js`. `worldLow.js` and `usaLow.js` are also in the library's `dist/geodata/`.

### Web search availability by platform

| Platform                            | Web search     | Notes                                                                                                                                     |
| ----------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [Claude](https://claude.ai)         | Yes - Built-in | Searches automatically when needed. The [amCharts 5 plugin](https://docs.amcharts.com/v5/ai/#the-amcharts-5-plugin-for-claude) adds our skill and MCP server.      |
| [ChatGPT](https://chatgpt.com)      | Yes - Built-in | Available on all plans, including free. The [amCharts 5 plugin](https://docs.amcharts.com/v5/ai/#the-amcharts-5-plugin-for-chatgpt) adds our skill and MCP server. |
| [Gemini](https://gemini.google.com) | Yes - Built-in | Uses Google Search grounding.                                                                                                             |
| [Mistral](https://chat.mistral.ai)  | Yes - Built-in | Web search available in Le Chat.                                                                                                          |
| [Meta AI](https://meta.ai)          | Yes - Built-in | Can search the web for current info.                                                                                                      |

> **Pro tip:** If the AI produces code that doesn't look right, paste the error back and ask it to check the amCharts docs. Models with web search can self-correct very effectively.
>
> **Example prompt:**
>
> ```sh title="Prompt"
> This code throws "[object Object] is not a valid color" on line 42.
> Check the amCharts 5 docs at https://docs.amcharts.com/v5/ and fix it.
> ```

## Scenario 2: AI code editors and CLI agents

This covers IDE assistants (Cursor, Windsurf, VS Code + Copilot) and terminal agents (Claude Code, Codex CLI, Gemini CLI). They are powerful, but many of them **don't search the web by default**. When the AI works from training data alone, it may get API details wrong - especially for advanced or newer features.

### The core issue

Unlike browser-based chat, most editor assistants see your project files and codebase, but won't browse the web or read external documentation unless you set this up or ask for it explicitly.

This leads to:

* Occasionally incorrect method names or option structures
* Mixing up amCharts 4 and amCharts 5 syntax
* Missing newer features added after the model's training cutoff

### How to get the best results

#### 1. Use the MCP Server (recommended)

**In Claude Code**, install the [amCharts 5 plugin](https://docs.amcharts.com/v5/ai/#the-amcharts-5-plugin-for-claude) instead. It adds the MCP server and the amCharts 5 skill in one step:

```sh
/plugin install amcharts5@anthropic-plugin-directory
```

The [**amCharts 5 MCP Server**](https://docs.amcharts.com/v5/ai/mcp/) is the easiest and most comprehensive way to give your AI assistant access to amCharts documentation. It provides **1,500+ documents** on demand: 140+ documentation pages, 280+ code examples, and 1,000+ class API references. The AI queries only what it needs - no manual copying, no context waste.

Works with Claude Code, Claude Desktop, Cursor, Windsurf, VS Code + Copilot, Codex CLI, Gemini CLI, Cline, Zed, and any other MCP client - and browser chat: claude.ai (from the Connectors Directory) and ChatGPT (as a plugin). The hosted server needs no install; clients that only speak stdio can bridge to it with `npx mcp-remote https://mcp.amcharts.com/mcp`.

[**See installation instructions**](https://docs.amcharts.com/v5/ai/mcp/)

#### 2. Enable web search (if available)

Most tools can reach the web - some automatically, some only when asked:

| Tool              | Feature                | How to use                                                                                                                  |
| ----------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Cursor            | `@Web`                 | Type `@Web` in chat to include live search results in the context for that prompt.                                          |
| Cursor            | `@Docs`                | Go to **Cursor Settings > Indexing & Docs > Add Doc** and add `https://docs.amcharts.com/v5/`. Cursor will index the docs.  |
| Windsurf          | Web search             | Available in Cascade. The AI can search when it determines external info is needed; you can also paste a docs URL directly. |
| VS Code + Copilot | `#fetch`, `#websearch` | `#fetch` is built in - pass it a docs URL. `#websearch` needs the free **Web Search for Copilot** extension.                |
| Claude Code       | Built-in               | Searches and fetches pages on its own. Point it at a docs URL when you want a specific page read.                           |
| Codex CLI         | Web search             | Enable web search in the Codex config; then ask it to check the amCharts docs.                                              |
| Gemini CLI        | Built-in               | Google Search grounding is on by default.                                                                                   |

#### 3. Index the amCharts documentation

This is the **single most impactful thing** you can do if MCP is not available. By indexing the amCharts docs in your editor, the AI gets direct access to accurate, up-to-date API information every time it generates code.

**In Cursor:**

1. Open **Cursor Settings > Indexing & Docs**
2. Click **"+ Add Doc"**
3. Paste: `https://docs.amcharts.com/v5/`
4. Let Cursor index the pages
5. When prompting, use `@Docs amCharts` to include the documentation as context

If your editor supports custom documentation indexing, you can connect it to the amCharts docs in a similar way. Check your editor's documentation for details.

#### 4. Add a project-level instruction file

Every AI editor and agent reads a rules file from your project root that guides its behavior. We provide a ready-made file with the critical amCharts 5 patterns, common pitfalls, and v4-to-v5 migration rules.

[Download the rules file](https://github.com/amcharts/amcharts5-skill/blob/main/cursorrules)

The simplest option is to save it as `AGENTS.md` in your project root. That one file is read natively by Cursor, Windsurf, VS Code + Copilot, Codex CLI, Gemini CLI, Zed, and Claude Code (when no `CLAUDE.md` is present). If you already have a tool-specific file, append the contents to it instead:

* **Cursor** - `.cursor/rules/amcharts5.mdc` (the legacy `.cursorrules` still works)
* **Windsurf** - `.windsurf/rules/amcharts5.md` (the legacy `.windsurfrules` still works)
* **VS Code + Copilot** - `.github/copilot-instructions.md`
* **Claude Code** - `CLAUDE.md` (or a `CLAUDE.md` containing just `@AGENTS.md` to share one file)
* **Gemini CLI** - `GEMINI.md`

If amCharts 5 is installed in your project, the rules file can simply point to the [bundled docs](https://docs.amcharts.com/v5/ai/#docs-that-come-with-the-library) instead - they always match your installed version.

Or write your own minimal version:

```sh title="Prompt"
When generating charts, always use amCharts 5 (not v4).
Import from @amcharts/amcharts5 and related packages.
Use am5.Root.new() to create the root element.
Apply the Animated and ResponsiveMax themes by default.
```

#### 5. Use the amCharts AI skill

We also provide a single **AI skill** - a structured reference that AI agents can read on demand. It follows the [Anthropic skill spec](https://github.com/anthropics/skills) with one central `SKILL.md` entry point and separate reference files per chart family. This works with any AI tool, including those without MCP support.

[Download amCharts 5 Skill (GitHub)](https://github.com/amcharts/amcharts5-skill/)

The skill folder structure:

```sh title="Structure"
amcharts5-skill/
├── SKILL.md              - entry point: core rules, package map, routing table
└── references/
    ├── xy.md             - line, area, bar, column, candlestick, scatter
    ├── pie.md            - pie, donut, funnel, pyramid, pictorial stacked
    ├── map.md            - world/country maps, choropleth, bubble maps
    ├── hierarchy.md      - treemap, force-directed, sunburst, pack, tree
    ├── flow.md           - Sankey, chord, arc diagram
    ├── radar.md          - spider/radar charts, gauges, polar charts
    ├── stock.md          - financial stock charts, candlestick, indicators
    ├── timeline.md       - serpentine, spiral, custom-curve charts
    ├── gantt.md          - Gantt project charts, task hierarchy, editing
    ├── wordcloud.md      - word cloud, tag cloud, sentence cloud
    ├── venn.md           - Venn diagrams, set overlaps
    └── ui-elements.md    - legends, tooltips, labels, buttons, scrollbars
```

The AI reads `SKILL.md` first (core patterns + which reference to load), then reads only the relevant reference file for the chart type being built. This keeps context lean and focused.

> **Note:** The same content comes with the library, as its [`docs/` folder](https://docs.amcharts.com/v5/ai/#docs-that-come-with-the-library). If amCharts 5 is installed in your project, you may not need to download the skill separately.

**For Claude Code, claude.ai and ChatGPT** - the amCharts 5 plugin for [Claude](https://docs.amcharts.com/v5/ai/#the-amcharts-5-plugin-for-claude) or [ChatGPT](https://docs.amcharts.com/v5/ai/#the-amcharts-5-plugin-for-chatgpt) includes the skill. The steps below are for adding the skill on its own.

**For Claude Code** - copy the skill folder into your project's `.claude/skills/` folder and it is picked up automatically. The skill is in the `amcharts5-skill` subfolder of the repository:

```sh
git clone https://github.com/amcharts/amcharts5-skill
cp -r amcharts5-skill/amcharts5-skill .claude/skills/
```

If you've already installed the MCP server, you may not need this - the MCP server includes all the same content and more.

**For Claude.ai** - download the repo as a ZIP and upload it under **Settings > Skills**.

**For Cursor / Windsurf / Copilot / Codex CLI / Gemini CLI** - place the folder in your project root or a `docs/` folder and reference it from your rules file (e.g. "Read `docs/amcharts5-skill/SKILL.md` before writing chart code"). Cursor can also pull it in per prompt with `@file`.

**For any API** - paste `SKILL.md` plus the relevant reference into the system prompt.

#### 6. Keep a reference example in your project

Having a working amCharts example file in your project gives the AI something concrete to learn from. Create a file like `charts/example-chart.ts` with a well-structured chart, and the AI will pick up on patterns like import structure, root element creation, and theme application.

#### 7. Paste relevant docs into the prompt

When all else fails, the most reliable approach is to copy a relevant section from the [amCharts 5 documentation](https://docs.amcharts.com/v5/) directly into your prompt:

```sh title="Prompt"
Here is the relevant amCharts 5 documentation for XY charts:

[paste docs here]

Now create a bar chart with these specifications: ...
```

This guarantees the AI has the right information, regardless of its training data.

### MCP server vs. Skill

|                      | Skill                                                   | MCP server                                                                                                                             |
| -------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **How it works**     | Loads reference docs into context upfront               | AI queries only what it needs on demand                                                                                                |
| **Content**          | Curated skill reference                                 | 1,500+ docs, examples, and class API references                                                                                        |
| **Context usage**    | Higher - a whole reference file loaded at once          | Lower - only relevant sections fetched                                                                                                 |
| **Setup**            | Copy files into project, or upload to claude.ai         | Add the hosted URL - or one install command to run it locally                                                                          |
| **Works with**       | Any AI tool (Claude, ChatGPT, Cursor, Copilot, etc.)    | MCP-compatible tools (see [MCP setup guide](https://docs.amcharts.com/v5/ai/mcp/))                                                                              |
| **Best for**         | Tools without MCP support; offline or air-gapped setups | Claude Code, Claude Desktop, Cursor, Windsurf, VS Code + Copilot, Codex CLI, Gemini CLI, and claude.ai / ChatGPT (plugin or connector) |
| **Stays up to date** | Manual update needed (git pull)                         | Hosted server is always current; local install updates via npx                                                                         |

> **Recommendation:** If your tool supports MCP, use the [MCP server](https://docs.amcharts.com/v5/ai/mcp/) - it has much more content and uses context more efficiently. If your tool doesn't support MCP, use the skill. You can also use both: in Claude and ChatGPT, the amCharts 5 plugin ([Claude](https://docs.amcharts.com/v5/ai/#the-amcharts-5-plugin-for-claude), [ChatGPT](https://docs.amcharts.com/v5/ai/#the-amcharts-5-plugin-for-chatgpt)) installs both at once.

## Scenario 3: Using the API

If you're building tools or applications that use AI to generate amCharts code programmatically (via the Claude API, OpenAI API, or Gemini API), you can enable web search as a tool to get the same quality boost.

### Claude API

```js
const response = await anthropic.messages.create({
  model: "claude-opus-5-5",
  max_tokens: 16000,
  tools: [{
    type: "web_search_20260209",
    name: "web_search"
  }],
  messages: [{
    role: "user",
    content: "Create an amCharts 5 XY chart with..."
  }]
});
```

### OpenAI API (Responses API)

```js
const response = await openai.responses.create({
  model: "gpt-5.6",
  tools: [{ type: "web_search" }],
  input: "Create an amCharts 5 XY chart with..."
});
```

### Gemini API

```python
from google import genai
from google.genai import types

client = genai.Client()
response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents="Create an amCharts 5 XY chart with...",
    config=types.GenerateContentConfig(
        tools=[types.Tool(google_search=types.GoogleSearch())]
    ),
)
```

### Attach the MCP server (Claude API)

Instead of (or alongside) web search, you can attach our hosted MCP server directly via the [MCP connector](https://platform.claude.com/docs/en/agents-and-tools/mcp-connector), giving the model on-demand access to amCharts docs. Both halves are required: `mcp_servers` declares the server, and an `mcp_toolset` entry in `tools` exposes it to the model.

```js
const response = await anthropic.beta.messages.create({
  model: "claude-opus-5-5",
  max_tokens: 16000,
  betas: ["mcp-client-2025-11-20"],
  mcp_servers: [{
    type: "url",
    url: "https://mcp.amcharts.com/mcp",
    name: "amcharts5"
  }],
  tools: [{ type: "mcp_toolset", mcp_server_name: "amcharts5" }],
  messages: [{ role: "user", content: "Create an amCharts 5 XY chart with..." }]
});
```

### System prompt recommendation

When using any API, include a system prompt that guides the model. For even better results, include the content of the relevant [skill file](https://github.com/amcharts/amcharts5-skill/) in your system prompt - this gives the model a compact, accurate reference for the chart type you need.

```sh title="Prompt"
You are an expert in amCharts 5 data visualization library.
Always use amCharts 5 (not v4). When generating chart code:
- Use am5.Root.new() for the root element
- Import from @amcharts/amcharts5 and sub-packages
- Apply am5themes_Animated and am5themes_ResponsiveMax themes by default
- If unsure about any API detail, search the documentation
  at https://docs.amcharts.com/v5/ before writing code
```

> **Pro tip:** For API usage without web search or MCP, paste `SKILL.md` plus the relevant reference file (e.g., `references/xy.md`) directly into your system prompt. This gives the model all the critical patterns without needing to search.

## Recommended models for amCharts code

Not all AI models produce equally good chart code. Based on our testing, here are the models that currently generate the most accurate and idiomatic amCharts 5 output. Model names change every few months - if a newer version of any of these has shipped, use that.

### Best results

| Model                | Why it works well                                                                                                                                                                              | Best for                                                     |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Claude Opus 5**    | Strongest at understanding large codebases and complex configurations. Produces clean, well-structured chart code with correct v5 patterns. Excellent at self-correction when pointed to docs. | Complex charts, multi-panel stock charts, large projects     |
| **GPT-5.6 (Sol)**    | OpenAI's flagship, used in ChatGPT, Codex, and the API. Reliable code generation across many chart types and strong when mixing amCharts with React, Angular, or Vue boilerplate.              | Quick prototyping, framework integrations, polyglot projects |
| **Gemini 3.8 Flash** | Google Search grounding gives it excellent access to current documentation. Fast, with a very large context window for complex setups.                                                         | Documentation-heavy queries, Google ecosystem projects       |
| **Claude Sonnet 5**  | Best balance of speed, quality, and cost. Handles most chart types correctly and is fast enough for real-time coding assistance in editors.                                                    | Day-to-day coding, IDE assistants, cost-conscious teams      |

### Also good

| Model                 | Notes                                                                                                                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **GPT-5.6 Terra**     | Mid-tier of the GPT-5.6 family. Close to Sol on chart code at roughly half the price.                                                                                              |
| **Claude Haiku 4.5**  | Fast and cheap. Fine for simple charts and edits, especially with the MCP server or skill attached.                                                                                |
| **DeepSeek V4**       | Strong open-weight option. Good reasoning on chart configuration, but may need more explicit prompting for amCharts-specific patterns.                                             |
| **Qwen3 Coder**       | Capable coding model, especially for local/self-hosted setups. Performs well with the [rules file](https://github.com/amcharts/amcharts5-skill/blob/main/cursorrules) to guide it. |
| **Mistral Codestral** | Good for IDE integrations. Benefits significantly from having the skill or rules file in the project.                                                                              |

> **Key insight:** The gap between "best" and "also good" models shrinks dramatically when you provide context - whether through MCP, web search, the [skill](https://github.com/amcharts/amcharts5-skill/), or the [rules file](https://github.com/amcharts/amcharts5-skill/blob/main/cursorrules). A mid-tier model with the right context often outperforms a top model without it.

## Quick reference: what works where

| Technique                                                | Browser chat                                       | Cursor                            | Windsurf                            | VS Code + Copilot                          | Claude Code                      |
| -------------------------------------------------------- | -------------------------------------------------- | --------------------------------- | ----------------------------------- | ------------------------------------------ | -------------------------------- |
| Web search                                               | Yes - automatic                                    | Yes - @Web                        | Yes - available                     | Yes - #fetch / #websearch                  | Yes - built-in                   |
| [**MCP server**](https://docs.amcharts.com/v5/ai/mcp/)                            | Yes - Claude plugin or connector                   | Yes - .cursor/mcp.json            | Yes - mcp_config.json               | Yes - .vscode/mcp.json                     | Yes - plugin or `claude mcp add` |
| Index amCharts docs                                      | -                                                  | Yes - @Docs                       | -                                   | -                                          | -                                |
| Project rules file                                       | -                                                  | Yes - AGENTS.md or .cursor/rules/ | Yes - AGENTS.md or .windsurf/rules/ | Yes - AGENTS.md or copilot-instructions.md | Yes - CLAUDE.md                  |
| Paste docs into prompt                                   | Yes                                                | Yes                               | Yes                                 | Yes                                        | Yes                              |
| Reference example in project                             | -                                                  | Yes                               | Yes                                 | Yes                                        | Yes                              |
| [AI skill](https://github.com/amcharts/amcharts5-skill/) | Yes - Claude plugin, upload to claude.ai, or paste | Yes - project root                | Yes - project root                  | Yes - project root                         | Yes - plugin or .claude/skills/  |

**Codex CLI and Gemini CLI** follow the Claude Code column: MCP via their own config file, `AGENTS.md` / `GEMINI.md` as the rules file, web search available, and the skill folder anywhere in the project.

## Summary

1. **Browser-based chat** gives the best results out of the box - web search is built in and handles most cases automatically. In Claude and ChatGPT, the amCharts 5 plugin ([Claude](https://docs.amcharts.com/v5/ai/#the-amcharts-5-plugin-for-claude), [ChatGPT](https://docs.amcharts.com/v5/ai/#the-amcharts-5-plugin-for-chatgpt)) makes it even better. For charts shown inside the chat, [load amCharts from cdnjs](https://docs.amcharts.com/v5/ai/#charts-shown-inside-the-chat).
2. **Code editors and CLI agents** need a little setup but can match browser-quality results. The [**MCP server**](https://docs.amcharts.com/v5/ai/mcp/) is the fastest path - add the hosted URL (or one install command) and the AI gets 1,500+ documentation pages, code examples, and API references.
3. **The single biggest improvement** in any scenario is making sure the AI has access to the [amCharts 5 documentation](https://docs.amcharts.com/v5/), whether through MCP, web search, doc indexing, the skill, the [bundled docs](https://docs.amcharts.com/v5/ai/#docs-that-come-with-the-library), or pasting docs into the prompt.
4. **Always specify amCharts 5** in your prompts to avoid confusion with older versions. An `AGENTS.md` with our rules file does this for every prompt.
5. **For MCP-compatible tools** (Claude Code, Claude Desktop, Cursor, Windsurf, VS Code + Copilot, Codex CLI, Gemini CLI), add the [MCP server](https://docs.amcharts.com/v5/ai/mcp/) - it's the most comprehensive and context-efficient option available.

Still unsure where to start? Open [Claude](https://claude.ai) or [ChatGPT](https://chatgpt.com), browse our [demo gallery](https://www.amcharts.com/demos/) where most demos include sample AI prompts you can copy, and see the results for yourself.
