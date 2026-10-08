---
title: "Line with Different Negative Color"
source: "https://www.amcharts.com/demos/date-based-line-chart/"
category: "line-area"
scraped: "2026-10-08"
---

A line chart that turns orange where it drops below zero, line and fill alike. The same trick works for any threshold, not just zero.

When to color by threshold: Coloring the part of a line beyond a threshold shows at a glance when a value was good or bad, without reading the axis. Zero is the natural line for profit and loss or temperatures; a target, a limit or an average works the same way.

Good for:
- Profit and loss, gains and losses
- Temperatures above and below freezing
- Values against a target or a safe limit

Think twice when:
- Several thresholds at once: bands of color get hard to read
- Data that hovers around the threshold: the color flickers
- Readers who can’t tell the colors apart: label the threshold too

Prompt: Create a smoothed line chart of about five months of daily values that follow a slow wave, dipping below zero in the middle. Color the line and its fill differently below zero. Add a cursor and tooltips. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    wheelY: "zoomX" // the mouse wheel zooms in on the dates
  })
);

// Generate random data: a slow wave with some noise on it,
// so the line dips below zero and comes back up
var data = generateChartData();
function generateChartData() {
  var chartData = [];
  var firstDate = new Date();
  firstDate.setDate(firstDate.getDate() - 150);
  var noise = 0;
  for (var i = 0; i < 150; i++) {
    var newDate = new Date(firstDate);
    newDate.setHours(0, 0, 0);
    newDate.setDate(newDate.getDate() + i);
    // random noise that wanders but keeps pulling back toward zero
    noise = (noise + (Math.random() - 0.5) * 8) * 0.92;

    chartData.push({
      date: newDate.getTime(),
      value: Math.round(Math.sin((i + 8) / 20) * 45 + 10 + noise) // a slow sine wave plus the noise
    });
  }
  return chartData;
}

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    // the axis tooltip shows one more decimal than the axis labels
    extraTooltipPrecision: 1,
    renderer: am5xy.AxisRendererY.new(root, {
      minGridDistance: 30 // at least 30px between labels
    })
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 }, // one point per day
    renderer: am5xy.AxisRendererX.new(root, {
      minorGridEnabled: true, // fainter grid lines between the labeled dates
      cellStartLocation: 0.2,
      cellEndLocation: 0.8
    })
  })
);

// Create series
var series = chart.series.push(
  am5xy.SmoothedXLineSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      labelText:"{valueX.formatDate()}: {valueY}", // the date and the value
      pointerOrientation:"horizontal"              // the tooltip points sideways at the line
    })
  })
);

series.strokes.template.setAll({
  strokeWidth: 3 // a 3px line
});

series.fills.template.setAll({
  fillOpacity: 0.5, // a half-transparent fill...
  visible: true     // ...which line series hide by default
});

series.data.setAll(data);

// Color the part below zero: a series axis range from far below the data up to 0
// draws that stretch of the line and fill in its own color
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-ranges/#series-axis-ranges
var rangeDataItem = yAxis.makeDataItem({
  value: -1000,
  endValue: 0
});

var range = series.createAxisRange(rangeDataItem);

range.strokes.template.setAll({
  stroke: am5.color(0xff621f), // orange below zero...
  strokeWidth: 3               // ...as thick as the main line
});

range.fills.template.setAll({
  fill: am5.color(0xff621f), // and an orange fill
  fillOpacity: 0.5,
  visible: true              // line fills are hidden by default
});

// Add cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    // drag across the plot to zoom into those days
    behavior: "zoomX",
    xAxis: xAxis // the cursor snaps to whole days
  })
);

xAxis.set( // the cursor shows the date on this axis...
  "tooltip",
  am5.Tooltip.new(root, {})
);

yAxis.set( // ...and the value on this one
  "tooltip",
  am5.Tooltip.new(root, {})
);

// Add scrollbar, hidden at first
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal", forceHidden: true }));

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
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
