# skill (part 2)

## Animations

```js
series.appear(1000);        // duration in ms
chart.appear(1000, 100);    // duration, delay
```

**`autoAppear`** — the same opening animation as a setting, so it works from a JSON config or `<am5-chart>`, where `appear()` cannot be called:

```js
chart.setAll({ autoAppear: true, appearDuration: 1000, appearDelay: 100 });
series.setAll({ autoAppear: true, appearDuration: 1000 });   // a series waits for its first data
// JSON: "settings": { "autoAppear": true, "appearDuration": 1000, "appearDelay": 100 } on the chart and each series
```

It plays once, when the element is first drawn (data updates do not replay it; turning the setting off and on does). `autoAppear` defaults to `false`; `appearDuration` falls back to the element's `stateAnimationDuration`; `appearDelay` (default `0`) keeps the element hidden until it starts. Elements made from a template play as each is made; an element that starts hidden stays hidden.

**Declared animations — the `animations` setting.** Every element can carry its own animations as data, so they live in a JSON config and survive `ChartSerializer` — prefer this over `sprite.animate({ loops: Infinity })` for endless effects:

```js
series.bullets.push(function (root, series, dataItem) {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 6,
      animations: [   // loops: 0 = forever; yoyo goes back to `from`; easing is a NAME
        { key: "scale", from: 1, to: 1.6, duration: 800, loops: 0, yoyo: true, easing: "sine" },
        { key: "opacity", from: 1, to: 0.3, duration: 800, loops: 0, yoyo: true }
      ]
    })
  });
});
```

Entry (`IDeclaredAnimation`) fields: `key`, `to`, `duration` (required; with `yoyo` one way), `from` (default: current value), `delay` (`0`), `loops` (`1`; `0` = forever), `yoyo` (`false`), `easing` (`"linear"` — one of the 8 names under "Easing functions"; unknown names silently become linear), `ease` (`"in"` default, `"out"`, `"inOut"`), `target` (`"self"` default, or `"dataItem"` for a data-item value such as a map point's `positionOnLine`). They start when set, restart when changed, stop on dispose. **Give `from` explicitly** unless the setting has a theme default (`scale`/`opacity`/`rotation` do; `dx`, `fill`, a data item's `positionOnLine` may not) — with `from` omitted and an `undefined` current value it jumps straight to `to`, no animation. In JSON, colors/percents in `from`/`to` are `{ "type": "Color", "value": "#f00" }` / `{ "type": "Percent", "value": 50 }`.

## Events

```js
// Interaction events on elements
series.columns.template.events.on("click", (ev) => {
  console.log("Clicked:", ev.target.dataItem.dataContext);
});

// Common events: click, pointerover, pointerout, pointerdown, globalpointermove

// Series/chart lifecycle events
series.events.on("datavalidated", () => {
  // Fires after data is processed — safe to read dataItems
});

// Axis zoom/scroll — watch start/end settings, not events
xAxis.on("start", () => {
  console.log("Zoomed/scrolled");
});
xAxis.on("end", () => {
  console.log("Zoomed/scrolled");
});

// Setting change watch
sprite.on("width", (width) => {
  console.log("Width changed to", width);
});

// One-time listener
series.events.once("datavalidated", () => { /* runs once */ });

// Remove listener
const disposer = sprite.events.on("click", handler);
disposer.dispose(); // removes the listener
```

**Knowing when the chart has finished drawing.** There is no "rendered" event. `datavalidated` fires once the data is processed, and the next `frameended` can come long before drawing ends. With 5,000 bullets drawing ended about 5 times later than that `frameended`, and with 50,000 about 10 times later. amCharts draws only while something has changed or is animating, so two animation frames in a row without a `frameended` mean it is done. Call this right after the change (`data.setAll()`, a zoom, `selectPeriod()`):

```js
function whenRendered(root, callback) {
  var frames = 0, seen = 0, quiet = 0;
  var listener = root.events.on("frameended", function () { frames++; });
  (function check() {
    requestAnimationFrame(function () {
      if (frames === seen) quiet++; else { quiet = 0; seen = frames; }
      if (quiet >= 2) { listener.dispose(); callback(); } else check();
    });
  })();
}
series.data.setAll(data);
whenRendered(root, function () { /* everything is drawn */ });
```

