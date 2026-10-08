---
title: "Evenly Spaced Date Axis"
source: "https://www.amcharts.com/demos/evenly-spaced-date-axis/"
category: "line-area"
scraped: "2026-10-08"
---

A line chart of weekdays only: Saturdays and Sundays have no values, so the axis leaves them out and Friday sits right next to Monday, with no empty gap.

Leaving out days without data: Markets, offices and schools have no figures on weekends. A normal date axis still makes room for those days, so the line runs straight across empty gaps; an evenly spaced axis gives every data point the same width and skips the rest. This demo uses the older CategoryDateAxis; for new charts, use GaplessDateAxis, which works like a regular date axis.

Good for:
- Stock prices and other trading-day data
- Business-day figures: orders, tickets, sales
- Series with holidays and other missing days

Think twice when:
- Gaps that mean something, like a factory shutdown: let them show
- Readings at irregular times, like sensor data: keep a real date axis
- Comparing durations: a long break looks as short as a weekend

Prompt: Create a line chart of about 200 weekdays of values on a date axis that spaces the dates evenly, so the weekends leave no gaps. Show the weekday in the axis tooltip, and add a cursor, tooltips and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

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
  panX: true,      // drag the plot sideways to pan
  panY: false,
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX", // ...and the vertical wheel zooms in on the dates
  pinchZoomX:true  // pinch with two fingers to zoom on touch screens
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none" // a drag over the plot pans the chart instead of zooming
}));
cursor.lineY.set("visible", false); // no horizontal cursor line

// Generate random data
var date = new Date();
date.setHours(0, 0, 0, 0);
var value = 1;

// the next weekday's data point, a few points up or down from the last
function generateData() {
  value = Math.round((Math.random() * 10 - 5) + value);
  // weekdays only: step over Saturdays and Sundays, so Friday is followed by Monday
  do {
    am5.time.add(date, "day", 1);
  } while (date.getDay() == 0 || date.getDay() == 6);

  return {
    date: date.getTime(),
    value: value
  };
}

// count weekdays of data in a row
function generateDatas(count) {
  var data = [];
  for (var i = 0; i < count; ++i) {
    data.push(generateData());
  }
  return data;
}

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/category-date-axis/
var xRenderer = am5xy.AxisRendererX.new(root, {});
// hide a label that would be cut off at either end of the axis
xRenderer.labels.template.set("minPosition", 0.01);
xRenderer.labels.template.set("maxPosition", 0.99);

// each date in the data gets an equal slot, so the skipped weekends leave no gaps
var xAxis = chart.xAxes.push(
  am5xy.CategoryDateAxis.new(root, {
    categoryField: "date",
    baseInterval: { // one category per day
      timeUnit: "day",
      count: 1
    },
    renderer: xRenderer,
    // Show the weekday in the axis tooltip, so you can see Friday is followed by Monday
    tooltipDateFormat: "EEE, MMM d",
    tooltip: am5.Tooltip.new(root, {}) // the axis tooltip, at the cursor
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Series",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  categoryXField: "date"
}));

var tooltip = series.set("tooltip", am5.Tooltip.new(root, {}));
tooltip.label.set("text", "{valueY}"); // the hovered value

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // a scrollbar above the plot, to zoom and pan the dates
}));

// Set data
var data = generateDatas(200);
series.data.setAll(data);
xAxis.data.setAll(data);

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
  max-width: 100%;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
