---
title: "Polar Area Chart"
source: "https://www.amcharts.com/demos/polar-area-chart/"
category: "radar-polar"
scraped: "2026-11-21"
---

A polar area chart, also called a rose or coxcomb chart, draws a stacked column for every direction around a circle. Here, a wind rose: where the wind comes from, and how strong.

When a polar area chart works: When the categories are directions or times of day, a circle puts each one where it belongs, so the longest slices point the way at once. Here they show the wind blowing mostly from the south-west, and the stacked colors show how strong it was.

Good for:
- Wind roses and other compass data
- Hours of the day or months of the year
- Totals split into a few ordered parts

Think twice when:
- Categories with no order: use a bar chart
- Precise reading of the outer parts: area grows faster than length
- Many stacked parts: the inner ones get thin

Prompt: Create a polar area chart as a wind rose: sixteen compass directions, each with stacked columns showing how often the wind blew from there at five speed ranges (sample data), and a legend of the speeds. Use the amCharts 5 library with its ResponsiveMax theme.

The demo's page on amcharts.com adds controls that are not part of this code: Stroke opacity, Rounded corners, Curved labels, Legend, Legend position, Scrollbar.

## JavaScript

```javascript
// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_ResponsiveMax.new(root)
]);

// Data: a wind rose. How often the wind blew from each direction over a year, in % of the time,
// split by wind speed (sample data)
// https://docs.amcharts.com/v5/charts/radar-chart/#setting-data
var data = [
  { direction: "N", s1: 1.2, s2: 1.5, s3: 0.9, s4: 0.4, s5: 0.1 },
  { direction: "NNE", s1: 1.0, s2: 1.1, s3: 0.6, s4: 0.2, s5: 0.1 },
  { direction: "NE", s1: 1.1, s2: 1.3, s3: 0.8, s4: 0.3, s5: 0.1 },
  { direction: "ENE", s1: 1.0, s2: 1.2, s3: 0.7, s4: 0.3, s5: 0.1 },
  { direction: "E", s1: 1.3, s2: 1.8, s3: 1.2, s4: 0.5, s5: 0.2 },
  { direction: "ESE", s1: 1.0, s2: 1.3, s3: 0.8, s4: 0.3, s5: 0.1 },
  { direction: "SE", s1: 1.1, s2: 1.5, s3: 1.0, s4: 0.4, s5: 0.1 },
  { direction: "SSE", s1: 1.2, s2: 1.7, s3: 1.2, s4: 0.6, s5: 0.2 },
  { direction: "S", s1: 1.5, s2: 2.3, s3: 1.9, s4: 1.0, s5: 0.4 },
  { direction: "SSW", s1: 1.6, s2: 2.8, s3: 2.5, s4: 1.5, s5: 0.7 },
  { direction: "SW", s1: 1.8, s2: 3.4, s3: 3.2, s4: 2.1, s5: 1.2 },
  { direction: "WSW", s1: 1.7, s2: 3.1, s3: 3.0, s4: 2.0, s5: 1.1 },
  { direction: "W", s1: 1.6, s2: 2.7, s3: 2.4, s4: 1.5, s5: 0.8 },
  { direction: "WNW", s1: 1.3, s2: 1.9, s3: 1.4, s4: 0.8, s5: 0.3 },
  { direction: "NW", s1: 1.2, s2: 1.6, s3: 1.1, s4: 0.5, s5: 0.2 },
  { direction: "NNW", s1: 1.1, s2: 1.4, s3: 0.8, s4: 0.3, s5: 0.1 }
];

// Create chart
// https://docs.amcharts.com/v5/charts/radar-chart/
var chart = root.container.children.push(am5radar.RadarChart.new(root, {
  panX: false, // no dragging the plot around
  // a vertical layout puts the legend under the chart, clear of the scrollbar
  layout: root.verticalLayout,
  panY: false,
  wheelX: "panX",  // a horizontal wheel or trackpad swipe moves a zoomed view around...
  wheelY: "zoomX"  // ...and the vertical wheel zooms in on some directions
}));

// Add cursor
// https://docs.amcharts.com/v5/charts/radar-chart/#cursor
var cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
  behavior: "zoomX" // drag across some directions to zoom in on them
}));

cursor.lineY.set("visible", false); // no circle through the pointer, only the line from the center

// Create axes and their renderers
// https://docs.amcharts.com/v5/charts/radar-chart/#adding-axes
var xRenderer = am5radar.AxisRendererCircular.new(root, {
  // small enough that all 16 directions keep their label
  minGridDistance: 10
});
xRenderer.labels.template.setAll({
  radius: 10 // the direction labels sit 10px outside the circle
});

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0, // can't be zoomed or panned past the first or last direction
  categoryField: "direction",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {}) // shows the direction under the pointer at the edge
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  numberFormat: "#'%'", // the value plus a % sign; quoted, so it isn't multiplied by 100
  renderer: am5radar.AxisRendererRadial.new(root, {})
}));

// Create series: one stacked column series per wind speed, the calmest in the middle
// https://docs.amcharts.com/v5/charts/radar-chart/#adding-series
function createSeries(name, field) {
  var series = chart.series.push(am5radar.RadarColumnSeries.new(root, {
    stacked: true, // each speed sits on top of the one before, so a wedge shows them all
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: field,
    categoryXField: "direction"
  }));

  // outlines in the background color draw a gap between the wedges
  series.set("stroke", root.interfaceColors.get("background"));
  series.columns.template.setAll({
    // each wedge fills its whole direction, touching its neighbors
    width: am5.p100,
    strokeWidth: 2, // 2px wide
    strokeOpacity: 0.1, // but faint, at 10%
    tooltipText: "{name}: {valueY}% of the time" // the speed band and its share of the time
  });

  series.data.setAll(data);
  series.appear(1000);
}

createSeries("0-2 m/s", "s1");
createSeries("2-4 m/s", "s2");
createSeries("4-6 m/s", "s3");
createSeries("6-8 m/s", "s4");
createSeries("8+ m/s", "s5");

// Add scrollbar, hidden at first
// https://docs.amcharts.com/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal", exportable: false, forceHidden: true }));

// Add legend: the wind speeds; click one to leave it out
// https://docs.amcharts.com/v5/charts/radar-chart/#legend
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50, // the legend's middle...
  x: am5.p50        // ...at the middle of the chart
}));
legend.data.setAll(chart.series.values);

xAxis.data.setAll(data);

// Accessibility: keyboard and screen reader support
// https://docs.amcharts.com/v5/concepts/accessibility/
chart.setAll({
  focusable: true, // Tab reaches the chart, and a screen reader names it
  role: "figure",
  ariaLabel: "Wind rose: for each of 16 directions, how much of the year the wind blew from it, in % of the time, split into five speed bands. Tab to a speed band's wedges, then move between the directions with the arrow keys"
});
// each speed band's wedges: one Tab stop (a focusable group), the arrow keys step through the directions
chart.series.each(function (series) {
  series.columns.template.setAll({
    focusable: true,
    role: "figure",
    isMeasured: false, // radar columns have no width or height of their own: without this, they can't take focus
    focusableGroup: series.get("name"),
    hoverOnFocus: true, // a focused wedge shows its tooltip
    ariaLabel: "{categoryX}, {name}: {valueY}% of the time"
  });
});
// the legend: one Tab stop too, after the data; the arrow keys step through its items, and Enter hides or shows one
legend.itemContainers.template.setAll({
  focusableGroup: "legend",
  tabindexOrder: 10 // the chart's parts are focused in this order, from low to high (0 if not set)
});

// Animate chart
// https://docs.amcharts.com/v5/concepts/animations/#initial-animation
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
  height: 500px;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js
