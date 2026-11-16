---
title: "Smoothed line series"
source: "https://docs.amcharts.com/v5/charts/xy-chart/series/smoothed-series/"
scraped: "2026-11-16"
---

This tutorial looks at what options we have to create smoothed line and area series.

## Creating smoothed line series

amCharts 5 offers types of smoothed line series:

| Class                        | Comment                                                                                |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| `am5xy.SmoothedXLineSeries`  | Used for horizontal series.                                                            |
| `am5xy.SmoothedYLineSeries`  | Used for vertical series.                                                              |
| `am5xy.SmoothedXYLineSeries` | Used for scenarios where series does not have any specific direct, e.g. scatter chart. |

Using proper axis type ensures that the line itself will not go outside its value bounds.

TypeScript:

```ts
let series = chart.series.push(
  am5xy.SmoothedXLineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date"
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.SmoothedXLineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date"
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/smoothed-series/SmoothedXSeries.png "`SmoothedXSeries`")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/smoothed-series/SmootherdYSeries.png "`SmoothedYSeries`")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/smoothed-series/SmoothedXYSeries.png "`SmoothedXYSeries`")

Example: [Smoothed line series](https://docs.amcharts.com/embeds/v5/smoothed-line-series/). Its code: get_example(path: "examples/docs-demos/smoothed-line-series").

## Line tension

Smoothed lines do have one setting: `tension`.

It's a numeric value from `0` (zero) to `1` (one) indicating strength the two connected points are "pulling" at the connecting line.

The smaller the number, the more lose and curvy the line will be. `1` indicates maximum strength which means it will be a perfectly straight line.

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/smoothed-series/tension_02.png "`tension: 0.2`")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/smoothed-series/tension_05.png "`tension: 0.5` (default)")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/smoothed-series/tension_08.png "`tension: 0.8`")

## Configuring appearance

By all intents and purposes all smoothed line series types are essentially a line series. Its appearance, just like line series, is configured via `strokes.template` and `fills.template`.

For more information, please refer to "[Line series: Configuring appearance](https://docs.amcharts.com/v5/charts/xy-chart/series/line-series/#configuring-appearance)" tutorial.

## Using D3 smoothing

If the three smoothed line series choices does not fit our requirements, we have an option of using various smoothing algorithms bundled with [d3-shape](https://github.com/d3/d3-shape) library.

Since those are not bundled with amCharts, you may need to load load them as modules from [d3-shape npm package](https://www.npmjs.com/package/d3-shape) or compiled JS binaries from some CDN:

TypeScript:

```ts
import * as d3 from "https://cdn.skypack.dev/d3-shape@3";
```

JavaScript:

```js
<script src="https://cdn.jsdelivr.net/npm/d3-shape@3"></script>
```

Then it's just as easy as setting `curveFactory` on your regular `LineSeries`:

TypeScript:

```ts
let series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    curveFactory: d3.curveBumpX
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    curveFactory: d3.curveBumpX
  })
);
```

Example: [Using d3 curve factories](https://docs.amcharts.com/embeds/v5/using-d3-curve-factories/). Its code: get_example(path: "examples/docs-demos/using-d3-curve-factories").

## Related tutorials

* [Line series with a border](https://docs.amcharts.com/v5/tutorials/line-series-with-a-border/)
