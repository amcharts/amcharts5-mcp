---
title: "Step Line Without Risers"
source: "https://www.amcharts.com/demos/step-line-without-risers/"
category: "line-area"
scraped: "2026-10-08"
---

A step chart with only the flat parts: each day is a short level line over a light fill, with nothing joining one day to the next.

When to drop the risers: Without risers, each value stands alone as the level for its period, so the eye compares heights instead of following jumps. It suits values that belong to a slot, like a day’s quota or a month’s rate, where each level matters more than the change between them.

Good for:
- Values that apply to a whole day, week or month
- Rates or prices per period, like tariffs
- Busy step lines where the vertical lines get in the way

Think twice when:
- Showing how far a value jumped: keep the risers
- Hundreds of points: the dashes shrink to dots
- Exact comparisons between periods: columns are easier to read

Prompt: Create a step line chart of 50 daily values with the vertical risers turned off, so only the flat steps show, over a light fill. Add a cursor, tooltips and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

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
  wheelY: "zoomX",  // ...and the vertical wheel zooms in on the dates
  pinchZoomX: true, // pinch to zoom the dates on a touch screen
  paddingLeft: 0    // no gap at the chart's left edge
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  // drag across the plot to zoom in on those days
  behavior: "zoomX"
}));
cursor.lineY.set("visible", false); // no horizontal cursor line, only the vertical one

// Generate random data
var date = new Date();
date.setHours(0, 0, 0, 0); // start at midnight
var value = 100;           // the first value

// one day of data: the value moves up to 5 up or down from the day before
function generateData() {
  value = Math.round((Math.random() * 10 - 5) + value);

  if (value < 10) {
    value = 10; // but never below 10
  }

  am5.time.add(date, "day", 1); // the next day
  return { date: date.getTime(), value: value };
}

// a list of count days of data
function generateDatas(count) {
  var data = [];
  for (var i = 0; i < count; ++i) {
    data.push(generateData());
  }
  return data;
}

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  baseInterval: { timeUnit: "day", count: 1 }, // one data point a day
  renderer: am5xy.AxisRendererX.new(root, {
    // dragging the axis zooms it instead of panning
    pan: "zoom",
    minorGridEnabled: true, // fainter grid lines between the labeled dates
    minGridDistance: 80     // at least 80px between the date labels
  }),
  tooltip: am5.Tooltip.new(root, {}) // shows the cursor's date on the axis
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {
    pan: "zoom" // drag along the axis to zoom it
  })
}));

// Hide the label at the very bottom of the value axis: it would run into
// the first date label in the corner
yAxis.get("renderer").labels.template.set("minPosition", 0.05);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.StepLineSeries.new(root, {
  name: "Series",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  valueXField: "date",
  // only the flat steps: no vertical lines joining one to the next
  noRisers: true,
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}" // hover for the day's value
  })
}));

series.strokes.template.setAll({
  strokeWidth: 3 // a 3px line
});

series.fills.template.setAll({
  fillOpacity: 0.1, // a faint fill under the steps...
  visible: true     // ...turned on: line series have none by default
});

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // above the plot; zooms the dates
}));

var data = generateDatas(50); // 50 days
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
