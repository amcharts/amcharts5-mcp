# Frameworks (React, Vue, Angular, Svelte, React Native)

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
