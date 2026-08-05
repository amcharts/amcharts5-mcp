# amCharts MCP & Skill — Improvement Suggestions

Running list of suggested fixes/improvements for the amCharts 5 MCP server
(`c:/projects/amcharts5-mcp`) and skill (`c:/projects/amcharts5-skill`, embedded
here as the `amcharts5-skill` submodule).

Each item is written so an agent can act on it independently. Newest at top.
Many items below were surfaced while building a settings-driven amCharts editor
(`c:/projects/dojo.amcharts/editor`), where per-setting **defaults and value
semantics** were repeatedly needed.

---

## 2026-07-19 — GOTCHA: custom-GeoJSON MapPolygonSeries needs CLOCKWISE exterior rings (else the map floods)

**Type:** Skill docs / common-pitfalls. High value — silent, total map failure with a non-obvious cause.

**Source:** Built a choropleth of Great Britain from a custom GeoJSON of 4,779 small square grid
cells (each a ~0.083° box), fed to `am5map.MapPolygonSeries` via `geoJSON:` with `geoMercator()`.
The polygons loaded (`series.mapPolygons.length` was correct) and `chart.convert()` placed the
geographic bounds correctly, but **every cell rendered filled across the entire viewport** — the
whole map was one solid color with the actual shape showing only as a tiny sliver. Looked like a
zoom/fit bug; wasted time chasing `homeZoomLevel`/`goHome`/`zoomToGeoBounds` before finding the
real cause.

**Cause:** amCharts maps project on a sphere (d3-geo). On a sphere, ring **winding order** decides
which side of the ring is "inside." The GeoJSON spec (RFC 7946) says exterior rings should be
**counterclockwise**, but d3-geo treats a CCW ring as *the whole globe minus the polygon*. So each
small CCW square was rendered as "everything except this square," and 4,779 of them overlapping
flooded the map. Programmatically-generated GeoJSON (grids, cells, buffers, anything not exported
by a GIS tool that already winds clockwise) commonly comes out CCW and hits this.

**Fix:** wind exterior rings **clockwise** (reverse each ring). One-liner:
`feature.geometry.coordinates = feature.geometry.coordinates.map(ring => ring.slice().reverse())`.
After reversing, the cells rendered as proper small polygons and the country shape appeared.

**Asks:**
1. Add to skill `SKILL.md` "Common pitfalls" (map section): *"Custom GeoJSON fed to
   `MapPolygonSeries` must have **clockwise** exterior rings. CCW rings (the RFC 7946 default)
   invert under the spherical projection and fill the whole map. Reverse rings if your polygons
   render as solid fill covering everything."*
2. In `map.md`, where `geoJSON:` custom data is shown, note the winding requirement and give the
   reverse-ring snippet.
3. Optional MCP/runtime nicety: mention that `am5map` does not auto-correct winding (unlike some d3
   helpers via `d3.geoRewind`), so the caller must.

**Also worth documenting** (surfaced same session): to fit a `MapChart` to a custom region with no
country geodata, `chart.zoomToGeoBounds({ left, right, top, bottom }, duration)` works well
(left/right = longitude, top/bottom = latitude) and is more reliable than `homeGeoPoint` +
`homeZoomLevel` + `goHome()` when the only series is custom polygons.

---

## 2026-07-09 — DOCS: publish a "these settings are the default — don't specify them" reference

**Type:** Skill docs / reference. Medium value — directly improves generated-code quality.

**Source:** Ran an automated pass to strip redundant settings from 59 AI-generated demo charts
(`editor/static/charts/*`). Method: for each live element, remove each user-set setting, re-read
`get()`, and if the resolved value is unchanged the setting equalled its default. Then re-render the
cleaned config and pixel-compare to the original (identical required). This surfaced a long list of
settings that AI code routinely specifies **even though they equal the amCharts default**, e.g.:

