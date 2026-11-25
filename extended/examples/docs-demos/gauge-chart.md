---
title: "Gauge chart"
source: "https://docs.amcharts.com/embeds/v5/gauge-chart/"
category: "docs-demos"
scraped: "2026-11-25"
docsPages: ["charts/radar-chart/gauge-charts"]
---

A demo from the docs page "Gauge charts" (get_doc(path: "charts/radar-chart/gauge-charts")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

## JavaScript

```javascript
// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5radar.RadarChart.new(root, {
    panX: false,
    panY: false,
    startAngle: -180,
    endAngle: 0
  })
);

var axisRenderer = am5radar.AxisRendererCircular.new(root, {
  innerRadius: am5.percent(98),
  strokeOpacity: 0.1,
  minGridDistance: 20
});

axisRenderer.onPrivate("radius", function () {
  axisRenderer.set("minGridDistance", axisRenderer.getPrivate("radius", 1) / 5);
});

var xAxis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0,
    min: 0,
    max: 100,
    strictMinMax: true,
    renderer: axisRenderer
  })
);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 300px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
