---
title: "Radial Bar Chart"
source: "https://www.amcharts.com/demos/radial-bar-chart/"
category: "radar-polar"
scraped: "2026-03-15"
---

A Radial/Circular bar chart is a bar chart displayed on a polar coordinate system. The difference between radial column chart is that base axis of series is y axis of a radar chart making columns circular. You can easily adjust start/end angles of a chart by setting startAngle and endAngle of your RadarChart component.
Radar chart
Radar axes

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

// Generate and set data
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Setting_data
var cat = -1;

function generateData() {
  var value = Math.round(Math.random() * 10);
  cat++;
  return {
    category: "cat" + cat,
    value: value
  };
}

function generateDatas(count) {
  cat = -1;
  var data = [];
  for (var i = 0; i < count; ++i) {
    data.push(generateData());
  }
  return data;
}

// Create chart
// https://www.amcharts.com/docs/v5/charts/radar-chart/
var chart = root.container.children.push(am5radar.RadarChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "panX",
  wheelY: "zoomX",
  innerRadius: am5.percent(40)
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
var cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
  behavior: "zoomX"
}));

cursor.lineY.set("visible", false);

// Create axes and their renderers
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
var xRenderer = am5radar.AxisRendererCircular.new(root, {
  strokeOpacity: 0.1,
  minGridDistance: 50
});

xRenderer.labels.template.setAll({
  radius: 10,
  maxPosition: 0.98
});

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: xRenderer,
  extraMax: 0.1,
  tooltip: am5.Tooltip.new(root, {})
}));

var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: am5radar.AxisRendererRadial.new(root, { minGridDistance: 20 })
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
for (var i = 0; i < 5; i++) {
  var series = chart.series.push(am5radar.RadarColumnSeries.new(root, {
    stacked: true,
    name: "Series " + i,
    xAxis: xAxis,
    yAxis: yAxis,
    valueXField: "value",
    categoryYField: "category"
  }));

  series.set("stroke", root.interfaceColors.get("background"));
  series.columns.template.setAll({
    width: am5.p100,
    strokeOpacity: 0.1,
    tooltipText: "{name}: {valueX}"
  });

  series.data.setAll(generateDatas(6));
  series.appear(1000);
}

// Add scrollbars
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal", exportable: false }));
chart.set("scrollbarY", am5.Scrollbar.new(root, { orientation: "vertical", exportable: false }));

var data = generateDatas(6);
yAxis.data.setAll(data);

// Animate chart and series in
// https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
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
  height: 650px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