- Hierarchy series (`Sunburst`/`Treemap`/`Partition`/`Tree`/`ForceDirected`): `childDataField: "children"`,
  `singleBranchOnly` (Sunburst default **true**; Tree/Treemap/Partition/ForceDirected default **false**),
  `downDepth: 1`, `upDepth: 0`, `topDepth: 0`.
- `PieSeries`/`FunnelSeries` etc.: `alignLabels: true` (Pie default), `orientation: "vertical"` (funnel/pyramid/pictorial),
  `bottomRatio: 0` (funnel).
- `ValueAxis`: `min: 0` is the resolved default in many all-positive contexts (area/bar/radar/step).
- Radar/Nightingale series: `maskContent: false`.
- `LineSeries`: `connect: true`, `maskBullets: false`; step line `noRisers: false`.
- `XYChart`: `maxTooltipDistance: 0`. `VennSeries`: `paddingBottom: 0`. `VoronoiTreemap`: `shapeType: "polygon"`.

A concise "default cheat-sheet" per series/axis type (or a `get_defaults(className)` MCP tool) would let
the skill emit minimal configs and let tooling flag redundant settings.

**Gotcha worth documenting alongside it:** the remove-and-re-`get()` default check is **unreliable for
runtime-mutated settings** — it gives false "is default" positives for things amCharts mutates after
render: cursor `lineX/lineY.visible` (set `false` when not hovered), physics/random layouts
(force-directed, voronoi, word-cloud placement), and baked-in **computed geometry** (e.g. serpentine/spiral
`AxisRendererCurve.points` arrays that the renderer recomputes). Any default-detection tooling must
exclude these (blacklist `visible/x/y/opacity/scale/...` and the cursor subtree) and gate on a
pixel-identical re-render. Also useful: user-set settings live in `entity._userProperties` (the
`ChartSerializer`'s source of truth), separate from the full `_settings` bag which includes theme/internal values.

---

## 2026-07-06 — BUG: an empty `ColorSet` crashes `next()` / `generateColors()`

**Type:** amCharts core bug (not just docs). Medium priority — easy to hit from any UI that lets a
user clear a palette.

**Source:** Editor lets users edit a series' `colors` (ColorSet) palette. Deleting **all** colors
(so `colorSet.set("colors", [])`) throws the moment a series iterates the palette during data
processing:

```
Uncaught TypeError: Cannot read properties of undefined (reading 'toHSL')
    at ColorSet.generateColors (ColorSet.ts:134)
    at ColorSet.getIndex (ColorSet.ts:163)
    at ColorSet.next (ColorSet.ts:178)
    at WordCloud.processDataItem (WordCloud.ts:256)
```

`generateColors()` assumes at least one base colour exists (to read `.toHSL()` from) and doesn't
guard the empty-list case. Reproduces with WordCloud; any series that calls `colorSet.next()`
(pie, etc.) is affected. A follow-on `WordCloud.ts:388 … reading 'setAll'` crash then leaves the
chart wedged.

**Suggested action:** In `ColorSet.generateColors()` / `getIndex()`, guard the empty-`colors` case
— fall back to `baseColor` (or a sensible default) instead of indexing into an empty array. At
minimum, document that a ColorSet must always contain ≥1 colour.

**Editor workaround (shipped):** an emptied palette now swaps in a fresh `ColorSet.new(root, {})`
(theme baseColor generation) and re-sets the series data so sprites re-pull the default colours —
i.e. clearing all colours reverts the chart to its default palette instead of crashing.

**Also noted:** the theme's ColorSet `baseColor` resolves asynchronously, so a *synchronous* recolor
right after swapping/unsetting a ColorSet reads a transient value — pie/column sprites momentarily
read black via `getIndex()`. Re-setting the series data (deferring the recolor to amCharts' own data
pass) is the reliable path. Worth documenting.

---

## 2026-07-06 — Document that WordCloud parser settings only apply when `text` is (re)set

**Type:** skill/docs gap — WordCloud text parsing. Low-medium priority.

**Source:** Editor feature — paste text into a WordCloud and tune the word list. Setting `text`
parses it into words+counts (great). But changing a parser setting afterward — `minValue`,
`maxCount`, `minWordLength`, `excludeWords` — does **not** re-run the parse, so the displayed word
list is stale. Confirmed: with `text` set, changing `minValue` from 1 → 3 left all 4 words showing;
they only dropped to the expected 2 after re-setting `text` (or a full rebuild that re-creates the
series with both `text` and the new parser setting).

**Suggested action:** Note in the WordCloud "Configuring word parser" docs that parser settings are
consumed at parse time — set them **before** `text`, or re-assign `text` (or otherwise re-parse)
after changing them for the change to take effect on an already-parsed cloud.

---

## 2026-07-06 — Document that `axis.dispose()` does NOT remove the axis from `chart.xAxes`/`yAxes`

**Type:** skill/docs gap — disposal asymmetry. Medium priority (caused a real delete-axis bug in the editor).

**Source:** Implementing "delete axis" in the editor. `series.dispose()` removes the series from
`chart.series` automatically, so we assumed axes behave the same. They don't: `axis.dispose()`
marks the axis disposed (`axis.isDisposed() === true`, no error thrown) but **leaves it in
`chart.xAxes` / `chart.yAxes`**. The stale, disposed axis then (a) keeps rendering/showing in any
list built from `chart.yAxes`, and (b) breaks `ChartSerializer` with `Template is disposed` when it
walks the still-listed axis.

Confirmed at runtime on a 2-Y-axis chart: `axis.dispose()` → `yAxes.length` stayed 2, `isDisposed`
true. The correct removal is `chart.yAxes.removeValue(axis)` (or `removeIndex(i)`) — the axis list
auto-disposes the removed value, so no separate `dispose()` is needed.

**Suggested action:** Note in the axis/disposal docs (and the XYChart reference) that removing an
axis must go through `chart.xAxes.removeValue(axis)` / `removeIndex()`, not `axis.dispose()`, and
call out the asymmetry with `series.dispose()` (which does self-remove from `chart.series`).

---

## 2026-07-06 — Document DateAxis live-update gotchas: labels & data grouping don't refresh on `.set()`

**Type:** skill/docs gap — DateAxis runtime behavior. Medium priority (bit us twice building the editor's date-axis format & grouping editors).

**Source:** Building live editors for `dateFormats`/`periodChangeDateFormats`/`minorDateFormats` and for `groupIntervals` on a DateAxis. Two settings apply cleanly with `axis.set(...)` but produce **no visible change** until you nudge the chart:

1. **Date format maps don't re-format existing grid labels.** After
   `axis.set('dateFormats', {...})` (or `periodChangeDateFormats` / `minorDateFormats`),
   already-rendered axis labels keep their old text. `axis.markDirtyValues()` is **not
   enough** — you must call **`axis.markDirtySize()`** to force the axis to re-run label
   formatting. Confirmed at runtime: month labels only updated (`Dec` → `[bold]Dec 23`)
   once `markDirtySize()` was called. (Period-change labels correctly keep using
   `periodChangeDateFormats`, so a changed regular format leaves the Jan/period label alone.)

2. **`groupIntervals` doesn't re-group already-loaded data.** Changing
   `axis.set('groupIntervals', [...])` (with `groupData: true`) has no effect on data that's
   already grouped — amCharts only (re)computes grouping when a series' data is set. To force
   re-grouping, re-set the same data on every series bound to the axis:
   `series.data.setAll([...series.data.values])`. Confirmed: restricting intervals to
   week/month/year dropped a series from 100 → 15 data items only after the data re-set.

**Suggested action:** Add a short "Live updates / gotchas" note to the DateAxis skill reference
(and the `dateFormats` / `groupIntervals` setting docs) spelling out `markDirtySize()` for
format maps and the data re-set for `groupIntervals`.

---

## 2026-07-05 — Document HeatLegend segment anatomy (`markers.template`, thickness)

**Type:** skill/docs gap — HeatLegend internals. Low-medium priority.

**Source:** Adding per-segment styling to a heat legend in the editor. The skill's
map reference shows creating a `HeatLegend` with `stepCount`, but never explains
how to style the individual color blocks. Confirmed at runtime:

- With `stepCount: N`, the legend renders **N discrete `RoundedRectangle`
  markers** inside `heatLegend.markerContainer`, all styled by
  `heatLegend.markers.template`. (Note: `heatLegend.markers.values` reads empty
  in some states even though `markerContainer.children` holds the N rectangles —
  style via `heatLegend.markers.template.setAll({...})`, which DOES propagate to
  the live rectangles.)
- **Segment thickness** = the marker's cross-axis dimension: for a **vertical**
  legend it's the marker `width` (default 15px) while `height` is `100%` and the
  vertical layout splits the bar into N equal slices; for a **horizontal** legend
  it's the reverse (`height` = thickness, `width` = `100%`).
- `heatLegend.markers.template` accepts the usual Graphics settings —
  `tooltipText` (each block shows a hover tooltip via the shared/default tooltip),
  `stroke`, `strokeWidth`, `strokeOpacity`, `cornerRadius*`, `fillOpacity`, etc.

**Suggested action:** add a short "Styling heat-legend segments" note to the map
(or a HeatLegend) skill section covering `markers.template` and the
width/height-by-orientation thickness rule.

---

## 2026-07-05 — Document the "tooltipText alone uses the Root's shared tooltip" model

**Type:** skill/docs best-practice — tooltips architecture. Medium priority; broadly useful.

**Source:** Refactoring tooltips across an editor + 15 non-XY sample charts
(`c:/projects/dojo.amcharts`). The mental model that made everything simpler and
is nowhere stated plainly in the skill:

- Setting only `sprite.set("tooltipText", "...")` (with **no** `tooltip:` instance
  anywhere on that sprite/series) is sufficient to get a hover tooltip. The sprite
  lazily resolves the **Root's shared/default `Tooltip`** — verified at runtime:
  `slice.getTooltip()` returns a `Tooltip` and `showTooltip()` renders the text,
  even though no `am5.Tooltip.new(...)` was ever created for that series/slice.
- You only need a per-sprite/series `am5.Tooltip.new(...)` instance when you want
  that element's tooltip to look **different** from the shared one, or (for XY)
  because axis/series tooltips are **cursor-driven**, not hover-driven, so they
  need their own instance.
- Practical guidance to add to the skill's Tooltips section(s): for pie/percent,
  venn, hierarchy (nodes), flow (nodes + links), wordcloud (labels), and map
  (polygons / point bullets), prefer just `...template.set("tooltipText", ...)`
  and style the look once via `root` default tooltip, instead of creating a
  Tooltip instance per series. Correct sub-targets confirmed:
  - Percent/Venn slices: `series.slices.template`
  - Hierarchy nodes: `series.nodes.template`
  - Flow nodes: `series.nodes.nodes.template`; flow links: `series.links.template`
  - WordCloud words: `series.labels.template`
  - Map polygons: `polygonSeries.mapPolygons.template`; map points: the bullet sprite

**Suggested action:** add a short "Shared vs per-sprite tooltip" subsection to the
core/tooltips skill reference stating the above, so agents stop reflexively
creating `am5.Tooltip.new(...)` on non-XY series.

---

## 2026-07-05 — ChartSerializer drops Venn `hoverGraphics` and slice-template states

**Type:** skill/docs gotcha — serializing + Venn hover. Low-medium priority.

**Source:** Reproducing the amCharts venn demo hover in the editor. The demo's
hover is a dashed white set outline via `series.hoverGraphics.setAll({
strokeDasharray:[3,3], stroke:0xffffff, strokeWidth:2 })`. This does **not**
round-trip through `am5plugins_json.ChartSerializer` — the serialized config has
no `hoverGraphics` at all, so a rebuilt-from-JSON venn loses the custom hover.
(`slices.template.tooltipText` DOES serialize, so the tooltip survives.)

Tried the obvious workaround — a slice hover **state**
(`slices.template.states.create("hover", {...})`) — and that ALSO doesn't
serialize for Venn (no `states`/`hover` in the output). So there is currently no
serializable way to express a custom Venn hover appearance.

**Suggested action:**
- Document (serializing docs / venn reference) that `hoverGraphics` and Venn
  slice-template states are not captured by ChartSerializer; a custom venn hover
  must be re-applied in code after `JsonParser.parse`.
- If feasible, treat as a serializer gap to fix upstream (serialize
  `hoverGraphics` and template `states` on Venn slices).

---

## 2026-07-03 — Document that ChartSerializer does NOT serialize a ZoomableContainer's contents (round-trip gotcha)

**Type:** skill/docs gotcha — serializing + ZoomableContainer. Medium priority.

**Source:** Adding a "make chart zoomable" feature to the editor. The docs
(`concepts/common-elements/containers` → "Zoomable container") correctly explain
that zoomable content must live in `zoomableContainer.contents.children` (not
`children`), and that ZoomableContainer must be a top child of `root.container`.

**The undocumented gotcha:** `am5plugins_json.ChartSerializer` does **not**
round-trip a ZoomableContainer. Serializing one (via `serializeAll(zc)`) emits
only `{ type: "ZoomableContainer", settings, states, refs }` — the `contents`
child list (and therefore the wrapped chart) **and** any `ZoomTools` in
`children` are dropped entirely. Re-parsing the output yields an empty
ZoomableContainer. Verified empirically (serialized JSON was ~228 chars, no
`contents`/inner chart/tools; reparse produced `contents.children == []`).

**Consequence for tooling:** you cannot persist "chart is zoomable" through a
JSON round-trip. An editor/codegen that serializes the live chart loses the
wrapper, so zoomability must be tracked out-of-band and re-applied after parse
(the editor now wraps at render time from a separate flag, never via the config).

**Suggested action:**
- Add a NOTE to the "Zoomable container" doc section: ChartSerializer does not
  serialize `contents.children`; a ZoomableContainer must be reconstructed in
  code, not restored from a serialized config.
- If feasible, treat it as a plugin bug to fix upstream (serialize `contents`
  like a normal child container so zoomable charts round-trip).

---

## 2026-06-29 — Skill docs invent / misattribute chart settings — fix timeline, then audit EVERYTHING against the API reference

**Type:** skill correctness bug + repo-wide audit. **High priority** — phantom
settings are no-ops that silently do nothing, so editors/codegen built on the
skill emit them verbatim and they quietly fail (worse than an error).

### Agent prompt (act on this directly)

> You are auditing the amCharts 5 skill (`amcharts5-skill` submodule) and the MCP
> reference data for **settings that don't actually exist on the class they're
> documented under**. amCharts silently ignores unknown settings, so these never
> throw — they just do nothing, which is how they survive review.
>
> **Start with the confirmed bug (timeline charts):**
> The timeline reference (what `get_chart_reference("timeline")` returns, and the
> `skill/.../timeline` doc) documents settings that are NOT on the classes:
> - **SerpentineChart** — lists `yAxisRadius`, `yAxisInnerRadius` as chart
>   settings. Authoritative `ISerpentineChartSettings` (→ `ICurveChartSettings`
>   → `IXYChartSettings`) has ONLY: `orientation` (`"vertical"|"horizontal"`,
>   default `"vertical"`), `levelCount` (default 3), `startLocation` (default 0),
>   `endLocation` (default 1).
> - **SpiralChart** — lists `inversed`, `yAxisRadius`, `yAxisInnerRadius`.
>   Authoritative `ISpiralChartSettings` has ONLY: `levelCount` (default 3),
>   `startAngle` (default −90), `endAngle` (default 0), `innerRadius`
>   (`Percent`, default 60%). There is **no** `inversed`.
> - The curve **band radius** the skill was trying to describe is on
>   `AxisRendererCurveY` (`radius` / `innerRadius`), NOT on the chart.
>
> Verify against `reference/iserpentinechartsettings`,
> `reference/ispiralchartsettings`, `reference/icurvechartsettings`. Fix the
> timeline doc + example annotations: correct the settings, delete the phantoms,
> and add a one-liner that band radius lives on the Y axis renderer.
>
> **Then audit the WHOLE skill — do not sample, be exhaustive:**
> 1. For every class the skill documents (charts, series, axes, axis renderers,
>    cursors, bullets, legends, scrollbars, etc.), enumerate every setting name it
>    claims — settings tables, "Settings:" lists, inline `.set(...)` / `.new(root,
>    {...})` in examples, and prose/comments.
> 2. For each name, resolve the authoritative `I<Class>Settings` interface and walk
>    its inheritance chain (e.g. `ISerpentineChartSettings` → `ICurveChartSettings`
>    → `IXYChartSettings` → … → `ISpriteSettings`). A setting is valid only if it
>    appears on the class or an ancestor.
> 3. Flag any setting that is: **invented** (nowhere in the chain),
>    **misattributed** (exists, but on a different object — e.g. a renderer /
>    series-column-template / axis setting documented as a chart setting), or has a
>    **wrong default, type, or enum value** vs the reference.
> 4. Fix: correct names, move misattributed settings to the right object (with a
>    note on where they live), fix defaults/types/enums, or delete invented ones.
>    When the skill was describing a "friendly" concept (like band thickness), map
>    it to the real setting+object instead of a made-up key.
> 5. Output a discrepancy report: `class · setting · problem · fix`.
>
> Treat the API reference (`reference/i*settings` + class chain) as the single
> source of truth. The skill prose and the hand-written examples are the suspects.

**Found by:** building the settings-driven editor (`dojo.amcharts/editor`) — the
editor exposed `yAxisRadius`/`yAxisInnerRadius`/`inversed` as Serpentine/Spiral
chart settings straight from the skill, and they did nothing; caught only when
cross-checking `I*ChartSettings`.

---

## 2026-06-23 — Heat rules on bullets: required setup + a ChartSerializer crash

**Skill addition** (heat rules + bullets are under-documented and have sharp edges).

Building "size bullets by data value" in the editor surfaced three things worth a skill section:

1. **A heat rule on a bullet needs the series to track the field.** The rule reads
   `dataItem.get(rule.dataField)` and the field extremes from `getPrivate(dataField + "Low"/"High")`.
   For an XY series whose bullets should size by a column, you must:
   - `series.set("valueField", "<column>")` — registers the column under the base
     `Series` value field `value`, so `dataItem.get("value")` resolves.
   - `series.set("calculateAggregates", true)` — otherwise `valueLow`/`valueHigh`
     are never computed, every point gets `percent = 0.5`, and **all bullets come
     out the same size** (silent, very confusing).
   - heat rule: `{ target: circleTemplate, key: "radius" (or "scale"), dataField: "value", min, max }`.
   `dataField` is the **property key** (`value`/`valueY`/…), not the raw column name.
   The base `Series` value fields are `["value","customValue"]`; XY adds
   `valueX/valueY/openValue*/lowValue*/highValue*` (see `XYSeries._afterNew`).
   - **Sharp edge for runtime/editor use**: setting `valueField` *after* the series
     already processed data does NOT take effect. The field-reading map is built by
     `Component._updateFields()` → `_makeDataItem()`, which only re-run at creation or
     when a `*Show` field goes dirty — never on a late `valueField` change. So `value`
     is never read onto data items and `valueLow/valueHigh` stay empty → `percent`
     falls to 0.5 → **all bullets identical** (looks like the heat rule "does nothing").
     Fix at runtime: after `series.set("valueField", col)` call `series._updateFields()`
     and re-feed the data (`series.data.setAll(series.data.values.slice())`) so items are
     rebuilt through the refreshed map and aggregates recompute. (Declarative/JSON setup
     is fine because the field exists before first data processing.)

2. **The heat-rule target must be a `Template`** the bullet sprites are built from:
   `am5.Circle.new(root, {...}, circleTemplate)` + `series.set("heatRules",[{target: circleTemplate, ...}])`.
   `Series._updateChildren` applies rules by iterating `rule.target._entities`.

3. **ChartSerializer + bullet heat rules can crash the chart.** `ChartSerializer`
   serializes a function-bullet by *calling the factory* with a sample data item to
   introspect the sprite (`bulletFunction(root, series, sampleDataItem)` in
   `plugins/json/ChartSerializer.js`). That sprite is built from the shared template
   (so it joins `template._entities`) but is **never** run through
   `Series._makeBulletReal`, so it has **no `dataItem`**. The next render's heat-rule
   loop does `target.dataItem.get(field)` → `undefined.get` throws → `Series._updateChildren`
   aborts → on a `LineSeries` the **line stroke silently disappears**.
   - Suggested core fix: guard the heat-rule loop with `if (!target.dataItem) return;`
     (Series.js, the `$array.each(rule.target._entities, …)` block).
   - Editor workaround: have the bullet factory call `sprite._setDataItem(dataItem)`
     itself, so even the serializer's throwaway entity is harmless.

**Where surfaced**: editor "Bullets → Size by Value" (heat rule maps `scale`/`radius`
from a numeric field; bullets built from a shared template so the rule round-trips to JSON).

---

## 2026-06-17 — ChartSerializer cycles/overflows on self-referential settings (`selectedDataItem`)

**Where surfaced**: amCharts editor `/convert` pipeline. The `treemap` template (`am5hierarchy.Treemap` inside an `am5.Container`, with `series.set("selectedDataItem", series.dataItems[0])`) failed two ways:

1. With `removeEmptyObjects: true` (the default via `_setSoft`):
   ```
   RangeError: Maximum call stack size exceeded
     at _._pruneEmptyObjects (ChartSerializer.ts:865)  ← recurses with no visited/depth guard
   ```
2. With `removeEmptyObjects: false`, then `JSON.stringify`:
   ```
   Converting circular structure to JSON
     ... property 'series-0' closes the circle
   ```

**Root cause**: `selectedDataItem` holds a `DataItem`, and `DataItem.component` points back at the series, so the serialized graph has a cycle `series → selectedDataItem → dataItem → component → series`. `_pruneEmptyObjects` walks it unbounded → overflow. Independently, a bare-series serialization can't ref-ify the back-edge (the series is the root, has no `#name`), so it stays a real object → not `JSON.stringify`-able.

**Fix that worked** (matches amCharts' own serialize demo): hand `ChartSerializer.serializeAll` the **wrapping Container** (the direct child of `root.container`), NOT the unwrapped series. Then the series is a child ref `#series-0`, `selectedDataItem` serializes as that string ref, no cycle, and `removeEmptyObjects: true` prunes cleanly. The editor previously unwrapped the Container to the series via its `findRealChart`; it now serializes the container child.

**Suggestions**:
1. **Skill / docs**: in the serializing guide, show serializing the chart's top container child, and call out that self-referential settings (`selectedDataItem`, or any setting holding a `DataItem`) require the series to be a referenceable child — otherwise you get a cyclic, non-stringifiable config.
2. **Plugin robustness**: add a visited-set (or depth cap) to `_pruneEmptyObjects` so cyclic input degrades gracefully instead of a stack overflow.
3. **Plugin**: ref-ify back-edges to the serialization root itself (not only to named child refs), so serializing a bare series/entity can't emit an unserializable object cycle.

---

## 2026-06-17 — Adapters cannot round-trip through JSON; `ChartSerializer` `includeAdapters` is a trap

**Where surfaced**: amCharts editor (`c:/projects/dojo.amcharts/editor`). Loading any catalog template that used a fill/stroke adapter (e.g. `standard-column`, which palette-colors each column) threw at render time:

```
Uncaught TypeError: i[s] is not a function
  at Entity.fold (Entity.ts:110)
  at Entity.get
  at Graphics._afterChanged
```

**Root cause** (verified in `@amcharts/amcharts5/.internal/plugins/json/Json.js`):
- The editor serialized live charts with `ChartSerializer.new(root, { includeAdapters: true, functionsAs: 'string' })`. This emits each adapter as `{ key, callback: "function (fill, target) { ... }" }` (a string).
- On parse, `JsonParser.parseAdapter()` does `callback: this.parse(root, object.callback, refs)`. For a string, `parseValue` falls to `parseRef(value, refs)` (~L528) which returns the string unchanged — it is **not** turned into a function.
- `entity.adapters.add(key, "<string>")` then registers a string as a callback. When `Entity.fold` later applies adapters, it calls the string → `i[s] is not a function`.
- Independently: template adapters almost always close over `chart` / `series` / `root` from the original builder scope. Those identifiers don't exist after reparse, so even an eval'd string would throw a ReferenceError at call time.

**Net**: adapters are fundamentally non-serializable for JSON round-trip. `includeAdapters: true` produces output `JsonParser` cannot consume — it actively crashes the chart rather than degrading gracefully.

**Fix applied in the editor**: switched to `includeAdapters: false` and stripped existing `adapters` arrays from converted template JSON. Cost: adapter-driven styling (e.g. per-column palette fills) is lost on round-trip.

**Suggestions**:
1. **Skill docs** (`serializing/chart-serializer`): state plainly that adapters do not round-trip and that `includeAdapters: true` yields configs `JsonParser` rejects. Today the docs imply adapters are captured/restored.
2. **MCP/skill examples**: for anything presented as JSON-friendly, replace palette-coloring adapters with declarative equivalents — per-data `fill` field + `columns.template` `templateField`, or `heatRules`. Note which visual effects have no declarative equivalent (custom per-target tooltip text, computed strokes, etc.).
3. **Plugin (optional)**: add an opt-in, security-gated `parseFunctions` flag to `JsonParser` that `new Function(...)`s callback strings for adapters/bullets that take their context via parameters (the `function(root, series, dataItem)` form) rather than closures. Pairs with the 2026-06-09 bullets-signature suggestion below.

---

## 2026-06-09 — Bullets callback signature is inconsistent in the skill

Working through the JSON-driven editor (where everything has to round-trip
through `ChartSerializer` + `JsonParser`), bullet callbacks that close over
the outer `root` variable can't be serialized cleanly — the function body is
captured as a source string and the `root` reference dangles on re-bind.

The canonical amCharts pattern is to declare the callback with `root` (and
optionally `series`, `dataItem`) as **parameters**:

```js
series.bullets.push(function (root, series, dataItem) {
  return am5.Bullet.new(root, { ... });
});
```

This avoids the closure entirely (and `series`/`dataItem` are also handy).

The skill files have this in some places (flow.md → "Animated bullets along
links" uses the full signature) but not others:
- `SKILL.md` → "Heat rules" → "Using heat rules on bullets" uses bare
  `function() { ... am5.Bullet.new(root, { ... }) }` — closure over outer
  `root`.
- `map.md` → "Series types" → MapPointSeries example does the same.

Sweep the skill files and normalize every `series.bullets.push(...)` example
to use `function(root, ...)` so users can copy them straight into a
JSON-friendly template. Also call this out in the "Common pitfalls" list as
a documented best practice.

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
