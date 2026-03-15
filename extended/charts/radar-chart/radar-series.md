---
title: "Radar series"
source: "https://www.amcharts.com/docs/v5/charts/radar-chart/radar-series/"
scraped: "2026-03-15"
---

While radar series resemble their equivalents in XY chart in how they are configured, there are some differences. This tutorial will address those.

## Connecting ends

Line-based series like `RadarLineSeries` and `SmoothedRadarLineSeries` will automatically connect their first and last data points to complete the circle.

We can disable this behavior using series' `connectEnds` setting:

let series = chart.series.push( 
  am5radar.RadarLineSeries.new(root, { 
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueYField: "value",
    valueXField: "date",
    connectEnds: false
  }) 
);

var series = chart.series.push( 
  am5radar.RadarLineSeries.new(root, { 
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueYField: "value",
    valueXField: "date",
    connectEnds: false
  }) 
);

`connectEnds: true` (default)

`connectEnds: false`


