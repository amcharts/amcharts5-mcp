---
title: "Comparing Different Date Values Google Analytics Style"
source: "https://www.amcharts.com/demos/comparing-different-date-values-google-analytics-style/"
category: "line-area"
scraped: "2026-10-08"
---

This week against last week, the way analytics dashboards show it: a solid line for the current days, a dotted line for the same weekdays a week earlier, and both dates in one tooltip.

When to compare periods: Setting a period next to the one before answers the question people ask most: are we doing better? Matching the same weekdays keeps weekly patterns, such as quiet Sundays, from looking like changes.

Good for:
- Website traffic, week over week
- Sales against the same month last year
- Any figure with a weekly or seasonal rhythm

Think twice when:
- Periods of different length, like February against March
- More than two periods: the lines get tangled
- When the change itself is the story: show the difference as columns

Prompt: Create a Google Analytics-style line chart comparing this week with last week, day by day: a solid line for this week and a dotted line for last week, each with its own bullet shape. The tooltip shows both dates and both values. Add a cursor. Use the amCharts 5 library with its Responsive theme.

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
  panX: true,      // drag the plot sideways to pan...
  panY: true,      // ...or up and down
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans
  wheelY: "zoomX", // the vertical wheel zooms in on the days
  pinchZoomX:true  // pinch to zoom on touch screens
}));

chart.get("colors").set("step", 3); // the second series skips ahead three colors, so the weeks differ more

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineY.set("visible", false); // no horizontal cursor line, only the vertical one

// Add scrollbar, hidden at first
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal", forceHidden: true }));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  maxDeviation: 0.3, // pan up to 30% of the visible range past the first and last day
  baseInterval: {    // one point per day
    timeUnit: "day",
    count: 1
  },
  // fainter grid lines between the labeled days
  renderer: am5xy.AxisRendererX.new(root, { minorGridEnabled: true }),
  tooltip: am5.Tooltip.new(root, {}) // the cursor shows the date on the axis
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0.3, // the values can be panned 30% past their range too
  renderer: am5xy.AxisRendererY.new(root, {})
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  name: "This week",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value1",
  valueXField: "date",
  // one tooltip for both weeks: last week's date and value come from the same data row
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueX}: {valueY}\n{previousDate}: {value2}"
  })
}));

series.strokes.template.setAll({
  strokeWidth: 2 // a 2px line
});

// a see-through tooltip, so the lines show through it
series.get("tooltip").get("background").set("fillOpacity", 0.5);

// last week's values are drawn on this week's dates, so the two weeks line up day by day
var series2 = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Last week",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value2",
  valueXField: "date"
}));
series2.strokes.template.setAll({
  strokeDasharray: [2, 2], // dotted: 2px dash, 2px gap
  strokeWidth: 2           // 2px thick
});

// Stars on this week, triangles on last week. They share one template, so setting its scale resizes them all
var bulletTemplate = am5.Template.new({
  scale: 1 // full size; change it to resize every bullet
});

series.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Star.new(root, {
      spikes: 5, // a five-pointed star...
      radius: 8, // ...8px to its tips...
      innerRadius: am5.percent(50), // ...with its dents at half of that
      fill: series.get("stroke"), // in the line's color
      stroke: root.interfaceColors.get("background"), // outlined in the background color...
      strokeWidth: 1 // ...1px wide
    }, bulletTemplate)
  });
});

series2.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Triangle.new(root, {
      width: 13, // a 13px by 12px triangle...
      height: 12,
      centerX: am5.p50, // ...centered on the point
      centerY: am5.p50,
      fill: series2.get("stroke"), // in the line's color
      stroke: root.interfaceColors.get("background"), // outlined in the background color
      strokeWidth: 1
    }, bulletTemplate)
  });
});

// Format dates in tooltips, e.g. "Thu, Jun 12"
// https://www.amcharts.com/docs/v5/concepts/formatters/formatting-dates/
root.dateFormatter.setAll({
  dateFormat: "EEE, MMM d",
  dateFields: ["valueX", "previousDate"]
});

// Set data: each day of this week, with the same weekday a week earlier
var data = [{
  date: new Date(2025, 5, 12).getTime(),
  value1: 50,
  value2: 48,
  previousDate: new Date(2025, 5, 5).getTime()
}, {
  date: new Date(2025, 5, 13).getTime(),
  value1: 53,
  value2: 51,
  previousDate: new Date(2025, 5, 6).getTime()
}, {
  date: new Date(2025, 5, 14).getTime(),
  value1: 56,
  value2: 58,
  previousDate: new Date(2025, 5, 7).getTime()
}, {
  date: new Date(2025, 5, 15).getTime(),
  value1: 52,
  value2: 53,
  previousDate: new Date(2025, 5, 8).getTime()
}, {
  date: new Date(2025, 5, 16).getTime(),
  value1: 48,
  value2: 44,
  previousDate: new Date(2025, 5, 9).getTime()
}, {
  date: new Date(2025, 5, 17).getTime(),
  value1: 47,
  value2: 42,
  previousDate: new Date(2025, 5, 10).getTime()
}, {
  date: new Date(2025, 5, 18).getTime(),
  value1: 59,
  value2: 55,
  previousDate: new Date(2025, 5, 11).getTime()
}];

series.data.setAll(data);
series2.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
series2.appear(1000);
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
