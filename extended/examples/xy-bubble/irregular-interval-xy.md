---
title: "Irregular Interval XY"
source: "https://www.amcharts.com/demos/irregular-interval-xy/"
category: "xy-bubble"
scraped: "2026-10-08"
---

A column chart where each column is as wide as the stretch it covers: the elevation profile of a 50 km route, in six stretches of different lengths.

When columns differ in width: Ordinary columns are all the same width, which hides how long each interval is. Here the width is the length of the stretch and the height its altitude, so a long flat section looks long and a short climb looks short. It suits values that hold over uneven ranges.

Good for:
- Elevation or speed along a route
- Rates that apply over a range, like tax bands
- Periods of different lengths, like billing cycles

Think twice when:
- Equal intervals: plain columns do the job
- Values that change smoothly: a line or area chart shows the slope
- Readers who might take the area of a column, not its height, as the value

Prompt: Create an XY chart of an elevation profile over 50 km: six stretches of different lengths drawn as columns that span their stretch, in alternating colors, with the distance marked at every point where a stretch begins or ends. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,     // no dragging the plot
  panY: false,
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX", // ...and the vertical wheel zooms in on the route
  layout: root.verticalLayout
}));

// Add scrollbars, hidden at first
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal", forceHidden: true }));
chart.set("scrollbarY", am5.Scrollbar.new(root, { orientation: "vertical", forceHidden: true }));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,                   // the route from km 0...
  max: 50,                  // ...to km 50...
  strictMinMax: true,       // ...exactly, not rounded out
  numberFormat: "#.#' km'", // as "12.5 km"
  renderer: am5xy.AxisRendererX.new(root, {}),
  tooltip: am5.Tooltip.new(root, {}) // shows the km at the cursor
}));

// The X axis shows its own grid and labels only where the stretches begin and end (see below)
xAxis.get("renderer").grid.template.set("forceHidden", true);
xAxis.get("renderer").labels.template.set("forceHidden", true);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  // start exactly at min, with a little room above the highest column
  min: 0,
  strictMinMax: true,
  extraMax: 0.08,
  numberFormat: "#,###' m'",         // as "1,020 m"
  renderer: am5xy.AxisRendererY.new(root, {}),
  tooltip: am5.Tooltip.new(root, {}) // shows the altitude at the cursor's height
}));

// Data: an elevation profile, one item per stretch of the route, from the km where it starts
// to the km where it ends. The stretches are of different lengths, so the columns are too.
// Neighboring stretches take turns with the first two colors of the theme.
var colors = chart.get("colors");
var data = [{
  from: 0,
  to: 14,
  altitude: 400,
  columnSettings: { fill: colors.getIndex(0) }
}, {
  from: 14,
  to: 22,
  altitude: 500,
  columnSettings: { fill: colors.getIndex(1) }
}, {
  from: 22,
  to: 26,
  altitude: 550,
  columnSettings: { fill: colors.getIndex(0) }
}, {
  from: 26,
  to: 29,
  altitude: 750,
  columnSettings: { fill: colors.getIndex(1) }
}, {
  from: 29,
  to: 43,
  altitude: 930,
  columnSettings: { fill: colors.getIndex(0) }
}, {
  from: 43,
  to: 50,
  altitude: 1020,
  columnSettings: { fill: colors.getIndex(1) }
}];

// Add series: each column spans from `from` to `to` on the X axis
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/column-series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  openValueXField: "from",
  valueXField: "to",
  valueYField: "altitude"
}));

// Columns fill their whole stretch, with no borders. The tooltip sits on the column itself,
// so it always describes the stretch under the pointer
series.columns.template.setAll({
  width: am5.p100,
  strokeOpacity: 0,
  fillOpacity: 1, // fully opaque
  templateField: "columnSettings",
  tooltipText: "{from}–{to} km: [bold]{altitude} m[/]", // as "14–22 km: 500 m"
  tooltipY: 0
});

series.data.setAll(data);

// Create grid lines and labels at every point where a stretch begins or ends
var marks = data.map(function(item) {
  return item.from;
});
marks.push(data[data.length - 1].to);

marks.forEach(function(value, index) {
  var rangeDataItem = xAxis.makeDataItem({
    value: value
  });

  xAxis.createAxisRange(rangeDataItem);

  // Only the last label carries the unit, so labels of short stretches don't run into each other.
  // It ends at the right edge instead of sticking out past it
  var last = index == marks.length - 1;
  rangeDataItem.get("label").setAll({
    forceHidden: false, // shown, though the axis hides its own labels
    text: last ? value + " km" : String(value),
    centerX: last ? am5.p100 : am5.p50
  });

  rangeDataItem.get("grid").setAll({
    forceHidden: false, // shown too...
    strokeOpacity: 0.2  // ...but faint
  });
});

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis,
  yAxis: yAxis
}));

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear();
chart.appear(1000, 10);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 500px;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
