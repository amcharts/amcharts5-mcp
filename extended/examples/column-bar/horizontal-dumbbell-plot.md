---
title: "Horizontal Dumbbell Plot"
source: "https://www.amcharts.com/demos/horizontal-dumbbell-plot/"
category: "column-bar"
scraped: "2026-10-08"
---

A dumbbell plot puts two values on one row, a dot for each joined by a bar, so the gap between them is what you see first. Here, a made-up start and end value for each of 18 people.

When a dumbbell plot works: A dumbbell plot compares two values per row, like before and after or this year and last. The bar between the dots shows how big each change is and which way it goes, without the clutter of two bars per row. Laid on its side, it leaves room for long names and long lists.

Good for:
- Before and after, this year and last
- Gaps between two groups, like men and women
- Long lists of names down the side

Think twice when:
- More than two values per row: use clustered bars
- Totals that matter: bars from zero show them
- Changes that go both ways: color the rises and falls apart

Prompt: Create a horizontal dumbbell plot of eighteen people, each row a thin line from a start value to a higher end value with a dot at each end in two colors. Add a cursor and tooltips with both values. Use the amCharts 5 library with its Responsive theme.

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
  wheelX: "panY",   // a horizontal wheel or trackpad swipe pans the rows...
  wheelY: "zoomY",  // ...and the vertical wheel zooms in on them
  pinchZoomY: true, // pinch with two fingers to zoom the rows on touch screens
  paddingLeft: 0    // the names sit at the chart's left edge
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  // drag up or down across the plot to zoom in on those rows
  behavior: "zoomY"
}));
// only the horizontal line, which follows the rows
cursor.lineX.set("visible", false);

// Add scrollbar along the rows, hidden at first
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarY", am5.Scrollbar.new(root, { orientation: "vertical", forceHidden: true }));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yRenderer = am5xy.AxisRendererY.new(root, {
  minGridDistance: 20,   // at least 20px between names; on short charts some are skipped
  minorGridEnabled: true // a skipped name still gets a faint grid line
});

var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0,                   // no panning past the first or last name
  categoryField: "category",
  renderer: yRenderer,
  tooltip: am5.Tooltip.new(root, {}) // shows the hovered name on the axis
}));

yRenderer.labels.template.setAll({
  multiLocation: 0.5 // a label covering several names sits in the middle of them
})

yRenderer.grid.template.setAll({
  location: 1 // grid lines at the end of each row, between the dumbbells
})

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0,
  renderer: am5xy.AxisRendererX.new(root, {
    strokeOpacity: 0.1, // a faint axis line
    minGridDistance: 60 // at least 60px between value labels
  })
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  // the category axis is the base, so the columns run sideways along the value axis
  baseAxis: yAxis,
  valueXField: "close",
  openValueXField: "open", // each column starts at its open value instead of at zero
  categoryYField: "category",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{openValueX} to {valueX}" // both ends, as "93 to 99"
  })
}));

// a column half a pixel tall: the thin bar between the two dots
series.columns.template.setAll({
  height: 0.5
});

// The dots at both ends share one template, so a change to it resizes them all
var dotTemplate = am5.Template.new({
  scale: 1
});

var nextColor = chart.get("colors").getIndex(3); // a palette color three steps on, so the end dots stand apart from the start dots

// Round bullets, styled by the template
series.bullets.push(function () {
  return am5.Bullet.new(root, {
    // 0 puts this dot at the column's open value; the second bullet's 1, at its close value
    locationX: 0,
    sprite: am5.Circle.new(root, { radius: 5, fill: series.get("fill") }, dotTemplate)
  });
});
series.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationX: 1,
    sprite: am5.Circle.new(root, { radius: 5, fill: nextColor }, dotTemplate)
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
  "Maranda"
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

yAxis.data.setAll(data);
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
