---
title: "Mixed Daily and Intra-Day Chart"
source: "https://www.amcharts.com/demos/mixed-daily-and-intra-day-chart/"
category: "line-area"
scraped: "2026-10-08"
---

Hourly readings and daily averages on one chart: the line has a point for every hour, each column the average of that day. Two date axes keep them in step.

Why mix two time scales: Daily figures show the overall trend; hourly ones show what happened within each day. Drawing both on one value scale shows how far single hours stray from their day’s average, without switching between two charts.

Good for:
- Sensor readings with daily averages
- Website traffic by hour and by day
- Energy use: hourly load against the daily mean

Think twice when:
- Values on different scales: give each series its own value axis
- Months or years of data: hourly detail turns into noise
- Readers who may take a column for one hour: say what each shows

Prompt: Create a chart with two time scales: a line of hourly values over ten days, with columns behind it showing each day’s average. Each series has its own date axis, but they share one value axis. Add a cursor and tooltips. Use the amCharts 5 library with its Responsive theme.

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
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true, // the chart can be reached with the Tab key
    panX: true,      // drag the plot sideways to pan through the days
    panY: true,      // and up and down
    wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
    wheelY: "zoomX", // ...and the vertical wheel zooms in on the days
    pinchZoomX: true // pinch with two fingers to zoom on a touch screen
  })
);

// Generate random data: a value for every hour of the last ten days,
// and the average of each day's 24 values
var hourlyData = [];
var dailyData = [];
var firstDate = new Date();
firstDate.setDate(firstDate.getDate() - 10); // ten days ago...
firstDate.setHours(0, 0, 0, 0); // ...at midnight
var value = 10; // the starting value

for (var day = 0; day < 10; day++) {
  var sum = 0;
  for (var hour = 0; hour < 24; hour++) {
    // each hour the value moves up or down by up to 10%
    value = Math.round(value * (0.9 + Math.random() * 0.2) * 100) / 100;
    sum += value; // for the day's average
    var date = new Date(firstDate);
    date.setDate(date.getDate() + day);
    date.setHours(hour);
    hourlyData.push({ date: date.getTime(), value: value });
  }
  var dayDate = new Date(firstDate);
  dayDate.setDate(dayDate.getDate() + day);
  // the day's average, rounded to 2 decimals
  dailyData.push({ date: dayDate.getTime(), value: Math.round(sum / 24 * 100) / 100 });
}

// Add scrollbar, hidden at first
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal", forceHidden: true }));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/

// One value axis, shared by the hourly line and the daily columns
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0.1, // pans at most 10% past the value range
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Hourly date axis for the line. Its labels and grid are hidden:
// the daily axis below shows the dates.
var xAxis1 = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    maxDeviation: 0.1, // pans up to 10% past the first and last hour
    tooltipDateFormat: "MMM d, HH:00", // the axis tooltip shows the date and the hour
    baseInterval: { timeUnit: "hour", count: 1 }, // one point per hour
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 50
    }),
    tooltip: am5.Tooltip.new(root, {}) // a date and hour label follows the cursor along the axis
  })
);

xAxis1.get("renderer").labels.template.set("forceHidden", true);
xAxis1.get("renderer").grid.template.set("forceHidden", true);

// Daily date axis for the columns
var xAxis2 = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    maxDeviation: 0.1, // pans up to 10% past the first and last day
    baseInterval: { timeUnit: "day", count: 1 }, // one column per day
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 50 // at least 50px between the date labels
    })
  })
);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series1 = chart.series.push(
  am5xy.LineSeries.new(root, {
    xAxis: xAxis1,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal", // the tooltip sits beside the point
      labelText: "Hourly: {valueY}"     // the hour's value
    })
  })
);

series1.strokes.template.setAll({
  strokeWidth: 2 // a 2px line
});

series1.data.setAll(hourlyData);

// unshift() puts the columns first, so they are drawn behind the line
var series2 = chart.series.unshift(
  am5xy.ColumnSeries.new(root, {
    xAxis: xAxis2,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",    // the tooltip sits beside the column
      labelText: "Daily average: {valueY}" // the day's average
    })
  })
);

// no outline: the columns are only their fill, so a fading fill fades all of them
series2.columns.template.set("strokeOpacity", 0);

series2.data.setAll(dailyData);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  // the cursor snaps to the hours of the line's axis
  xAxis: xAxis1
}));
cursor.lineY.set("visible", false); // only the vertical cursor line, no horizontal one

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series1.appear(1000, 100);
series2.appear(1000, 100);
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
