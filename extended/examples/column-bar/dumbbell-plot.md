---
title: "Dumbbell Plot"
source: "https://www.amcharts.com/demos/dumbbell-plot/"
category: "column-bar"
scraped: "2026-10-08"
---

The dumbbell plot standing up: for each of 29 people, two dots on a vertical line, the lower one a start value and the upper one an end value. The longer the line, the bigger the change.

Dumbbells standing up: Standing the dumbbells up suits categories that read left to right, such as months or a lineup of short names. With the names turned on their side, dozens fit across the chart, and the line lengths compare at a glance. For long names, lay the plot on its side.

Good for:
- Change per month, store or team
- Dozens of short category names
- Ranges, like lowest and highest price

Think twice when:
- Long names: the horizontal version gives them room
- Changes in both directions: color the rises and falls apart
- Many points in time: two lines show the trend better

Prompt: Create a vertical dumbbell plot of about thirty people, each a thin line from a start value up to a higher end value with a dot at each end in two colors, and the names running vertically under them. Add a cursor and tooltips. Use the amCharts 5 library with its Responsive theme.

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
  wheelX: "panX",   // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX",  // ...and the vertical wheel zooms in on the names
  pinchZoomX: true, // pinch with two fingers to zoom on touch screens
  paddingLeft: 0    // the value labels sit at the chart's left edge
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  // drag across the plot to zoom in on those names
  behavior: "zoomX"
}));
cursor.lineY.set("visible", false); // no horizontal cursor line

// Add scrollbar, hidden at first
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal", forceHidden: true }));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minGridDistance: 30 // at least 30px between names; on narrow screens some are skipped
});
xRenderer.labels.template.setAll({
  rotation: -90,    // the names read upward...
  centerY: am5.p50, // ...centered under their dumbbells...
  centerX: 0        // ...all starting at the same bottom line
});

xRenderer.grid.template.setAll({
  visible: false // no vertical grid lines
})

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0,                   // no panning past the first or last name
  categoryField: "category",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {}) // shows the hovered name on the axis
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0,
  renderer: am5xy.AxisRendererY.new(root, {})
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "Series 1",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "close",
  openValueYField: "open", // each column starts at its open value instead of at zero
  categoryXField: "category",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{openValueY} to {valueY}" // both ends, as "93 to 99"
  })
}));
// a column half a pixel wide: the thin bar between the two dots
series.columns.template.setAll({
  width: 0.5
});

// The dots at each end share a template, so a change to it restyles them all
var startDot = am5.Template.new({
  scale: 1,
  fill: series.get("fill") // the start dots in the series' color...
});

var endDot = am5.Template.new({
  scale: 1,
  fill: chart.get("colors").getIndex(1) // ...the end dots in the next palette color
});

// Round bullets, styled by the template
series.bullets.push(function() {
  return am5.Bullet.new(root, {
    // 0 puts this dot at the column's open value; the second bullet's 1, at its close value
    locationY: 0,
    sprite: am5.Circle.new(root, { radius: 5 }, startDot) // 5px radius, styled by the startDot template
  });
});
series.bullets.push(function() {
  return am5.Bullet.new(root, {
    locationY: 1,
    sprite: am5.Circle.new(root, { radius: 5 }, endDot)
  });
});

// Set data
var data = [];
var open = 100;
var close = 120;

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
  "Hans",
  "Glennie"
];

// random ranges: each start drifts a little from the last, each range spans 3 to 13
for (var i = 0; i < names.length; i++) {
  open += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
  close = open + Math.round(Math.random() * 10) + 3;
  data.push({
    category: names[i],
    open: open,
    close: close
  });
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
