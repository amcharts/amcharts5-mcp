---
title: "Line with Different Colors for Ups and Downs"
source: "https://www.amcharts.com/demos/line-different-colors-ups-downs/"
category: "line-area"
scraped: "2026-10-08"
---

A line that turns green where the value rises and red where it falls, so every move up or down stands out. The tooltip takes the color of the move too.

When to color by direction: Coloring each step by its direction turns a jagged line into a record of gains and losses: long green runs are rallies, red runs are slides. It works best on daily data where up is good and down is bad, like prices or sales.

Good for:
- Stock and crypto prices
- Daily sales, sign-ups or visits
- Spotting streaks of gains or losses

Think twice when:
- Very dense data: tiny segments flicker between colors
- Readers with red-green color blindness: add another cue
- When the level matters more than each move: use one color

Prompt: Create a line chart of 100 daily values where each segment is green when the value rises from the day before and red when it falls, with the tooltip in the color of the segment under it. Add a cursor and a horizontal scrollbar with a preview of the line. Use the amCharts 5 library with its Responsive theme.

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
    panX: true,       // drag the plot to pan...
    panY: true,       // ...in any direction
    wheelX: "panX",   // a horizontal wheel or trackpad swipe pans...
    wheelY: "zoomX",  // ...and the vertical wheel zooms in on the dates
    pinchZoomX: true, // pinch with two fingers to zoom on touch screens
    paddingLeft: 0    // the value labels sit at the chart's left edge
  })
);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none" // a drag over the plot pans the chart instead of zooming
}));
cursor.lineY.set("visible", false); // no horizontal cursor line

// Generate random data
var date = new Date();
date.setHours(0, 0, 0, 0);
var value = 100;
var previousValue = value;
var downColor = root.interfaceColors.get("negative"); // the theme's color for falls...
var upColor = root.interfaceColors.get("positive");   // ...and for rises
var color;
var previousColor;
var previousDataObj;

// the next day's data point, colored by whether it rose or fell
function generateData() {
  value = Math.round(Math.random() * 10 - 5 + value);
  am5.time.add(date, "day", 1);

  if (value >= previousValue) {
    color = upColor;
  } else {
    color = downColor;
  }
  previousValue = value;

  var dataObj = { date: date.getTime(), value: value, color: color }; // color will be used for tooltip background

  // only if changed
  if (color != previousColor) {
    if (!previousDataObj) {
      previousDataObj = dataObj;
    }
    // set on the previous point, where the segment leading up to this one starts
    previousDataObj.strokeSettings = { stroke: color };
  }

  previousDataObj = dataObj;
  previousColor = color;

  return dataObj;
}

// count days of data in a row
function generateDatas(count) {
  var data = [];
  for (var i = 0; i < count; ++i) {
    data.push(generateData());
  }
  return data;
}

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 }, // one data point per day
    renderer: am5xy.AxisRendererX.new(root, {
      minorGridEnabled: true, // faint grid lines between the main ones
      minGridDistance: 70     // at least 70px between date labels
    }),
    tooltip: am5.Tooltip.new(root, {}) // shows the hovered date on the axis
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date"
  })
);

// the line takes a new color from each data item that has strokeSettings
series.strokes.template.set("templateField", "strokeSettings");

var tooltip = series.set("tooltip", am5.Tooltip.new(root, {
  labelText: "{valueY}" // the hovered value
}));

// set the fill again each time the tooltip moves, so the adapter below runs
tooltip.on("pointTo", function () {
  var background = tooltip.get("background");
  background.set("fill", background.get("fill"));
});

// the tooltip background takes its color from the data item
tooltip.get("background").adapters.add("fill", function (fill) {
  if (tooltip.dataItem) {
    return tooltip.dataItem.dataContext.color;
  }
  return fill;
});

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
var scrollbar = chart.set(
  "scrollbarX",
  am5xy.XYChartScrollbar.new(root, {
    orientation: "horizontal", // a scrollbar above the plot, with a preview of the data...
    height: 60                 // ...60px tall
  })
);

// the scrollbar holds a small chart of its own: these axes and series draw its preview of the data
var sbDateAxis = scrollbar.chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { // one point per day
      timeUnit: "day",
      count: 1
    },
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);

var sbValueAxis = scrollbar.chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

var sbSeries = scrollbar.chart.series.push(
  am5xy.LineSeries.new(root, {
    valueYField: "value",
    valueXField: "date",
    xAxis: sbDateAxis,
    yAxis: sbValueAxis
  })
);

// Generate and set data
var data = generateDatas(100);
series.data.setAll(data);
sbSeries.data.setAll(data); // the preview gets the same data

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
