---
title: "Waterfall Chart"
source: "https://www.amcharts.com/demos/waterfall-chart/"
category: "column-bar"
scraped: "2026-03-15"
---

Waterfall Chart (also known as Flying bricks chart, Mario chart, Cascade chart) is most frequently used to display the effect of the series of consecutive positive or negative events on the initial value.
Mixed series types
amCharts 5 allows mixing a number of different series on the same chart. This particular Waterfall chart is enabled by combining a floating Column series and a no-riser Step series.
Flexible line start and end location setting enables fine-tuning connector line position for perfect fit.
XY chart
Column series
Step line series

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,
  panY: false,
  paddingLeft: 0
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, { 
  minGridDistance: 30,
  minorGridEnabled: true
 });

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0,
  categoryField: "category",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {})
}));

xRenderer.grid.template.setAll({
  location: 1
})

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0,
  min: 0,
  renderer: am5xy.AxisRendererY.new(root, { strokeOpacity: 0.1 }),
  tooltip: am5.Tooltip.new(root, {})
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis,
  yAxis: yAxis
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  openValueYField: "open",
  categoryXField: "category"
}));

series.columns.template.setAll({
  templateField: "columnConfig",
  strokeOpacity: 0
})

series.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      text: "${displayValue} K",
      centerY: am5.p50,
      centerX: am5.p50,
      populateText: true
    })
  });
});


var stepSeries = chart.series.push(am5xy.StepLineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "stepValue",
  categoryXField: "category",
  noRisers: true,
  locationX: 0.65,
  stroke: root.interfaceColors.get("alternativeBackground")
}));

stepSeries.strokes.template.setAll({
  strokeDasharray: [3, 3]
})

var colorSet = am5.ColorSet.new(root, {});

// Set data
var data = [{
  category: "Net revenue",
  value: 8786,
  open: 0,
  stepValue: 8786,
  columnConfig: {
    fill: colorSet.getIndex(13),
  },
  displayValue: 8786
}, {
  category: "Cost of sales",
  value: 8786 - 2786,
  open: 8786,
  stepValue: 8786 - 2786,
  columnConfig: {
    fill: colorSet.getIndex(8),
  },
  displayValue: 2786
}, {
  category: "Operating expenses",
  value: 8786 - 2786 - 1786,
  open: 8786 - 2786,
  stepValue: 8786 - 2786 - 1786,
  columnConfig: {
    fill: colorSet.getIndex(9),
  },
  displayValue: 1786
}, {
  category: "Amortisation",
  value: 8786 - 2786 - 1786 - 453,
  open: 8786 - 2786 - 1786,
  stepValue: 8786 - 2786 - 1786 - 453,
  columnConfig: {
    fill: colorSet.getIndex(10),
  },
  displayValue: 453
}, {
  category: "Income from equity",
  value: 8786 - 2786 - 1786 - 453 + 1465,
  open: 8786 - 2786 - 1786 - 453,
  stepValue: 8786 - 2786 - 1786 - 453 + 1465,
  columnConfig: {
    fill: colorSet.getIndex(16),
  },
  displayValue: 1465
}, {
  category: "Operating income",
  value: 8786 - 2786 - 1786 - 453 + 1465,
  open: 0,
  columnConfig: {
    fill: colorSet.getIndex(17),
  },
  displayValue: 8786 - 2786 - 1786 - 453 + 1465
}];

xAxis.data.setAll(data);
series.data.setAll(data);
stepSeries.data.setAll(data);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 500px
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