With `root.fps` set, frames are spaced `1000 / root.fps` ms apart, so wait longer than that instead of two animation frames. Endless animations (`loops: Infinity` with `animate()`, `loops: 0` in declared `animations`) never settle. Without a license, the amCharts logo fades in 3 s after the root is created and draws for 1.5 s; a check during that time waits for it.

**Opening a link on click needs no handler:** `series.set("urlField", "url")` makes each item's bullet, column, slice, Venn slice, map polygon or map line open the URL in its data row (`linkTarget`, default `"_self"`) — see "Recent API changes". Hierarchy nodes, flow nodes/links and word-cloud labels are not linked; keep a `click` handler there.

**A tap fires no DOM `click` on a pannable chart.** On touch, a tap on an XYChart with `panX`/`panY`, under a cursor with a zoom or select `behavior`, or on a `draggable` sprite gives `pointerdown`/`pointerup` but no `mousedown`/`mouseup`/`click` on the page (Chrome touch emulation). The amCharts `click` event still fires: use `events.on("click", …)`, not a DOM listener.

## Settings API

```js
// Set after creation
sprite.set("fill", am5.color(0xff0000));
sprite.setAll({ fill: am5.color(0xff0000), strokeWidth: 2 });

// Read current value
const fill = sprite.get("fill");
const width = sprite.getPrivate("width"); // read-only internal values

// set() RETURNS the value — handy for capturing the created object inline:
const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
```

**Reading back a `Percent`:** a `Percent` exposes two numbers — `.percent` is the 0–100 value, `.value` is the normalized 0–1 fraction. `am5.percent(50).percent === 50` but `am5.percent(50).value === 0.5`. When you read a percent setting back (e.g. `sprite.get("x")` after setting `am5.percent(50)`), use `.percent` for a 0–100 number; `.value` gives `0.5`.

**Reading animated settings is unreliable mid-animation.** Right after `series.appear()` / `chart.appear()`, animated settings like `opacity` are still transitioning — `get("opacity")` can return `0` (the start value). Read such settings after the animation completes, or don't persist values read during appear (a common way to accidentally bake `opacity:0` into generated code).

## Settings that already equal the default — omit them

Generated code routinely spells out settings that equal the amCharts default (verified against the default themes, and for `Gantt` the code). They add noise and mislead readers into thinking they matter. Do not emit these unless changing them:

| Class | Setting(s) that are already the default |
|-------|------------------------------------------|
| All hierarchy series | `childDataField: "children"`, `downDepth: 1`, `initialDepth: 5` |
| `Sunburst`, `Partition`, `Treemap`, `VoronoiTreemap` | `singleBranchOnly: true` (`Partition`/`Treemap` also `upDepth: 0`; `VoronoiTreemap` also `shapeType: "polygon"`; `Sunburst` ignores the setting — always single-branch) |
| `Tree`, `ForceDirected` | `singleBranchOnly: false`, `upDepth: Infinity`, `topDepth: 0` (`Tree` also `orientation: "vertical"`) |
| `PieSeries`, `FunnelSeries`, `PyramidSeries`, `PictorialStackedSeries` | `alignLabels: true` (`PieSeries` also `startAngle: -90`, `endAngle: 270`; `FunnelSeries` also `orientation: "vertical"`, `startLocation: 0`, `endLocation: 1`, `bottomRatio: 0`) |
| `Chord` | `sort: "none"` (data order) |
| `Gantt` | `excludeWeekends: true` |
| `XYSeries` (all XY series) | `maskBullets: true` — note the default is **true**, so `maskBullets: false` is a real change |
| `LineSeries` (incl. smoothed/step) | `connect: true`; `StepLineSeries` `noRisers: false` |
| `XYChart` | `maxTooltipDistance` — leave **unset** (unset shows tooltips for all items in the category; `0` is *not* the same) |
| `HeatLegend` | `stepCount: 1` |

Runtime-mutated settings (`visible`, `x`/`y`, `opacity`, `scale`, cursor line `visible`, physics/random layouts, computed `AxisRendererCurve.points`) cannot be checked by "remove and re-`get()`" — amCharts rewrites them after render. User-set values live in `entity._userProperties` (what `ChartSerializer` reads), separate from the full `_settings` bag that includes theme and internal values.

## Dynamic data

