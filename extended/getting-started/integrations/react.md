---
title: "Using amCharts 5 with React"
source: "https://www.amcharts.com/docs/v5/getting-started/integrations/react/"
scraped: "2026-10-22"
---

Use amCharts 5 in React with our [`@amcharts/amcharts5-react`](https://www.npmjs.com/package/@amcharts/amcharts5-react) package. It creates and disposes the chart with your component, and works with server rendering.

## Installation

```shell
npm install @amcharts/amcharts5 @amcharts/amcharts5-react
```

It needs React 18 or later and amCharts 5.21.0 or later.

## A chart written in code

`useAmChart()` gives your function a new root. Build the chart in it as in any amCharts example, and put the returned `ref` on an element with a height:

```typescript
import { useAmChart } from "@amcharts/amcharts5-react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function Chart({ data }) {
  const { ref } = useAmChart((root) => {
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: "category"
      })
    );
    xAxis.data.setAll(data);

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Value",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category"
      })
    );
    series.data.setAll(data);

    const legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);

    chart.set("cursor", am5xy.XYCursor.new(root, {}));
  }, [data]);

  return <div ref={ref} style={{ width: "100%", height: "500px" }}></div>;
}

export default Chart;
```

-   The chart is made again when a value in the second argument (`[data]` here) changes. Leave it out to make the chart once.
-   The chart is disposed when the component goes away. The double mount of React's strict mode is handled.
-   The element can be rendered later, e.g. after a loading message: the chart is made when it is there.
-   `useAmChart(setup, deps, { renderer: "svg" })` draws the chart as SVG.
-   If your function throws, the error goes to the nearest error boundary.

### Updating without making the chart again

`useAmChart()` also returns `root`, and `result`: what your function returned. Keep what you need there and change it when the data changes:

```typescript
import { useEffect } from "react";
import { useAmChart } from "@amcharts/amcharts5-react";

function Chart({ data }) {
  const { ref, result } = useAmChart((root) => {
    // ... the chart, as above, without setting data
    return { xAxis, series };
  }, []);

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

## A chart from a JSON config

`<AmChart>` builds a chart from a [JSON config](https://www.amcharts.com/docs/v5/concepts/serializing/), with no chart code:

```typescript
import { AmChart } from "@amcharts/amcharts5-react";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

<AmChart
  config={config}
  themes={[am5themes_Animated]}
  style={{ height: "500px" }}
  onReady={({ root, chart }) => { /* the chart is built */ }}
/>
```

| Prop | What it is |
| --- | --- |
| `config` | The chart as a JSON config: an object or a JSON string. A config with different content makes the chart again; the same content written inline on every render does not. |
| `src` | A URL to load the config from, used when there is no `config`. |
| `themes` | Theme classes, e.g. `[am5themes_Animated]`. Themes are not part of a config. |
| `renderer` | `"svg"` draws the chart as SVG; the default is canvas. |
| `onReady` | Called with `{ root, chart }` when the chart is built. |
| `onError` | Called when it could not be built. |
| `id`, `className`, `style` | For the chart's element. Without a height, it is 400 pixels high. |

It is the library's [`<am5-chart>` element](https://www.amcharts.com/docs/v5/getting-started/integrations/am5-chart-element/): a `ref` on it gives that element.

## Server rendering

Both work in pages rendered on a server: the library is loaded in the browser only. See [Next.js](https://www.amcharts.com/docs/v5/getting-started/integrations/next-js/) and [React Router](https://www.amcharts.com/docs/v5/getting-started/integrations/using-amcharts-5-with-remix/).

## License

With a commercial license, call `am5.addLicense()` once when the app starts, e.g. in `main.jsx`, before any chart is made. Not in your chart function: a chart decides on the logo when its root is made.

## Without the package

To manage the chart yourself, create the root in an effect and dispose it in the effect's cleanup:

```typescript
import { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function Chart({ data }) {
  const chartdiv = useRef(null);

  useLayoutEffect(() => {
    const root = am5.Root.new(chartdiv.current);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {})
    );

    // ... axes, series and data, as above

    return () => {
      root.dispose();
    };
  }, [data]);

  return <div ref={chartdiv} style={{ width: "100%", height: "500px" }}></div>;
}

export default Chart;
```

## Examples

Example apps for Vite, Next.js, React Router and Astro are [on GitHub](https://github.com/amcharts/amcharts5/tree/master/integrations/react/examples).

The sandboxes below create the chart without the package.

### Simple chart

### With data binding

### Stock chart
