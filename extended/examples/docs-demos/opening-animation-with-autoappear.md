---
title: "Opening animation with autoAppear"
source: "https://docs.amcharts.com/embeds/v5/opening-animation-with-autoappear/"
category: "docs-demos"
scraped: "2026-11-14"
docsPages: ["concepts/animations"]
---

A demo from the docs page "Animations" (get_doc(path: "concepts/animations")).

## JavaScript

```javascript
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
// autoAppear plays the opening animation when the chart is first drawn,
// the same as calling chart.appear(1000, 100)
// https://docs.amcharts.com/v5/concepts/animations/#automatic-appearance
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    autoAppear: true,
    appearDuration: 1000,
    appearDelay: 100
  })
);

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create series
// A series with autoAppear waits for its data, then grows its columns
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category",
    sequencedInterpolation: true,
    autoAppear: true,
    appearDuration: 1000
  })
);

// Set data
var data = [
  { category: "Research", value: 1000 },
  { category: "Marketing", value: 1200 },
  { category: "Sales", value: 850 },
  { category: "Support", value: 600 },
  { category: "Legal", value: 300 }
];

xAxis.data.setAll(data);
series.data.setAll(data);

// No appear() calls needed
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 95vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