```js
// Replace all data (full redraw, NO animation)
series.data.setAll(newData);

// Add items
series.data.push({ category: "New", value: 42 });

// Update item at index — this ANIMATES the change
series.data.setIndex(0, { category: "Updated", value: 99 });

// IMPORTANT: To update data WITH animation, use setIndex() per item.
// setAll() replaces everything at once — no transition animation.
// Loop through items for animated updates:
// newData.forEach(function(item, i) { series.data.setIndex(i, item); });

// Remove item at index
series.data.removeIndex(2);

// Insert at specific position
series.data.insertIndex(1, { category: "Inserted", value: 50 });

// Iterating dataItems — dataItems is a PLAIN ARRAY, not a List
// ❌ series.dataItems.each(fn)                              — will throw, .each() does not exist
// ✅ am5.array.each(series.dataItems, function(dataItem) {}) — amCharts array utility
// ✅ series.dataItems.forEach(function(dataItem) {})         — standard JS
```

**Changing values on existing data items.** Series draw from the **working** values, so `dataItem.set("valueY", v)` (or `"value"` on a pie) changes nothing on screen, and `markDirtyValues()` doesn't help. Change the data row with `series.data.setIndex(i, row)` (animates), or set the working key too (jumps; use it for per-frame updates):

```js
xySeries.dataItems[0].setAll({ valueX: 4, valueY: 7, valueXWorking: 4, valueYWorking: 7 });   // XY series
pieSeries.dataItems[0].setAll({ value: 80, valueWorking: 80 });                                // pie, funnel, pyramid
// per-frame updates through setIndex on XY: set interpolationDuration: 0 on the series, or the points lag behind
```

On maps it is worse: a `geometry` can't be animated, so with `setIndex` it switches only when `interpolationDuration` ends, and a line or polygon replaced every frame keeps its first shape. Set `interpolationDuration: 0`, or set the geometry on the element (`references/map.md` → "Live updates").

A data item's bullets are a plain array **property**: `dataItem.bullets?.[0]?.get("sprite")` is the sprite the bullet function made (`dataItem.get("bullets")` is `undefined`).

`dataItem.bullets` stays `undefined` until the series draws that item: right after `data.setAll()`, in `datavalidated` and in the first `frameended` (bullets appear on the second frame), and, on a zoomed `DateAxis`, for items out of view. Decide a bullet's look inside the bullet function from `dataItem` (or with `templateField`), not by reaching into `dataItem.bullets` after setting the data.

## Performance: big data, fast updates, no animation

- **Animations off:** leave out the Animated theme. To keep it but stop one element animating, set `interpolationDuration: 0` (value changes, axis zoom and rescale) or `stateAnimationDuration: 0` (hover and show/hide states) on it. Docs: https://docs.amcharts.com/v5/concepts/animations/#turning-off-animations.
- **Zoom without animation:** an axis zooms over its own `interpolationDuration` (600 ms with the Animated theme). There is no `zoomAnimation` setting. Set it to 0 on the X axis and on value axes, which also animate their rescale after a zoom. `zoom()`, `zoomToDates()`, `zoomToValues()` and `zoomToCategories()` take a duration as their third argument; `0` jumps. Docs: https://docs.amcharts.com/v5/charts/xy-chart/zoom-and-pan/#zoom-animation.
- **Frame rate:** `root.fps = 30` redraws about 20 times a second instead of 60, which frees the main thread for incoming data.
- **High-rate streams** (a point every 10 ms, 3 series):
  - The Live Data pattern (`push` + `removeIndex(0)` per point, Animated theme) kept up with 30–60% of the points.
  - `interpolationDuration: 0` on the series and axes, plus `root.fps = 30`, kept up with 80–90%.
  - Collecting points and adding them once per frame with `data.pushAll()` adds little.
  - A timer-driven feed drops the ticks a busy page skips; WebSocket messages queue instead.
- **Large line data:** `references/xy.md`, "DateAxis". **Large scatter:** `references/xy.md`, "Scatter / Bubble chart". **Knowing when drawing has finished:** "Events".

## Adapters

```js
// Dynamically modify a setting value before it's applied
series.columns.template.adapters.add("fill", (fill, target) => {
  return target.dataItem.get("valueY") > 100
    ? am5.color(0x00cc00)
    : am5.color(0xcc0000);
});

// Adapter on axis labels
xAxis.get("renderer").labels.template.adapters.add("text", (text, target) => {
  return text + "!";
});
```

## States

```js
// Hover state — applied automatically on pointer over
series.columns.template.states.create("hover", {
  fillOpacity: 0.8,
  scale: 1.05
});

// Active state — toggled via click
series.columns.template.states.create("active", {
  fill: am5.color(0xff0000)
});

// Built-in state names: "default", "hover", "active", "disabled", "hidden"
// State animation: stateAnimationDuration, stateAnimationEasing
```

