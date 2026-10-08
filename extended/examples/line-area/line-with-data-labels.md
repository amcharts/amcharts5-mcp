---
title: "Line with Data Labels"
source: "https://www.amcharts.com/demos/line-with-data-labels/"
category: "line-area"
scraped: "2026-10-08"
---

A line chart that writes the value above every point, so the numbers are there without hovering. Here, sixteen readings half an hour apart through one night.

When to label every point: Labels put the exact figure on the chart itself, so it survives a screenshot, a printout or a slide, where nobody can hover. Readers get the numbers and the trend from one picture.

Good for:
- Short series, up to 20 or 30 points
- Reports, slides and printouts
- Figures people will quote, like prices or scores

Think twice when:
- Hundreds of points: label only the last one, or the highs and lows
- Several lines close together: their labels overlap
- Trends where the shape matters more than the numbers

Prompt: Create a line chart of 16 values taken every 30 minutes, with round bullets and a label above each point that shows its value in a small outlined box. Add a cursor, tooltips and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

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
  panX: true,      // drag the plot sideways to pan through the times
  panY: true,      // and up and down
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX", // ...and the vertical wheel zooms in on the times
  pinchZoomX: true // pinch with two fingers to zoom on a touch screen
}));

// a scrollbar above the plot to zoom and scroll through the times
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minGridDistance: 60,   // at least 60px between labels; on narrow screens some are skipped
  minorGridEnabled: true // fainter grid lines between the labeled ones
});

var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  baseInterval: { timeUnit: "minute", count: 30 }, // one data point every 30 minutes
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {}),              // a time label follows the cursor along the axis
  // 1% extra room before the first point and after the last one
  extraMin: 0.01,
  extraMax: 0.01,
  tooltipLocation: 0 // the axis tooltip shows the start of the interval, where the point is
}));

var yRenderer = am5xy.AxisRendererY.new(root, {});

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: yRenderer
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none", // dragging the plot pans instead of selecting a range to zoom
  xAxis: xAxis      // the cursor snaps to this axis' 30-minute intervals
}));
cursor.lineY.set("visible", false); // only the vertical cursor line, no horizontal one

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Series",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  valueXField: "timestamp",
  // each point sits at the start of its 30-minute interval, on its exact time
  locationX: 0,
  // the tooltip takes its color from the first bullet (the circle) instead of the series
  seriesTooltipTarget: "bullet",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}" // the tooltip shows the point's value
  })
}));

// All bullets share one template, so setting its radius resizes them at once
var circleTemplate = am5.Template.new({
  radius: 6,                       // 6px radius
  templateField: "bulletSettings", // a data item's bulletSettings can override these settings
  fill: series.get("fill"),        // filled in the line's color...
  strokeWidth: 2,                  // ...with a 2px ring...
  stroke: root.interfaceColors.get("background") // ...in the background color around it
});

// a dot on each point
series.bullets.push(function () {
  var circle = am5.Circle.new(root, {}, circleTemplate);

  return am5.Bullet.new(root, {
    sprite: circle,
    locationX: 0 // at the start of the interval, where the point is
  });
});

// a value label above each point
series.bullets.push(function () {
  var label = am5.Label.new(root, {
    populateText: true, // fill in {valueY} from the data item
    text: "{valueY}",   // the point's value
    centerX: am5.p50,   // centered over the point
    // anchored 30px below its top, which lifts the label above the point
    centerY: 30,
    fontSize: 10,       // small...
    fontWeight: "bold", // ...bold text
    paddingBottom: 4,   // room around the text inside its box
    paddingTop: 4,
    paddingLeft: 6,
    paddingRight: 6,
    fill: am5.Color.brighten(series.get("fill"), -0.1), // a little darker than the line
  });

  // The box takes the chart's background color, so it works in light and dark mode
  label.set("background", am5.RoundedRectangle.new(root, {
    fill: root.interfaceColors.get("background"),
    fillOpacity: 0.75, // slightly see-through
    cornerRadiusBL: 3, // rounded corners
    cornerRadiusBR: 3,
    cornerRadiusTL: 3,
    cornerRadiusTR: 3,
    stroke: series.get("fill"), // outlined in the line's color
  }));

  return am5.Bullet.new(root, {
    sprite: label,
    locationX: 0 // at the start of the interval, where the point is
  });
});

var data = [{
  "timestamp": new Date(2026, 0, 1, 22, 30).getTime(),
  "value": 99.71
}, {
  "timestamp": new Date(2026, 0, 1, 23, 0).getTime(),
  "value": 99.13
}, {
  "timestamp": new Date(2026, 0, 1, 23, 30).getTime(),
  "value": 100.5
}, {
  "timestamp": new Date(2026, 0, 2, 0, 0).getTime(),
  "value": 101
}, {
  "timestamp": new Date(2026, 0, 2, 0, 30).getTime(),
  "value": 99.95
}, {
  "timestamp": new Date(2026, 0, 2, 1, 0).getTime(),
  "value": 100.9
}, {
  "timestamp": new Date(2026, 0, 2, 1, 30).getTime(),
  "value": 100.39
}, {
  "timestamp": new Date(2026, 0, 2, 2, 0).getTime(),
  "value": 101.1
}, {
  "timestamp": new Date(2026, 0, 2, 2, 30).getTime(),
  "value": 101.45
}, {
  "timestamp": new Date(2026, 0, 2, 3, 0).getTime(),
  "value": 101.15
}, {
  "timestamp": new Date(2026, 0, 2, 3, 30).getTime(),
  "value": 100.5
}, {
  "timestamp": new Date(2026, 0, 2, 4, 0).getTime(),
  "value": 101.55
}, {
  "timestamp": new Date(2026, 0, 2, 4, 30).getTime(),
  "value": 101.7
}, {
  "timestamp": new Date(2026, 0, 2, 5, 0).getTime(),
  "value": 100.5
}, {
  "timestamp": new Date(2026, 0, 2, 5, 30).getTime(),
  "value": 100.92
}, {
  "timestamp": new Date(2026, 0, 2, 6, 0).getTime(),
  "value": 102.2
}];

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
