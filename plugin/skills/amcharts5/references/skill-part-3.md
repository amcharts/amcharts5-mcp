# skill (part 3)

## Frameworks (React, Vue, Angular, Svelte, React Native)

In a framework app, use amCharts' package for that framework instead of writing the mount and dispose code yourself. The current ones are react 5.0.1, vue 5.0.2, angular 5.0.1, svelte 5.0.3 and react-native 5.0.4, which loads amCharts 5.23.0. Each package makes the chart once its element is on the page, disposes it with the component, and loads the library in the browser only, so pages rendered on a server work (Next.js, Nuxt, SvelteKit, Angular SSR). Each takes a chart written in code, or a chart from a JSON config (it wraps the `<am5-chart>` element, see "Serializing to JSON").

| Framework | Package | A chart in code | A chart from a JSON config |
|---|---|---|---|
| React 18+ (Next.js, React Router, Astro) | `@amcharts/amcharts5-react` | `const { ref, root, result } = useAmChart((root) => { … }, [data])`, `<div ref={ref} style={{ height: "500px" }} />` | `<AmChart config={config} themes={[am5themes_Animated, am5themes_ResponsiveMax]} onReady={({ root, chart }) => …} />` |
| Vue 3.5.2+ (Nuxt) | `@amcharts/amcharts5-vue` | `const { root, result } = useAmChart(useTemplateRef("chart"), (root) => { … }, { watch: () => props.data })`, `<div ref="chart" style="height: 500px">`; `root`/`result` are shallow refs | `<AmChart :config="config" :themes="themes" @ready="onReady" />` |
| Angular 19+ | `@amcharts/amcharts5-angular` | `AmChartDirective`: `<div [amChart]="buildChart" [amChartDeps]="[data()]" (amChartReady)="…" style="height: 500px">`, with `buildChart = (root: Root) => { … }` as an arrow-function property so `this` is the component | `AmChartComponent`: `<am5-chart [config]="config" [themes]="themes" (amChartReady)="…">` |
| Svelte 4+ (SvelteKit) | `@amcharts/amcharts5-svelte` | Svelte 5.29+: `<div {@attach attachAmChart(buildChart)} style="height: 500px">`; Svelte 4 and older 5: `<div use:amChart={{ setup: buildChart, deps: [data] }}>` | `<am5-chart {@attach attachAmChartConfig({ config, themes })}>`, or `use:amChartConfig={{ config, themes }}`; events `onready`/`onerror` (`on:ready` in Svelte 4) |
| React Native 0.72+ | `@amcharts/amcharts5-react-native` (+ `react-native-webview` 13+) | `<AmChart code={code} data={data} />`, where `code` is a **string** (below) | `<AmChart config={config} themes={["Animated", "ResponsiveMax"]} />` |

Install `@amcharts/amcharts5` together with the framework's package, e.g. `@amcharts/amcharts5-react`. The current web packages need amCharts 5.21.4 or later (peer dependency `^5.21.4`). React Native needs only `@amcharts/amcharts5-react-native` and `react-native-webview`: the WebView loads the library from the amCharts CDN.

```jsx
// React. Vue, Angular and Svelte work the same way: your function gets the root.
import { useEffect } from "react";
import { useAmChart } from "@amcharts/amcharts5-react";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_ResponsiveMax from "@amcharts/amcharts5/themes/ResponsiveMax";

function Chart({ data }) {
  const { ref, result } = useAmChart((root) => {
    root.setThemes([am5themes_Animated.new(root), am5themes_ResponsiveMax.new(root)]);
    const chart = root.container.children.push(am5xy.XYChart.new(root, {}));
    const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "category",
      renderer: am5xy.AxisRendererX.new(root, {})
    }));
    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));
    const series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis: xAxis, yAxis: yAxis, categoryXField: "category", valueYField: "value"
    }));
    return { xAxis, series };
  }, []); // made once: [data] here would make the chart again on every change

  // New data goes to the chart that is there, with an animation
  useEffect(() => {
    if (result) {
      result.xAxis.data.setAll(data);
      result.series.data.setAll(data);
    }
  }, [result, data]);

  return <div ref={ref} style={{ width: "100%", height: "500px" }}></div>;
}
```