**A state keeps the value it first replaced.** Once a state (e.g. `hover`) has changed a setting, the sprite's `"default"` state holds the value from that moment and restores it on every unhover. So a setting changed later (painting a polygon on click, a new base color) snaps back on the next unhover unless you change it in both places:

```js
polygon.set("fill", color);
polygon.states.lookup("default")?.set("fill", color);
```

**`sprite.hover()` also shows the sprite's tooltip.** To highlight other elements from an event (related links or columns), apply the state instead: `sprite.states.applyAnimate("hover")`, and `"default"` to undo it. Several `hover()` calls move the shared tooltip to the last sprite.

## Parameterized themes — Monochrome & Adaptive

Two themes generate their palette from colors you pass in (OKLCH-based, so the result stays perceptually balanced). Because a theme cannot take constructor parameters, these ship as **factory functions** — call them with `(root, settings)`; `.new(root, settings)` also works.

```js
import am5themes_Monochrome from "@amcharts/amcharts5/themes/Monochrome";
import am5themes_Adaptive from "@amcharts/amcharts5/themes/Adaptive";

// Monochrome — single-hue lightness ramp
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_ResponsiveMax.new(root),
  am5themes_Monochrome(root, {
    color: 0x2c6e91,   // base hue (default: blue #2e7c9e)
    accent: 0xff7f0e,  // optional — applied to the FIRST series only, so it pops
    count: 7,          // steps in the ramp (default 7)
    dark: false        // true = dark background + light-to-mid ramp
  })
]);

// Adaptive — full palette generated from one or two base colors
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_ResponsiveMax.new(root),
  am5themes_Adaptive(root, {
    baseColor: 0x2c6e91,   // first generated color IS this color (good for brand colors), unless keepContrast has to move it
    baseColor2: 0xffdd00,  // optional — palette spans the two colors
    count: 10,             // number of series colors (default 10)
    dark: false
  })
]);
```

Both are additive (they do not modify built-in themes) and both handle dark mode themselves via `dark: true` — do not also add the `Dark` theme.

**More settings (both themes, all off by default):** `interleave: true` takes the colors in the order 1, 4, 2, 5, 3, 6, so series next to each other differ more (Monochrome keeps `accent` first); `mapShade: true` fills map land with a mid shade of the base color, as light as default map land, instead of the color itself; `keepContrast: true` keeps the series colors and primary buttons at least 3:1 against the background (or give a ratio, e.g. `4.5`). In Adaptive it moves `baseColor` and `baseColor2` themselves, so the first color is then not exactly the brand color; in Monochrome it moves the end of the shades nearest the background. A branded palette:

```js
am5themes_Adaptive(root, { baseColor: 0x2c6e91, baseColor2: 0xffdd00, count: 10, interleave: true, mapShade: true, keepContrast: true })
```

## Custom themes

```js
const myTheme = am5.Theme.new(root);
myTheme.rule("Label").setAll({ fontSize: 12, fill: am5.color(0x555555) });
myTheme.rule("Grid").setAll({ stroke: am5.color(0xe0e0e0) });
root.setThemes([am5themes_Animated.new(root), am5themes_ResponsiveMax.new(root), myTheme]);
// Theme order matters: later themes override earlier ones
```

## Dark theme

When the page has a dark background, add the Dark theme so labels, grid, and tooltips are readable:

```js
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_ResponsiveMax.new(root),
  am5themes_Dark.new(root)        // must come after Animated and ResponsiveMax
]);
```

Import: `import am5themes_Dark from "@amcharts/amcharts5/themes/Dark"` or CDN `themes/Dark.js`.

**Rule:** Only add Dark theme when the background is clearly dark. Default to white/light background with no Dark theme.

## ColorSet — using default colors

amCharts assigns colors automatically via a built-in ColorSet. Do not invent custom palettes unless the user asks.

```js
// Get the chart's default color set
var colors = chart.get("colors");       // XY and Radar charts only (pie and other percent charts: series.get("colors"))
var colors = series.get("colors");      // pie/percent charts use series-level colors

// MapChart has NO built-in ColorSet — create your own:
var colors = am5.ColorSet.new(root, {});

// Get a specific color by index (does not advance internal counter)
var color = colors.getIndex(0);         // first default color
var color = colors.getIndex(3);         // fourth default color

// Get next color in sequence (advances internal counter)
var color = colors.next();

// Reset counter back to start
colors.reset();

// Override the default palette (only if user requests specific colors)
colors.set("colors", [
  am5.color(0x095256),
  am5.color(0x087f8c),
  am5.color(0x5aaa95)
]);
```

