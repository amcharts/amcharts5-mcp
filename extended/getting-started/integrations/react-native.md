---
title: "Using amCharts 5 with React Native"
source: "https://docs.amcharts.com/v5/getting-started/integrations/react-native/"
scraped: "2026-10-22"
---

Use amCharts 5 in [React Native](https://reactnative.dev/) with our [`@amcharts/amcharts5-react-native`](https://www.npmjs.com/package/@amcharts/amcharts5-react-native) package. amCharts draws the chart in a WebView, so every chart type, theme and feature works as it does on the web.

## Installation

```shell
npm install @amcharts/amcharts5-react-native react-native-webview
```

With Expo, install `react-native-webview` with `npx expo install react-native-webview`. It works in Expo Go.

It needs React Native 0.72 and react-native-webview 13 or later. `@amcharts/amcharts5` does not have to be installed: the WebView loads the library from the amCharts CDN, in the version the package was released with.

## A chart from a JSON config

The simplest way: a [JSON config](https://docs.amcharts.com/v5/concepts/serializing/), as an object or a string. The chart types it uses are loaded for it, and so is map geodata named by its global, e.g. `"geoJSON": "am5geodata_worldLow"`.

```typescript
import { AmChart } from "@amcharts/amcharts5-react-native";

<AmChart config={config} themes={["Animated"]} style={{ height: 300 }} />
```

## A chart written in code

The code runs in the WebView, so it is a string, written as for script tags: `am5xy` is a global there, not an import. It gets `root`, `data` (the `data` prop) and `post(name, value)`, which calls `onMessage` in the app. The files it uses are loaded for it.

```typescript
const code = `
const chart = root.container.children.push(am5xy.XYChart.new(root, {}));

const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "country",
  renderer: am5xy.AxisRendererX.new(root, {})
}));

const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));

const series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  categoryXField: "country",
  valueYField: "visits"
}));

// A tap on a column tells the app which country it is
series.columns.template.events.on("click", (event) => {
  post("country", event.target.dataItem.dataContext.country);
});

xAxis.data.setAll(data);
series.data.setAll(data);

// New data goes to this function, without making the chart again
return (newData) => {
  xAxis.data.setAll(newData);
  series.data.setAll(newData);
};
`;

<AmChart
  code={code}
  data={visits}
  themes={["Animated"]}
  style={{ height: 300 }}
  onMessage={(name, value) => console.log(name, value)}
/>
```

-   When `data` changes, by content, the function the code returned gets it. Without one, the chart is made again.
-   A different `code` makes the chart again.
-   Everything that goes between the app and the chart is JSON. Give dates as timestamps.
-   Never build `code` from text a user typed or a server sent: pass such values in `data`.

A ref gives `run(code)`, which runs code in the chart's page, with `root`, `chart` (the chart a config made), `result` (what the code returned), `data` and `post`:

```typescript
const chartView = useRef(null);

<AmChart ref={chartView} config={config} />

// Animate the first series of the chart again
chartView.current.run("chart.series.getIndex(0).appear(1000)");
```

## Props

| Prop | What it is |
| --- | --- |
| `config` | The chart as a JSON config: an object or a JSON string. |
| `code` | The chart as code, used when there is no `config`. |
| `data` | Data for `code`, as `data`. It must be JSON. |
| `themes` | Theme names, e.g. `["Animated", "Dark"]`. |
| `renderer` | `"svg"` draws the chart as SVG; the default is canvas. |
| `licenses` | amCharts license keys, which remove the logo. |
| `modules` | More script files to load, e.g. `"locales/de_DE"` for a locale named only in a config, or full URLs. |
| `libraryUrl` | Where the library's script files are. The default is the amCharts CDN. |
| `geodataUrl` | Where the geodata files are. |
| `onReady` | Called when the chart is built. |
| `onError` | Called with a message when the chart could not be built or its code failed. Without it, the message goes to `console.warn`. |
| `onMessage` | Called with `(name, value)` when the chart's code calls `post`. |
| `style` | For the view the chart is in. Give it a height, or `flex: 1`; without one it is 400 high. |
| `webViewProps` | Props for the WebView, except the ones the chart needs for itself. |

## License

With a commercial license, give its keys in `licenses`, on each chart. Calling `am5.addLicense()` in `code` would be too late: a chart decides on the logo when its root is made.

## Good to know

-   Each chart is a WebView. A screen with many charts uses more memory, and a chart takes a moment to appear.
-   The device needs a connection the first time, to load the library from the CDN; after that the WebView caches it. `libraryUrl` can point to your own copy of the library's script files.
-   Links in the chart, such as the amCharts logo, open in the browser.
-   If the system ends the WebView's process, the chart is made again.

An [example app](https://github.com/amcharts/amcharts5/tree/master/integrations/react-native/examples/expo) for Expo is on GitHub.
