---
title: "Radar series"
source: "https://docs.amcharts.com/v5/charts/radar-chart/radar-series/"
scraped: "2026-11-16"
---

While radar series resemble their equivalents in XY chart in how they are configured, there are some differences. This tutorial will address those.

## Connecting ends

Line-based series like `RadarLineSeries` and `SmoothedRadarLineSeries` will automatically connect their first and last data points to complete the circle.

We can disable this behavior using series' `connectEnds` setting:

TypeScript:

```ts
let series = chart.series.push( 
  am5radar.RadarLineSeries.new(root, { 
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueYField: "value",
    valueXField: "date",
    connectEnds: false
  }) 
);
```

JavaScript:

```js
var series = chart.series.push( 
  am5radar.RadarLineSeries.new(root, { 
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueYField: "value",
    valueXField: "date",
    connectEnds: false
  }) 
);
```

![](https://docs.amcharts.com/v5/images/charts/radar-chart/radar-series/connectends_true.png "`connectEnds: true` (default)")

![](https://docs.amcharts.com/v5/images/charts/radar-chart/radar-series/connectends_false.png "`connectEnds: false`")

Example: [Disabling radar line series end connection](https://docs.amcharts.com/embeds/v5/disabling-radar-line-series-end-connection/). Its code: get_example(path: "examples/docs-demos/disabling-radar-line-series-end-connection").