**Swapping a `ColorSet`.** The theme's `baseColor` resolves lazily, so a **synchronous** re-color right after swapping a `ColorSet` can read a transient value (sprites momentarily black). Re-set the series data and let amCharts' own data pass recolor the sprites. An empty `colors` list starts from `baseColor`.

**`step` with a theme that reuses its colors** (`reuse: true`: Adaptive, Monochrome, Nord, Pastel, Kelly, …): every color is used before any repeats, so `step: count / 2` interleaves the palette.

**Repeats are lighter.** In themes that reuse their list, once every color has been used, the next round is 10% lighter. This covers Adaptive, Monochrome, Ember, Frozen, Kelly, Material, Midnight, Moonrise, Nord, Pastel, Petroleum, Savanna and Spirited, with their Dark variants, but not Colorblind, Patterns or Dataviz. The setting is `repeatLightness` on the `ColorSet`: HSL lightness per round, `0.1` is 10%, and a negative value makes it darker. It only acts with `reuse: true`. The color sets of one root share the theme's list, and the repeats are added to that list, so whichever color set on the root first needs a new round decides that round for every chart on it. To repeat the colors as they are, set it for the whole root:

```js
// Every ColorSet on the root, through a theme rule
var noLighter = am5.Theme.new(root);
noLighter.rule("ColorSet").set("repeatLightness", 0);
root.setThemes([am5themes_Animated.new(root), am5themes_ResponsiveMax.new(root), am5themes_Nord.new(root), noLighter]);

// Adaptive and Monochrome: a theme setting (true = 0.1, or a number)
am5themes_Adaptive.new(root, { repeatLightness: false });
```

With one chart on the root, `chart.get("colors").set("repeatLightness", 0)` before the data is set works too.

**Three or more series.** Smallest color difference (CIEDE2000) among the first 4 / 6 series colors; higher is easier to tell apart:

| Choice | First 4 / 6 | Note |
|---|---|---|
| default | 6.3 / 6.3 | blue to violet, 18° apart |
| `chart.get("colors").set("step", 3)` | 19.1 / 19.1 | keeps the default look |
| `Colorblind` | 21.7 / 21.7 | Okabe-Ito; the 4th color is a pale yellow |
| `Kelly` | 22.8 / 17.0 | the 1st color is yellow, the weakest on white |
| `Nord` | 22.1 / 14.2 | |

Avoid these for many series: `Dataviz` (series 1 and 5 are the same navy: 4.0), `Frozen` (6.9), `Moonrise` (9.4), `Spirited` (10.2), `Material` (10.3). For lines, also set `strokeWidths: [2]` on the XYChart (the legend line follows) and `legend.markers.template.setAll({ width: 24, height: 14 })`.

## Data processor

```js
// Auto-convert fields when loading external / API data
series.data.processor = am5.DataProcessor.new(root, {
  dateFields: ["date"],
  dateFormat: "yyyy-MM-dd",  // read as local time (UTC with root.utc); see below for leaving it out
  numericFields: ["value", "count"],
  colorFields: ["color"],
  emptyAs: 0  // replace null, undefined and "" with 0 (0 and false stay)
});
// Configure processor BEFORE setting data
```

Without `dateFormat`, the browser's `Date` parses the strings, so ISO strings work and a date-only `"2024-03-15"` is midnight **UTC**.

**CSV:** `am5.CSVParser.parse(text, options)` turns CSV text into rows. An empty string gives `[]` with `useColumnNames: true`, but `[{}]` (one empty row) with the default options, so check for that before `data.setAll()`. Empty lines are skipped unless `skipEmpty: false`.

## Serializing to JSON (ChartSerializer / JsonParser)

