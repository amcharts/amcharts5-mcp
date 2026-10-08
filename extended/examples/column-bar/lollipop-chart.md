---
title: "Lollipop Chart"
source: "https://www.amcharts.com/demos/lollipop-chart/"
category: "column-bar"
scraped: "2026-10-08"
---

A lollipop chart is a column chart drawn with thin stems and a dot on top, lighter on the eye when there are many categories. Here, made-up values for 28 people, with a scrollbar to zoom in on a few names.

When a lollipop beats a column: Lollipops say what columns say with far less ink, so a chart with dozens of categories stays light, and the dots carry the eye along the values. The stems start at zero, as columns do, so their lengths compare fairly. They suit long lists and rankings more than a few big numbers.

Good for:
- Dozens of categories in one chart
- Rankings and scores
- Pages where heavy columns would dominate

Think twice when:
- A handful of values: columns read faster
- Values close together: switch on the value labels
- A trend over time: a line chart joins the points

Prompt: Create a lollipop chart of about thirty people, each value a thin stem from zero with a dot on top, and the names running vertically under the stems. Add a cursor, tooltips and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

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
  // a drag zooms (the cursor's behavior), so the chart itself doesn't pan
  panX: false,
  panY: false,
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX", // ...and the vertical wheel zooms in on the names
  scrollbarX: am5.Scrollbar.new(root, { orientation: "horizontal" }), // a zoom and scroll bar above the plot
  pinchZoomX: true, // pinch with two fingers to zoom on a touch screen
  paddingLeft: 0    // the value labels sit at the chart's left edge
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  // drag across the plot to zoom in on those stems
  behavior: "zoomX"
}));
cursor.lineY.set("visible", false); // only the vertical cursor line, no horizontal one

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minGridDistance: 15, // only 15px between labels, enough for the turned names
  minorGridEnabled: true
});

xRenderer.labels.template.setAll({
  rotation: -90,    // names read bottom to top...
  centerY: am5.p50, // ...centered on their stem...
  centerX: 0        // ...and anchored at the start of the name
});

xRenderer.grid.template.setAll({
  visible: false // no grid lines between the names
});

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0, // no panning past the first or last name
  categoryField: "category",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {})
}));

// The stems stand on zero, so their lengths compare like columns; some room is left above the tallest
var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0, // no panning past the value range
  min: 0,
  extraMax: 0.1,
  renderer: am5xy.AxisRendererY.new(root, {})
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  categoryXField: "category",
  adjustBulletPosition: false, // dots placed by the stem's full height, even if partly out of view
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}" // the tooltip shows the value
  })
}));
series.columns.template.setAll({
  // a plain number is pixels, not a share of the category: a hairline stem
  width: 0.5
});

// The dots share one template, so a change to it restyles them all
var dotTemplate = am5.Template.new({
  scale: 1 // full size; change it to resize all the dots
});

// Round bullets, styled by the template
series.bullets.push(function() {
  return am5.Bullet.new(root, {
    // at the top end of the stem
    locationY: 1,
    sprite: am5.Circle.new(root, { radius: 5, fill: series.get("fill") }, dotTemplate) // a 5px dot, stem color
  });
});

// Set data
var data = [];
var value = 60; // the values start near 60

var names = ["Raina",
  "Demarcus",
  "Carlo",
  "Jacinda",
  "Richie",
  "Antony",
  "Amada",
  "Idalia",
  "Janella",
  "Marla",
  "Curtis",
  "Shellie",
  "Meggan",
  "Nathanael",
  "Jannette",
  "Tyrell",
  "Sheena",
  "Maranda",
  "Briana",
  "Rosa",
  "Rosanne",
  "Herman",
  "Wayne",
  "Shamika",
  "Suk",
  "Clair",
  "Olivia",
  "Hans"
];

// Each value is a random step of up to 15 from the one before, never below 10
for (var i = 0; i < names.length; i++) {
  value = Math.max(10, value + Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 15));
  data.push({ category: names[i], value: value });
}

xAxis.data.setAll(data);
series.data.setAll(data);

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
  height: 500px;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
