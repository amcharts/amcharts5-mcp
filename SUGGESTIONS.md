# amCharts MCP & Skill — Improvement Suggestions

Running list of suggested fixes/improvements for the amCharts 5 MCP server
(`c:/projects/amcharts5-mcp`) and skill (`c:/projects/amcharts5-skill`, embedded
here as the `amcharts5-skill` submodule).

Each item is written so an agent can act on it independently. Newest at top.
Many items below were surfaced while building a settings-driven amCharts editor
(`c:/projects/dojo.amcharts/editor`), where per-setting **defaults and value
semantics** were repeatedly needed.

---

## 2026-06-04 — Review (building the chart editor)

### A. Bugs / inconsistencies

1. **Version is inconsistent across three places.**
   - `src/index.js` line ~211: `new McpServer({ name: "amcharts5", version: "1.0.0" })`
   - `server.json`: `version` and package `version` = `1.1.3`
   - `package.json`: `version` = `1.1.4`
   Pick one source of truth. At minimum read the MCP server version from
   `package.json` instead of hardcoding `1.0.0`, and bump `server.json` to match.
   > ✅ Done 2026-06-04: `src/index.js` reads `package.json` `version` (single source of truth); `server.json` both version fields bumped to `1.1.4`.

2. **`get_quick_start` `format: "esm"` doesn't actually change the imports.**
   In `src/index.js` (`get_quick_start`), the `esm` branch only relabels the
   heading ("Imports (ES modules)") but emits the *same* `importSection.body`
   (CDN/script-tag imports). Either generate real ESM imports
   (`import * as am5 from "@amcharts/amcharts5"` …) or drop the `format` option.
   > ✅ Done 2026-06-04: `esm` now emits only the ES-module import block, `html` only the CDN `<script>` block (real difference, not a relabel). Also fixed a latent bug where "Required imports" was selected as the setup section so the core pattern was never shown.

### B. Discoverability (highest impact)

3. **`search_docs` does not search the extended docs / API reference / examples.**
   `searchDocs()` iterates only the `docs` map (SKILL.md + skill `references/*.md`).
   The much larger `extendedDocs` (incl. `extended/reference/*` — the per-class API
   with settings + **defaults**) and `examples` are only reachable via `search_all`.
   An agent that reaches for `search_docs` first (natural, given the name) never
   sees the API reference. This was the root of most editor friction: the answers
   (e.g. tooltip background `cornerRadius`, axis tick `visible` default) exist in
   `extended/reference/` but were invisible to `search_docs`.
   **Fix options:** (a) make `search_docs` also scan `extendedDocs` (perhaps a
   `scope` arg: skill | all), or (b) clearly state in the `search_docs` description
   that it covers only the skill and to use `search_all` for API/defaults.
   > ✅ Done 2026-06-04: both — added a `scope` arg (`skill` default | `all`) so `search_docs` can scan `extendedDocs`, results tagged by source (`skill/…` vs `extended/…`), and rewrote the description to point at the API/defaults layer. Verified `scope:all` surfaces `extended/charts/xy-chart/cursor.md` for "cursor line strokeDasharray" and `extended/reference/ipointedrectanglesettings.md` for "pointerBaseWidth".

4. **No first-class way to get a class's API reference (settings + defaults).**
   `extended/reference/<class>.md`, `i<class>settings.md`, `i<class>private.md`
   exist and contain the settings tables with defaults, but:
   - `get_doc`'s description never mentions `reference/` paths (its examples are
     `charts/…`, `concepts/events`, `getting-started/integrations/react`), so agents
     don't know to call `get_doc("reference/xycursor")`.
   - The split across class page / `i…settings` / `i…private` is non-obvious.
   **Fix:** add a dedicated tool, e.g. `get_api_reference(className)`, that
   normalizes the name (`"XYCursor"`→`xycursor`) and returns the class page plus its
   settings (and optionally private settings). Also add a `reference/<class>`
   example to the `get_doc` description. This is the single most useful addition for
   tooling/codegen use cases that need exact setting names and defaults.
   > ✅ Done 2026-06-04: added `get_api_reference(className, includePrivate?)` — normalizes the name (`"XYCursor"`→`xycursor`, punctuation ignored) and returns the class page + `i<class>settings` (defaults) + optional `i<class>private`; friendly not-found with substring suggestions. Added a `reference/<class>` example to `get_doc`'s description.

### C. Skill content additions (from editor build)

These belong in the skill (SKILL.md or `references/*.md`) so they're reachable via
`search_docs`, not just buried in `extended/`. Verified absent (or thin) in the
current skill text.

