---
title: "Highlighting Line Chart Series on Legend Hover"
source: "https://www.amcharts.com/demos/highlighting-line-chart-series-on-legend-hover/"
category: "line-area"
scraped: "2026-10-08"
---

Ten lines on one chart get tangled. Point at a name in the legend and that line thickens while the others fade, so you can follow it from start to end.

When to highlight on hover: Many lines on one chart are good for comparing, but hard to read one by one. Highlighting lets the reader pick out a line without hiding the rest, so it stays in context.

Good for:
- Comparing many products, regions or stocks
- Finding one line in a crowd
- Dashboards that people explore

Think twice when:
- Touch screens: there is no hover, so rely on legend clicks
- Two or three lines: label them directly
- One line that matters most: color it and gray the rest from the start

Prompt: Create a line chart of ten series of daily values with a legend on the right that shows each series’ value. Hovering a legend item highlights its line: it gets thicker and the other lines fade. Add a cursor, tooltips and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// a theme of our own, with rules for the minor labels and the vertical grid lines
const myTheme = am5.Theme.new(root);

myTheme.rule("AxisLabel", ["minor"]).setAll({
  dy:1 // the minor labels sit 1px lower
});

myTheme.rule("Grid", ["x"]).setAll({
  strokeOpacity: 0.05 // very faint vertical grid lines...
});

myTheme.rule("Grid", ["x", "minor"]).setAll({
  strokeOpacity: 0.05 // ...the minor ones too
});

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  myTheme,
  am5themes_Responsive.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,      // drag the plot to pan...
  panY: true,      // ...in any direction
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX", // ...and the vertical wheel zooms in on the dates
  // only the line closest to the pointer shows its tooltip
  maxTooltipDistance: 0,
  pinchZoomX:true, // pinch with two fingers to zoom on touch screens
  paddingTop: 10,  // 10px of space at the top, right and left
  paddingRight: 10,
  // room under the date axis for the cursor's date tooltip
  paddingBottom: 15,
  paddingLeft: 10
}));

var date = new Date();
date.setHours(0, 0, 0, 0);
var value; // the walk's last value, set to 0 for each series below

// the next day's data point, a few points up or down from the last
function generateData() {
  value = Math.round((Math.random() * 10 - 4.2) + value);
  am5.time.add(date, "day", 1);
  return {
    date: date.getTime(),
    value: value
  };
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
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  maxDeviation: 0.2, // panning can go up to 20% past the first and last day
  baseInterval: {    // one data point per day
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true // faint grid lines between the main ones
  }),
  tooltip: am5.Tooltip.new(root, {}) // shows the hovered date on the axis
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
for (var i = 0; i < 10; i++) {
  var series = chart.series.push(am5xy.LineSeries.new(root, {
    name: "Series " + i,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    legendValueText: "{valueY}", // the legend shows the value at the cursor
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal", // the tooltip points sideways at the line, not down on it
      labelText: "{valueY}"             // the hovered value
    })
  }));

  // each series is its own random walk, from today and from 0
  date = new Date();
  date.setHours(0, 0, 0, 0);
  value = 0;

  var data = generateDatas(100);
  series.data.setAll(data);

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear();
}

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none" // a drag over the plot pans the chart instead of zooming
}));
cursor.lineY.set("visible", false); // no horizontal cursor line

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // a scrollbar above the plot, to zoom and pan the dates
}));

// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
// as wide as a series name and its value need
var legend = chart.rightAxesContainer.children.push(am5.Legend.new(root, {
  width: 130,
  paddingLeft: 10,         // 10px from the plot
  height: am5.percent(100) // as tall as the plot
}));

// When legend item container is hovered, dim all the series except the hovered one
legend.itemContainers.template.events.on("pointerover", function(e) {
  var itemContainer = e.target;

  // As series list is data of a legend, dataContext is series
  var series = itemContainer.dataItem.dataContext;

  chart.series.each(function(chartSeries) {
    if (chartSeries != series) {
      // the text color, faded: dark gray on a light background, light gray on a dark one
      chartSeries.strokes.template.setAll({
        strokeOpacity: 0.15,
        stroke: root.interfaceColors.get("text")
      });
    } else {
      chartSeries.strokes.template.setAll({
        strokeWidth: 3 // the hovered series gets a thicker line
      });
    }
  })
})

// When legend item container is unhovered, make all series as they are
legend.itemContainers.template.events.on("pointerout", function(e) {
  var itemContainer = e.target;
  var series = itemContainer.dataItem.dataContext;

  chart.series.each(function(chartSeries) {
    chartSeries.strokes.template.setAll({
      strokeOpacity: 1,               // back to solid...
      strokeWidth: 1,                 // ...1px...
      stroke: chartSeries.get("fill") // ...lines in their own colors
    });
  });
})

legend.itemContainers.template.set("width", am5.p100); // legend items fill the legend's width...
legend.valueLabels.template.setAll({
  width: am5.p100,   // ...so the values...
  textAlign: "right" // ...line up on the right
});

// It's important to set legend data after all the events are set on template, otherwise events won't be copied
legend.data.setAll(chart.series.values);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
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