**To write a config by hand** (a "JSON config", `<am5-chart>`, a framework package's `config` prop, a Chart Maker link), read `references/json.md`. It covers the exact format, with a complete config per chart family. A config is not `{ "chart": …, "series": … }`; every object has `"type"`, its options go in `"settings"`, and its parts and data go in `"properties"`.

`am5plugins_json.ChartSerializer` turns a live chart into a JSON config and `am5plugins_json.JsonParser` rebuilds it (`await parser.parse(config, { parent: root.container })`). Rules that keep round-trips working:

- **Serialize the chart's top-level container child:** `serializer.serializeAll(root.container.children.getIndex(0))` — the chart, or on chart-less types (hierarchy, flow, word cloud, Venn) the series itself. A series placed straight in `root.container`, or one whose `selectedDataItem` points back at itself, serializes too. A drilled-down hierarchy's `selectedDataItem` is not restored (it is written as `"@self.dataItems.-1"`).
- **Adapters do not round-trip.** `includeAdapters` (default `true`) writes each adapter as `{ key, callback: "function (…) {…}" }`; the parser does not turn that string back into a function (and the closure's `chart`/`series`/`root` would not exist anyway). On parse such adapters are skipped, so the effect is lost — replace palette-coloring adapters with declarative equivalents: `colorByDataItem: true` on column series, a per-item `fill` data field + `templateField`, or `heatRules`.
- **Only user-set settings are serialized** — theme and library defaults are left out, so a value you never set will not appear in it. Add `includeRoot: true` to also write a top-level `root` section (Root settings/properties, `interfaceColors`, formatters). A parsed `root` section sets only those properties and a named locale, and never turns `sanitizeHTML` off, unless parsed with `trusted: true` (`references/json.md` rule 9).
- **Re-parsing into an existing chart:** `parser.parse(config, { updateTargets: "soft" })` applies settings onto an existing object of the same `type` instead of replacing it. The default `"strict"` replaces.
- **Maps and locales with ES module imports:** a geodata pack or locale that isn't a global is copied into the config whole, about 250 KB for `worldLow`, unless the serializer gets it in `resources`. `am5plugins_json.ChartSerializer.new(root, { resources: { am5geodata_worldLow } })` writes `"geoJSON": "am5geodata_worldLow"` instead; parse it back with the same `resources` (`references/json.md`, rule 8). With script tags the packs are globals and are written by name without it.
- **Also saved:** `themeTags` you pass to `.new()` (e.g. a `Button` with `themeTags: ["switch"]` keeps its look; tags the library adds are left out); a legend inside an `axisHeader`; declared `animations` (see "Animations"); and animations started in code that **loop forever** (`loops: Infinity`) with a nameable `am5.ease` easing — written as `animations` entries. `runningAnimations` (default `true`) controls the latter: `am5plugins_json.ChartSerializer.new(root, { runningAnimations: false })` turns it off. Never saved: finite animations (`appear()`, states, zoom) and loops with a custom-function or `pow` easing — for the opening animation use `autoAppear` (see "Animations").
- **Data-item loops:** a loop started on a **data item** in code (`dataItem.animate({ key: "positionOnLine", loops: Infinity, … })`) is saved as an `animations` entry with `target: "dataItem"`. When every data item plays the same loop, it goes on the bullet sprite. When they differ (e.g. points each moving at their own speed), each one goes in its own data row, under the sprite's `templateField` (`"bulletSettings"` if none is set).
- **Also saved:** a series hidden with `hide()` or a legend click; elements you add to library-built containers (`chart.plotContainer`, `seriesContainer`, axes containers, an axis) — no `themeTags: ["serialize"]` needed; a `ZoomableContainer`'s `contents`; `Date` values (as timestamps); settings on a series' `bulletsContainer` and on a pie/funnel series' `labelsContainer`/`ticksContainer`; the `axisFills`, `rectangles` (`Treemap`, `Partition`) and `polygons` (`VoronoiTreemap`) templates. A color taken from `root.interfaceColors` is written as a reference, `"@root.interfaceColors.get('background')"`, so a config parsed under another theme (e.g. Dark) uses that theme's color — write the same string in hand-made configs. A color taken from the theme's palette with `getIndex()` is written as `"@colors.getIndex(3)"` the same way, and hand-made configs can use it too in settings (e.g. `"fill": "@colors.getIndex(0)"`). Colors a color set makes past the theme's list are written as references too. In a data row (e.g. a column `fill` from a `templateField`) the serializer marks the row, and the object in it that holds the reference, with `"__parse": true`; the parser reads references only in marked objects (and in arrays), and elsewhere in data a string starting with `@` or `#` is plain text. A hand-written data row needs both markers: `{ "c": "A", "v": 10, "cs": { "fill": "@colors.getIndex(2)", "__parse": true }, "__parse": true }` (see `references/json.md`, rule 3). A setting such as `step` on a chart's colors is written without the theme's palette.
- **Not captured by `ChartSerializer`** — re-apply these in code after `parse()`: a `ZoomTools` you added to a hand-made `ZoomableContainer` (its `target` is written as a copy, so the parsed buttons drive a different container — re-point `target`, or use `am5.SerialChartContainer`, which wires its own `zoomTools`); Venn `hoverGraphics` (Venn slice-template `states` do round-trip); data items added with `pushDataItem()` (only `series.data` rows are written — map points on lines can be data rows, see `references/map.md`).
- **Bullets** are captured by calling the factory with a sample data item — write factories as `function(root, series, dataItem)` (pitfall #36).

**`<am5-chart>` — a chart as an HTML element.** Builds a chart from a JSON config with no root or chart code. With script tags, load `index.js`, `plugins/json.js`, `element.js`, then every chart package the config uses; in a bundled app, `import { defineChartElement } from "@amcharts/amcharts5/element"` and call `defineChartElement()`, which does nothing if the element already exists. A bare `import "@amcharts/amcharts5/element"` also works. Chart packages are loaded on demand. Then set `element.themes = [am5themes_Animated, am5themes_ResponsiveMax]`, for a map `element.resources = { am5geodata_worldLow }`, and `element.config = {…}`, as properties:

```html
<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
<script src="https://cdn.amcharts.com/lib/5/plugins/json.js"></script>
<script src="https://cdn.amcharts.com/lib/5/element.js"></script>
<script src="https://cdn.amcharts.com/lib/5/percent.js"></script>
<script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
<script src="https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js"></script>

<am5-chart themes="Animated ResponsiveMax" renderer="svg" style="height: 400px" config='{
  "type": "PieChart",
  "properties": { "series": [{ "type": "PieSeries",
    "settings": { "valueField": "value", "categoryField": "category", "autoAppear": true },
    "properties": { "data": [{ "category": "A", "value": 10 }, { "category": "B", "value": 6 }] } }] }
}'></am5-chart>

<script>
document.querySelector("am5-chart").whenReady().then(function (r) {
  // r.root, r.chart — or listen for the element's "ready" / "error" events
});
</script>
```

Attributes: `config` (JSON) or `src` (URL of a JSON file), `themes`, `renderer="svg"` (default canvas). The `themes` attribute takes names, space- or comma-separated, or JSON with a theme's settings: `themes='["Animated", "ResponsiveMax", ["Adaptive", { "baseColor": "#4150a0" }]]'`. It works with script tags only. In a bundled app, the `themes` property takes theme classes, e.g. `[am5themes_Animated, am5themes_ResponsiveMax]`, or a class with its settings: `[am5themes_Animated, am5themes_ResponsiveMax, [am5themes_Adaptive, { baseColor: "#4150a0" }]]`. Without a height from CSS or its parent it is 400 px high. Themes are not part of a config. Changing `config`/`themes` rebuilds the chart; removing the element disposes it.

## Accessibility

```js
series.columns.template.setAll({
  focusable: true,
  ariaLabel: "{categoryX}: {valueY}",
  role: "figure"
});
// Keyboard: TAB to navigate focusable elements, ENTER to click
// focusableGroup: "series1" — TAB to first, arrows within group
```

**High contrast:** in a forced-colors mode such as Windows High Contrast, labels, grid, axes and buttons take the system colors so they stay visible; series colors are kept. It is on by default — `am5.Root.new("chartdiv", { forcedColors: false })` keeps the chart's own interface colors.

Keyboard/screen-reader behavior: a `focusableGroup` is one TAB stop; arrow keys move between its members even when they are draggable (flow and hierarchy nodes) and SHIFT + arrows drag them; ESC hides a focused element's tooltip and ends a keyboard drag; SPACE clicks a focused element with a button-like `role`. The `ariaExpanded` setting is set by the library on Gantt tasks with subtasks and on hierarchy nodes with children; a `role: "button"` with `toggleKey` exposes `aria-pressed`. `am5.Modal` is a dialog to screen readers, named by its `ariaLabel` setting (else its first heading).

## Container & Layout

```js
// Containers organize child elements
const container = root.container.children.push(am5.Container.new(root, {
  width: am5.percent(100),
  height: am5.percent(100),
  layout: root.verticalLayout  // also: horizontalLayout, gridLayout
}));

// Padding and margin
container.setAll({
  paddingTop: 10,
  paddingBottom: 10,
  marginLeft: 20
});
```

**Layout options:**

| Layout | Access | Behavior |
|--------|--------|----------|
| Vertical | `root.verticalLayout` | Children stacked top-to-bottom |
| Horizontal | `root.horizontalLayout` | Children in a row left-to-right |
| Grid | `root.gridLayout` | Multi-column grid |
| Custom grid | `am5.GridLayout.new(root, { maxColumns: 3 })` | Grid with custom column count |
| None | omit `layout` | Children placed at x/y coordinates |

Use layouts to arrange charts, legends, controls, and labels within containers.

**Hidden children take no space.** An element hidden with `visible: false`, `forceHidden` or `hide()` takes up no room in a container sized to its content, e.g. a hidden XY scrollbar leaves no empty band above the plot.

**Right to left: `direction: "rtl"`.** On a container with a horizontal or grid layout, it places the children from right to left, as a mirror image: a child's `marginLeft` ends up on its right. Rows of a grid still go top to bottom. In a vertical layout, children with no `x` of their own line up on the right. For a right-to-left language, set the Root's `direction` instead, which also turns the text and lays out the legends (see "Legend"). `reverseChildren: true` only reverses the order, so a grid starts at the bottom row; don't use it for RTL.

## UI Elements

amCharts 5 provides built-in interactive UI widgets. **Prefer these over HTML elements** when building controls, unless instructed otherwise. Read `references/ui-elements.md` for full API and examples.

| Element | Class | Description |
|---------|-------|-------------|
| Button | `am5.Button` | Clickable button with label, icon, background, hover/down/active states |
| Slider | `am5.Slider` | Single-value slider (0-1 range), fires `rangechanged` event |
| Scrollbar | `am5.Scrollbar` | Two-grip range selector, `orientation: "horizontal"\|"vertical"` |
| NumericStepper | `am5.NumericStepper` | Number input with up/down arrows |
| ProgressPie | `am5.ProgressPie` | Circular progress indicator with `value`, `radius`, `innerRadius` |
| SpriteResizer | `am5.SpriteResizer` | Drag-to-resize handles on any sprite |
| EditableLabel | `am5.EditableLabel` | Label that becomes editable text field on click |
| Modal | `am5.Modal` | HTML overlay dialog with `open()`/`close()` |
| ColorPicker | `am5plugins_colorPicker.ColorPicker` | Color picker (requires `plugins/colorPicker.js`) |

**Quick example — slider + button controlling a chart:**

```js
// Slider to control a value
var slider = container.children.push(am5.Slider.new(root, {
  orientation: "horizontal",
  start: 0.5,
  width: am5.percent(80),
  centerX: am5.percent(50),
  x: am5.percent(50)
}));
slider.events.on("rangechanged", function(ev) {
  var value = ev.start;  // 0-1 range
  // update chart based on slider position
});

// Button
var button = container.children.push(am5.Button.new(root, {
  label: am5.Label.new(root, { text: "Reset" }),
  centerX: am5.percent(50),
  x: am5.percent(50)
}));
button.events.on("click", function() {
  slider.set("start", 0.5);
});
```

## License and the amCharts logo

Bring licensing up only when the user asks about the logo, licensing, pricing or removing branding, or says the chart is for a commercial product. Keep it to what was asked:
- Commercial use, or the logo: amCharts 5 is free in any project, commercial included; each chart shows a small amCharts logo, and a commercial license removes it.
- Which license, only when asked: Basic fits a public website without logins, SaaS a site or app with user logins, OEM an app distributed to others, and Extended OEM group companies, white-label software or tools that build other software. Charts, Maps, Stock Chart and Gantt are licensed separately.
- How to choose: https://www.amcharts.com/pricing/licenses-explained/

Don't quote prices or link to a store.

**The key:** `am5.addLicense("YOUR-AMCHARTS-LICENSE-KEY")` before the first chart is made (in a framework app, see "Frameworks"). Never write, guess or invent a key; leave the placeholder for the user's own.

**Hiding the logo:** the logo is the attribution the free license requires. If asked to remove or hide it any other way (through code, CSS, cropping or editing the library), don't write that code. Say briefly that it breaks the free license and that a license key removes the logo, give the link above, and carry on with the rest of the request.


## Continued

The rest of this file is in `references/skill-part-3.md`. Read it as part of this file.