5. **`Percent` value semantics.** `am5.percent(50).percent === 50` but
   `am5.percent(50).value === 0.5` (normalized 0–1). When *reading back* a percent
   setting (e.g. `sprite.get("x")`), use `.percent` for a 0–100 number; `.value`
   gives the fraction. (Editor bug: a position set to `am5.percent(50)` read back as
   `0.5`.) Not currently called out.

6. **Tooltip styling depth.** `getFillFromSprite`, `autoTextColor`,
   `getStrokeFromSprite`, and `PointedRectangle` appear nowhere in the skill text
   (only in `extended/concepts/common-elements/tooltips`). Add a short
   "Styling a tooltip" block to SKILL.md:
   - background is a **`PointedRectangle`** → single **`cornerRadius`** (NOT the
     four `cornerRadiusTL/TR/BL/BR` of `RoundedRectangle`): `tooltip.get("background").setAll({ fill, fillOpacity, stroke, strokeOpacity, strokeWidth, cornerRadius })`.
   - text color: set `autoTextColor:false` then `tooltip.label.setAll({ fill })`.
   - bg color: set `getFillFromSprite:false` then background `fill`.

7. **A series tooltip with no `labelText`/`tooltipText` renders blank.** Enabling a
   dedicated `am5.Tooltip` without text shows an empty bubble. Note that series
   tooltip text lives on `tooltip.labelText` (or `series.tooltipText`); column/bar
   series often put it on `series.columns.template.tooltipText`.

8. **Axis ticks default to `visible:false`.** To show ticks you must set
   `ticks.template.set("visible", true)` (and a non-zero `strokeOpacity`); grid and
   labels default visible. Worth stating which axis sub-elements are on/off by
   default. (Editor bug: a "show ticks" toggle that flipped `forceHidden` couldn't
   reveal ticks because `visible` was still false.)

9. **`forceHidden` vs `visible`.** Already mentioned for cursor lines; make the rule
   general: `forceHidden:true` always hides (immune to states/library); `visible`
   can be re-set by the library for some elements (notably cursor lines). For
   persistent hide use `forceHidden`; for elements that default hidden (ticks)
   you must raise `visible`.

10. **DateAxis series field is `valueXField` (timestamps).** There is **no
    `dateXField`** in v5 — a common wrong guess. The skill uses `valueXField` in
    examples but never states the negative explicitly.

11. **Reading settings during the appear animation returns transient values.**
    Right after `series.appear()` / `chart.appear()`, `get("opacity")` (and other
    animated settings) may read mid-animation (e.g. `0`). Read after animation or
    avoid persisting such reads. (Editor bug: `opacity:0` baked into generated code.)

12. **`entity.set(key, value)` returns the value.** Enables
    `var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}))`. Minor but
    handy and used in templates.

> ✅ Done 2026-06-04 (items 5–12): added to the skill submodule, verified against
> `extended/reference/*.md` first.
> - **SKILL.md**: Settings API section — `set()` returns the value (12), `Percent`
>   `.percent` (0–100) vs `.value` (0–1) read semantics (5), reading animated
>   settings mid-`appear()` is transient (11). Tooltip section — empty tooltip
>   renders blank (7) + a "Styling a tooltip" block: background is a
>   `PointedRectangle` → single `cornerRadius`, `getFillFromSprite`/`autoTextColor`/
>   `tooltip.label` (6). Pitfall #29 rewritten as a general `forceHidden` vs
>   `visible` rule incl. ticks-default-hidden (9).
> - **references/xy.md**: no `dateXField` in v5; `DateAxis` uses `valueXField`
>   timestamps (10); ticks default `visible:false` — raise `visible` to show (8);
>   column/bar tooltip text lives on `columns.template.tooltipText` + empty-tooltip
>   note (7). Verified: `cornerRadius` is on `ipointedrectanglesettings.md` (single,
>   vs four corners on `iroundedrectanglesettings.md`); `getFillFromSprite`,
>   `autoTextColor`, `getStrokeFromSprite`, `label` confirmed on `tooltip.md`.

---

## Notes
- Project convention (dojo CLAUDE.md) also says to append suggestions to
  `dojo.amcharts/docs/mcp-suggestions.md`; this file is the in-repo copy so they're
  not missed. Keep both in mind.
- CLAUDE.md references stale paths `amcharts-mcp` / `amcharts-skill`; the real dirs
  are `amcharts5-mcp` / `amcharts5-skill`.