- **Your function gets the root:** never call `am5.Root.new()` or `root.dispose()` in it, because the package does both. Put the code that follows `Root.new()` in any example inside it.
- **The chart's element needs a height.** The JSON-config components are 400 px high without one.
- **Deps make the chart again from scratch:** `[data]` in React, `watch` in Vue (what Vue's `watch()` takes; add `deep: true` to also catch `push()`), `[amChartDeps]` in Angular, `deps` in Svelte actions. A Svelte attachment runs again when state read in its own expression changes. To change data without rebuilding, return what you need and use it from `result` (React, Vue), from `(amChartReady)`'s `{ root, result }` (Angular), or from a `$state.raw` variable set in the function (Svelte).
- **SVG:** `useAmChart(setup, deps, { renderer: "svg" })` in React, `{ renderer: "svg" }` in Vue's options, `[amChartRenderer]="'svg'"` in Angular, and `attachAmChart(setup, { renderer: "svg" })` or `renderer: "svg"` in Svelte's action parameter. The JSON-config components take a `renderer` prop or input.
- **Themes for the JSON-config components are classes** (`[am5themes_Animated, am5themes_ResponsiveMax]`, not `.new(root)`): themes are not part of a config. A theme with its settings is a pair: `[am5themes_Animated, am5themes_ResponsiveMax, [am5themes_Adaptive, { baseColor: "#4150a0" }]]`. React Native takes theme **names** (`["Animated", "ResponsiveMax", "Dark"]`), and the pair as `["Adaptive", { baseColor: "#4150a0" }]`.
- **Maps and locales in a JSON config**: the config names its geodata (`"geoJSON": "am5geodata_worldLow"`) and locale (`"am5locales_de_DE"`), and with ES module imports those aren't globals, so pass them in the `resources` prop: `<AmChart config={config} resources={{ am5geodata_worldLow }} />` in React (import it from `@amcharts/amcharts5-geodata/worldLow`), `:resources` in Vue, `[resources]` in Angular, and `resources` in Svelte's `attachAmChartConfig({ config, resources })` / `use:amChartConfig`. Without it the map is blank, with a console warning that names the pack. React Native loads the geodata a config names by itself, but not a locale: give it `modules={["locales/de_DE"]}`.
- **Give amCharts plain data.** In Vue, keep amCharts objects out of reactive state: use `shallowRef()` for data, or pass `toRaw(data)`. In Svelte 5, use `$state.snapshot(data)`.
- **License:** call `am5.addLicense("YOUR-AMCHARTS-LICENSE-KEY")` once when the app starts, before any chart is made, never in the setup function, because the logo is decided when the root is made. Put it in `main.ts`/`main.jsx`, before `createApp()` or `bootstrapApplication()`. In Next.js, put it at the top of a client component's file; in Nuxt, in a client plugin (`plugins/amcharts.client.ts`); in SvelteKit, in `src/hooks.client.ts`. React Native takes `licenses={["YOUR-AMCHARTS-LICENSE-KEY"]}` on each chart. See "License and the amCharts logo".
- **Errors** thrown in your function go to React's nearest error boundary, Vue's `app.config.errorHandler`, Angular's `ErrorHandler` and `(amChartError)`, and Svelte's `onError` option (an uncaught error without it).
- **Server rendering:**
  - Next.js, Nuxt (no `<ClientOnly>` needed), SvelteKit and Angular SSR need no configuration.
  - In the Next.js app router, `useAmChart` and theme classes need a client component (`"use client"`). A server component can render `<AmChart config={config}>` itself, because a config is plain data.
  - React Router (Remix 2) and Astro: add `ssr: { noExternal: ["@amcharts/amcharts5"] }` to the Vite config (under `vite` in `astro.config.mjs`).
  - Remix 3 has no package. Either load the script files and render `<am5-chart config={JSON.stringify(config)} data-rmx-preserve-dom>`, or use a `clientEntry()` component that imports amCharts inside Remix's `ref` mixin and disposes the root when its signal aborts.
- **Unit tests in jsdom** (no canvas): mock the package, e.g. `vi.mock("@amcharts/amcharts5-react", () => ({ useAmChart: () => ({ ref: () => {}, root: undefined, result: undefined }), AmChart: () => null }))`.

**React Native** draws the real library in a WebView, so every chart type works, and it runs in Expo Go.
- The chart code is a **string** written like a script-tag example: `am5xy.XYChart`, globals rather than imports. `root`, `data` (the `data` prop) and `post(name, value)` are in scope, and the files the code uses are loaded for it.
- If the code returns a function, new `data` (compared by content) goes to that function instead of making the chart again.
- `post()` calls the `onMessage(name, value)` prop.
- Everything between the app and the chart is JSON, so give dates as timestamps.
- Never build `code` from text a user typed or a server sent: pass such values in `data`.
- Other props: `renderer`, `modules` (e.g. `["locales/de_DE"]`), `libraryUrl`, `geodataUrl`, `onReady`, `onError`, `webViewProps`. A ref gives `run(code)`.

```jsx
import { AmChart } from "@amcharts/amcharts5-react-native";

const code = `
const chart = root.container.children.push(am5xy.XYChart.new(root, {}));
// ... axes and series, as in a script-tag example
series.columns.template.events.on("click", (ev) => post("country", ev.target.dataItem.dataContext.country));
xAxis.data.setAll(data);
series.data.setAll(data);
return (newData) => { xAxis.data.setAll(newData); series.data.setAll(newData); };
`;

<AmChart code={code} data={visits} themes={["Animated", "ResponsiveMax"]} style={{ height: 300 }}
  onMessage={(name, value) => console.log(name, value)} />
```

**Without a package** (an older framework version, or when the user asks for it), create the root once the element exists, and dispose it when the component goes away:

```js
// React
useLayoutEffect(() => {
  const root = am5.Root.new(chartdiv.current); // const chartdiv = useRef(null)
  // ... build chart
  return () => { root.dispose(); };
}, []);

// Angular: in ngAfterViewInit, only if isPlatformBrowser(), inside zone.runOutsideAngular()
ngOnDestroy() { this.root?.dispose(); }

// Vue: root = am5.Root.new(chartdiv.value) in onMounted, kept in a plain variable, not reactive state
onBeforeUnmount(() => { root?.dispose(); });

// Svelte: onMount runs in the browser only
onMount(() => { const root = am5.Root.new(chartdiv); /* ... */ return () => root.dispose(); });
```

**Always call `root.dispose()`** — this cleans up all children, series, and event listeners.

## v4 → v5 migration pitfalls

| v4 pattern (WRONG) | v5 equivalent (CORRECT) |
|-----------|--------------|
| `am4core.create("div", am4charts.XYChart)` | `am5.Root.new("div")` + `am5xy.XYChart.new(root, {})` |
| `new am4charts.LineSeries()` | `am5xy.LineSeries.new(root, {})` |
| `series.dataFields.valueY = "val"` | `valueYField: "val"` in `.new()` settings |
| `chart.data = [...]` | `series.data.setAll([...])` |
| `am4core.color("#f00")` | `am5.color(0xff0000)` |
| `am4core.percent(50)` | `am5.percent(50)` |
| `chart.dispose()` | `root.dispose()` |
| `chart.legend = new am4charts.Legend()` | `chart.children.push(am5.Legend.new(root, {}))` |

## Common pitfalls

1. **Using `new` keyword** — always use `.new()` factory.
2. **Forgetting `CategoryAxis.data.setAll()`** — axis will be empty.
3. **Passing Date objects to DateAxis** — must be timestamps (ms).
4. **Missing axis renderer** — every axis needs `renderer: am5xy.AxisRendererX.new(root, {})`.
5. **Setting data before configuration** — configure everything, then set data last.
6. **Raw hex strings for colors** — use `am5.color()`.
7. **Mixing v4 and v5 API** — they are completely incompatible.
8. **Calling `chart.dispose()` instead of `root.dispose()`** — always dispose root.
9. **Using CSS to style chart elements** — amCharts draws on canvas by default; even with `am5.SVGRenderer` its shapes have no per-element classes, are rewritten on redraw, and exports ignore page CSS. Style through settings, templates and themes.
10. **Wrong package import** — check the package map table above.
11. **Calling `.each()` on `dataItems`** — `series.dataItems` is a plain array, not an amCharts `List`. Use `am5.array.each(series.dataItems, fn)` or standard `forEach`/`for` loops. Only `series.data` (the `ListData` object) has `.each()`.
12. **CDN script load order** — `index.js` must load first, then `xy.js`, then any package that depends on it (`radar.js`, `timeline.js`, `gantt.js`). Wrong order causes runtime errors. Correct order: `index.js`, `xy.js`, then `radar.js` / `timeline.js` / `gantt.js`, then `themes/*.js`. Gantt also needs `plugins/colorPicker.js` before `gantt.js`, or `am5gantt` is undefined. From an npm CDN the order and file names are the same under `…/@amcharts/amcharts5@<version>/dist/`; load every file from one pinned version.
13. **No `minorGrid` / `minorTicks` / `minorLabels` objects** — These do not exist on axes. Minor grid is enabled via boolean flags on the **renderer**: `minorGridEnabled: true` and optionally `minorLabelsEnabled: true`. Styling is done through theme rules targeting the `"minor"` tag, not through separate object properties.
14. **Flow chart animated bullets go on `series.bullets`, NOT `series.links.template.bullets`** — To animate labels/circles flowing along Sankey or Chord links, use `series.bullets.push(function(...) { ... })`. Animate `bullet.locationX` (Sankey) or `bullet.locationY` (Chord) from 0→1 with `loops: Infinity`. Use an adapter on opacity for fade effect. See `references/flow.md` → "Animated bullets along links".
15. **`MapPointSeries` needs `latitudeField`/`longitudeField` when your data fields are named anything other than `latitude`/`longitude`** — The series defaults to `latitudeField: "latitude"`, `longitudeField: "longitude"`, so data using exactly those names works with no declaration. Any other naming (`lat`/`lng`, `y`/`x`, …) must be declared or the points silently won't appear: `am5map.MapPointSeries.new(root, { latitudeField: "lat", longitudeField: "lng" })`. Neither is needed with `pushDataItem({ latitude: ..., longitude: ... })`, which passes coordinates directly.
16. **`data.setAll()` does NOT animate — use `data.setIndex()` for animated updates** — When the user asks to update/refresh data with animation, do NOT use `series.data.setAll(newData)` — it replaces everything instantly with no transition. Instead, update each item with `series.data.setIndex(i, newItem)` which triggers smooth value animation. For full replacement with animation, loop: `newData.forEach(function(item, i) { series.data.setIndex(i, item); })`.
17. **`color.lighten()` / `color.darken()` are NOT instance methods** — `am5.color(0xff0000).lighten(0.3)` does NOT work. Use static methods: `am5.Color.lighten(color, 0.3)` to lighten, `am5.Color.lighten(color, -0.3)` to darken. There is NO `darken()` method — use negative lighten. Also available: `am5.Color.brighten()`, `am5.Color.saturate()`.
18. **Venn diagram has no `VennDiagram` class** — `am5venn.Venn` is pushed directly into a `Container`, NOT into a chart's `series`. See `references/venn.md`.
19. **Timeline `AxisRendererCurveX` requires `yRenderer`** — Always create the Y renderer first, then pass it: `am5timeline.AxisRendererCurveX.new(root, { yRenderer: yRenderer })`. Without this, crashes with `Cannot read properties of undefined (reading 'axis')`.
20. **Gantt data uses TWO separate calls** — Do NOT use `chart.data.setAll()`. Set categories on `chart.yAxis.data.setAll([{id, name, parentId, color}])` and tasks on `chart.series.data.setAll([{id, start, duration, progress, linkTo}])`. Use flat `parentId` for hierarchy, NOT nested `children` arrays. CDN order: `index.js` → `xy.js` → `plugins/colorPicker.js` → `gantt.js` → `themes/Animated.js` (gantt.js webpack-depends on colorPicker chunk). See `references/gantt.md`.
21. **No continent-level geodata at top-level CDN** — `geodata/europeLow.js` does NOT exist. Use `geodata/region/world/europeLow.js` (global: `am5geodata_region_world_europeLow`) or filter `worldLow` with `include: [...]`. On jsDelivr and unpkg the same path is under the geodata package's `dist/`: `https://cdn.jsdelivr.net/npm/@amcharts/amcharts5-geodata@<version>/dist/region/world/europeLow.js`.
22. **Do not add chart titles as HTML** — HTML titles are outside the chart and won't appear in exports. Use `am5.Label` pushed into the container BEFORE the chart, with `verticalLayout` on the container. See "Chart title" section above.
23. **`XYChartScrollbar` has no `xAxis`/`yAxis` settings** — its preview is a chart of its own, `scrollbar.chart`: push the preview's axes into `scrollbar.chart.xAxes`/`yAxes`, its series into `scrollbar.chart.series`, and give that series the data. Axes passed to `XYChartScrollbar.new()` are never added to the preview (its series then throws), and `get("xAxis")` only hands back whatever you passed. See `references/xy.md` → Scrollbar.
24. **`am5.color()` only accepts hex integers or CSS strings** — `am5.color(0xff0000)`, `am5.color("#ff0000")`, `am5.color("rgb(255,0,0)")` are valid. `am5.color({ r: 255, g: 0, b: 0 })` is NOT — it throws.
25. **`MapChart` has no default `colors`** — it inherits the `colors` setting from `SerialChart`, but no theme sets it on a map, so `chart.get("colors")` returns `undefined`, and map series don't use it anyway. XY and Radar charts (and percent series, via `series.get("colors")`) get a ColorSet from the theme. For maps, make your own: `am5.ColorSet.new(root, {})`.
26. **`VoronoiTreemap` has NO `.rectangles` property** — Unlike `Treemap` (which has `series.rectangles.template`), `VoronoiTreemap` renders organic polygon cells. Style via `series.nodes.template` and its children, not `.rectangles`.
27. **Labels with data placeholders need `populateText: true`** — `Label` defaults to `populateText: false`; labels the library makes for you (axis, legend, tooltip, pie/funnel slice labels, hierarchy and flow node labels…) get `true` from their own theme rules, but a `Label` you create does not. Any Label you create whose `text` has `{placeholders}` (a bullet sprite, a child of a bullet's container, a map point label) needs `populateText: true`, or it shows the braces literally. Example: `am5.Label.new(root, { text: "{name}", populateText: true, ... })`. A `tooltipText` is filled in regardless.
28. **Easing: `am5.ease.in()` does NOT exist** — amCharts 5 provides base easing functions (`am5.ease.cubic`, `am5.ease.bounce`, `am5.ease.elastic`, `am5.ease.linear`, `am5.ease.quad`, `am5.ease.sine`, `am5.ease.circle`, `am5.ease.exp`; `am5.ease.pow(t, e)` takes an exponent, so it is only usable wrapped: `(t) => am5.ease.pow(t, 3)`) and three modifiers: `am5.ease.out()`, `am5.ease.inOut()`, `am5.ease.yoyo()`. Usage: `am5.ease.cubic` (ease-in by default), `am5.ease.out(am5.ease.cubic)` (ease-out), `am5.ease.inOut(am5.ease.cubic)` (ease in+out). There is NO `am5.ease.in()` — using it throws a runtime error. The base functions already ease-in by default.
29. **`forceHidden` vs `visible`** — `forceHidden: true` ALWAYS hides an element, immune to states, themes/library and even `show()`. `visible` is weaker: amCharts re-manages it on many elements (notably cursor lines, but also labels, ticks, tooltips, grid) in response to interaction or data changes, so a `visible: false` you set may be flipped back to `true`. Rules of thumb: for a **persistent hide**, use `forceHidden: true` (`cursor.lineX.set("forceHidden", true)`, `yRenderer.labels.template.set("forceHidden", true)`, `xRenderer.grid.template.set("forceHidden", true)`). To **reveal** an element that defaults hidden — notably **axis ticks** (`ticks.template` defaults to `visible:false`) — you must raise `visible: true`; flipping `forceHidden` alone won't show it. For cursor lines specifically, always access `cursor.lineX`/`cursor.lineY` after creation — do NOT pass them as constructor options.
30. **`snapTooltip: true` on series for cursor tooltip snapping** — When using a cursor and you want tooltips to snap to data points, set `snapTooltip: true` on the series in addition to (or instead of) `snapToSeries` on the cursor. This is especially useful for timeline/curve charts.
31. **Globe rotation uses negative coordinates** — To center the globe (`geoOrthographic`) on a geographic point, set `rotationX` to **-longitude** and `rotationY` to **-latitude**. E.g., to center on Paris (48.86°N, 2.35°E): `chart.animate({ key: "rotationX", to: -2.35 }); chart.animate({ key: "rotationY", to: -48.86 });`. Using positive values rotates the globe the wrong way.
32. **`positionOnLine` with multi-segment lines limits per-segment control** — `MapPointSeries` data items can animate along a line via `positionOnLine` (0→1). If the line has 3+ points (multi-segment), position 0.5 is the midpoint of the *entire* path, making per-segment effects (scaling at each segment midpoint, pausing between segments, etc.) difficult. For advanced per-segment animations, use **single-segment lines** (2 points each) and animate the bullet across them sequentially. E.g., instead of one line [A,B,C,D], create [A,B], [B,C], [C,D].
33. **Do NOT exclude Antarctica (`exclude: ["AQ"]`) by default** — Many amCharts demos exclude Antarctica because they use Mercator projection where it appears disproportionately large. This is a demo-specific choice, not a best practice. Unless the user explicitly asks to exclude Antarctica, or references a demo that does so, keep Antarctica in the map. With non-Mercator projections (`geoNaturalEarth1`, `geoEqualEarth`, `geoOrthographic`, `geoEquirectangular`), Antarctica renders at a reasonable size.
34. **Custom GeoJSON for `MapPolygonSeries` needs CLOCKWISE exterior rings** — amCharts projects on a sphere (d3-geo), where ring winding decides which side is "inside". The RFC 7946 default is counter-clockwise, which d3-geo reads as *the whole globe minus the polygon*, so every polygon floods the entire map and the real shape shows only as a sliver. Programmatically generated GeoJSON (grids, cells, buffers) is usually CCW. amCharts does **not** auto-rewind — reverse only the polygons that come out inside out: if `am5map.getGeoArea({ type: "Polygon", coordinates: poly }) > 2 * Math.PI`, then `poly.forEach(ring => ring.reverse())`. That is safe on clockwise data and also catches small rings flipped by simplifying or rounding. See `references/map.md`.
35. **`axis.dispose()` does NOT remove the axis from `chart.xAxes`/`chart.yAxes`** — unlike `series.dispose()`, which self-removes from `chart.series`. A disposed axis stays in the list, keeps showing up in anything built from `chart.yAxes`, and makes `ChartSerializer` throw `Template is disposed`. Remove axes with `chart.yAxes.removeValue(axis)` (or `removeIndex(i)`) — the list auto-disposes the removed axis, no separate `dispose()` needed.
36. **Declare bullet callbacks as `function(root, series, dataItem)`** — amCharts passes all three; closing over an outer `root` works at runtime but breaks JSON round-trips (`ChartSerializer` captures the function source, and the outer `root` dangles on re-bind). Every `series.bullets.push(...)` in these references uses the parameter form — copy it.
37. **Several colors in one `am5.Graphics` `draw`** — `endFill()` fills everything since the last `beginPath()`, so start each color with `display.beginPath()`, or the last color paints over all shapes. Don't give such a Graphics its own `fill` either: after `draw` runs it fills the current path once more, so the last shape takes the Graphics' own `fill` (the default theme sets none). E.g. `draw: function (display) { display.beginPath(); display.beginFill(am5.color(0xff0000)); display.drawRect(0, 0, 10, 10); display.endFill(); display.beginPath(); display.beginFill(am5.color(0x0000ff)); display.drawRect(10, 0, 10, 10); display.endFill(); }`. An own `stroke` re-strokes the last path the same way.
38. **Changing a value on a data item moves nothing** — series draw from the working values: set `valueYWorking` (XY) or `valueWorking` (pie) along with the value, or use `series.data.setIndex()`. See "Dynamic data".
39. **A setting changed after a hover snaps back on unhover** — the `"default"` state keeps the value from before the first hover. Change it there too: `sprite.states.lookup("default")?.set("fill", c)`. See "States".
40. **`templateField` goes on the template, not on the series** — per-item settings from data rows are read by the elements a template makes: `series.columns.template.set("templateField", "columnSettings")`, likewise `slices.template`, `mapPolygons.template` or a bullet sprite. Set on the series, `templateField` does nothing and every column stays the same. For a pattern per column, see `references/xy.md` → "Different pattern per column".
41. **A JSON-config map that draws nothing with ES module imports** — the config names its geodata (`"geoJSON": "am5geodata_worldLow"`), and with ES module imports there is no global of that name. Pass the pack in `resources`: `JsonParser.parse(config, { parent, resources: { am5geodata_worldLow } })`, `element.resources`, or the framework packages' `resources` prop. The same goes for a locale (`am5locales_de_DE`). A console warning names the missing pack. A config serialized from such a chart copies the whole pack unless `ChartSerializer` gets the same `resources`.
42. **An `am5.Graphics` redraws only when `draw` changes** — `graphics.set("draw", fn)` with the function it already has does nothing. Pass a new closure that captures the new points: `graphics.set("draw", (display) => paint(display, points))`.
43. **A legend value without a cursor needs `calculateAggregates`** — `legendValueText` is used only under a cursor; otherwise the value label shows `legendRangeValueText`, which has no data item: `{valueY}` is empty there, and `{valueYClose}` (the latest value), `{valueYSum}`, `{valueYHigh}` and the other range values are empty unless the series has `calculateAggregates: true` (no warning). See `references/xy.md` → Legend.
44. **`#,###` does not round** — a number format without a `.` keeps every decimal (`6,708.044`); end it with `.` for whole numbers (`'#,###.'`) or give the decimals (`'#,###.00'`). Every number placeholder also gets a thousands separator, so `{year}` shows `2,024`: use `{year.formatNumber('#')}`. Sections are split by `|`, not `;`. See "Number formats".

## Easing functions

amCharts 5 easing functions live under `am5.ease`:

```js
// Base functions (ease-in by default) — these 8 are also the names `animations` / byName() accept:
am5.ease.linear    am5.ease.quad     am5.ease.cubic
am5.ease.sine      am5.ease.circle   am5.ease.exp
am5.ease.bounce    am5.ease.elastic

// pow(t, e) needs an exponent — passing am5.ease.pow directly gives NaN. Wrap it:
(t) => am5.ease.pow(t, 3)

// Modifiers — wrap a base function:
am5.ease.out(am5.ease.cubic)      // ease-out
am5.ease.inOut(am5.ease.cubic)    // ease in + out
am5.ease.yoyo(am5.ease.cubic)     // animate to end, then back to start

// Usage in .animate():
sprite.animate({
  key: "y", to: 100, duration: 400,
  easing: am5.ease.out(am5.ease.cubic)
});

// Name <-> function
am5.ease.byName("cubic", "out");                    // same as am5.ease.out(am5.ease.cubic); unknown name -> linear
am5.ease.easingInfo(am5.ease.yoyo(am5.ease.sine));  // { easing: "sine", yoyo: true }
```

**There is NO `am5.ease.in()`** — the base functions already ease-in by default. `easingInfo()` returns `undefined` for custom functions, `pow`, and combinations it cannot name (e.g. `out(yoyo(x))`) — such easings cannot go into an `animations` entry, and a code-started endless loop using one is not serialized.

## Validate generated code (if you can execute commands)

If you have the ability to run shell commands, validate your generated chart code before delivering it to the user:

1. Save the complete HTML+JS to a temp `.html` file
2. Open it in a headless browser (Puppeteer, Playwright, or similar) and collect console errors for a few seconds
3. If JavaScript errors are found, fix them and re-validate

Skip this step entirely if you cannot execute code (e.g., chat-only context with no tool access).


## Continued

The rest of this file is in `references/skill-part-4.md`. Read it as part of this file.
