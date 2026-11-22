---
title: "Control Chart"
source: "https://www.amcharts.com/demos/control-chart/"
category: "line-area"
scraped: "2026-11-21"
---

A control chart tracks readings against a center line and two control limits. Readings beyond a limit turn red; a long run above the center line gets red rings, an early warning that the process is drifting.

Reading a control chart: Every process varies a little. Control limits, set three standard deviations either side of the average, separate that everyday noise from real change: a point beyond a limit, or a long run on one side of the center line, means something in the process has shifted.

Good for:
- Manufacturing: weights, sizes, fill levels
- Service times, error rates and other process metrics
- Telling real problems from normal variation

Think twice when:
- Data with a trend or a season: the limits assume a stable process
- Only a few readings: limits need enough data to be trusted
- Readers who don’t know the rules: add a key to the colors

Prompt: Create a control chart of 16 readings taken every 30 minutes, with a center line and dashed upper and lower control limits, labeled at the right. Mark the readings beyond a limit, and a long run above the center line, with differently styled markers. Add a cursor and tooltips. Use the amCharts 5 library with its ResponsiveMax theme.

The demo's page on amcharts.com adds controls that are not part of this code: Limit line opacity, Line dash, Bullets, Bullet size, Vertical grid, Horizontal grid, Scrollbar.

## JavaScript

```javascript
// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_ResponsiveMax.new(root)
]);

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,      // drag the plot sideways to pan...
  panY: true,      // ...or up and down
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans
  wheelY: "zoomX", // the vertical wheel zooms in on the time
  pinchZoomX: true // pinch to zoom on touch screens
}));

// Add scrollbar, hidden at first
// https://docs.amcharts.com/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal", forceHidden: true }));

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minGridDistance: 60,   // at least 60px between labels; on narrow screens some are skipped
  minorGridEnabled: true // fainter grid lines between the labeled times
});

var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  baseInterval: { timeUnit: "minute", count: 30 }, // one reading every 30 minutes
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {}),              // the cursor shows the time on the axis
  // 1% of room at each end, so the first bullet, on the very edge, isn't cut in half
  extraMin: 0.01,
  extraMax: 0.01,
  tooltipLocation: 0 // the axis tooltip shows the start of the interval
}));

var yRenderer = am5xy.AxisRendererY.new(root, {});
// no horizontal grid lines, so the guide lines below stand out
yRenderer.grid.template.set("forceHidden", true);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: yRenderer
}));

// Add cursor
// https://docs.amcharts.com/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none", // dragging pans the plot instead of selecting a range
  xAxis: xAxis      // the cursor snaps to the 30-minute intervals
}));
cursor.lineY.set("visible", false); // no horizontal cursor line, only the vertical one

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Series",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  valueXField: "timestamp",
  // each reading at its exact time, the start of its 30-minute interval, not the middle
  locationX: 0,
  seriesTooltipTarget: "bullet", // the tooltip takes its color from the reading's bullet
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}" // the reading
  })
}));

// All bullets share one template, so setting its radius resizes them at once
var circleTemplate = am5.Template.new({
  radius: 6, // 6px dots
  templateField: "bulletSettings", // flagged readings get their look from bulletSettings
  fill: series.get("fill"), // the series color
  strokeWidth: 2, // a 2px outline...
  stroke: root.interfaceColors.get("background") // ...in the background color
});

series.bullets.push(function (root, series, dataItem) {
  // keyboard and screen readers (see Accessibility below): one Tab stop for all the readings (a focusable
  // group), the arrow keys step through them, and a flagged one says so
  var flag = dataItem.dataContext.bulletSettings;
  var circle = am5.Circle.new(root, {
    focusable: true,
    focusableGroup: "readings",
    ariaLabel: "{valueX.formatDate('MMMM d, HH:mm')}: {valueY}" +
      (flag === alarm ? ", outside the control limits" : flag === warning ? ", in a long run above the center line" : "")
  }, circleTemplate);

  return am5.Bullet.new(root, {
    sprite: circle,
    locationX: 0 // at the start of the interval, on the line's point
  });
});

// a line across the plot at the given value, labeled at its right end by an adapter
function createGuide(value, text, dashArray) {
  var guideDataItem = yAxis.makeDataItem({ value: value });
  yAxis.createAxisRange(guideDataItem);
  guideDataItem.get("grid").setAll({
    forceHidden: false,        // show this grid line, though the axis grid is hidden
    strokeOpacity: 0.2,        // faint
    strokeDasharray: dashArray // dashed for the limits, solid for the center line
  });

  var label = guideDataItem.get("label");
  label.setAll({
    text: text,        // LCL, CL or UCL
    isMeasured: false, // takes no room in the axis layout, so it can sit over the plot
    centerY: am5.p100  // just above the line
  });

  label.adapters.add("x", function (x) {
    return chart.plotContainer.width(); // the plot's right edge
  })

  // set x again when the chart resizes, so the adapter moves the label to the new right end
  chart.events.on("boundschanged", function () {
    label.set("x", label.get("x"))
  })
}

// Center line and control limits, the same distance above and below it
createGuide(98.35, "LCL", [2, 2]);
createGuide(100, "CL");
createGuide(101.65, "UCL", [2, 2]);

// Readings outside the limits are flagged in the theme's negative color; a long run of readings above the
// center line gets rings in that color, a warning that the process is drifting
var alarm = { fill: root.interfaceColors.get("negative") };
var warning = { fill: root.interfaceColors.get("background"), stroke: root.interfaceColors.get("negative") };

var data = [{
  "timestamp": new Date(2026, 0, 1, 22, 30).getTime(),
  "value": 99.71
}, {
  "timestamp": new Date(2026, 0, 1, 23, 0).getTime(),
  "value": 99.13
}, {
  "timestamp": new Date(2026, 0, 1, 23, 30).getTime(),
  "value": 98.5
}, {
  "timestamp": new Date(2026, 0, 2, 0, 0).getTime(),
  "value": 101
}, {
  "timestamp": new Date(2026, 0, 2, 0, 30).getTime(),
  "value": 99.45
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
  "value": 101.55,
  "bulletSettings": warning
}, {
  "timestamp": new Date(2026, 0, 2, 4, 30).getTime(),
  "value": 101.95,
  "bulletSettings": alarm
}, {
  "timestamp": new Date(2026, 0, 2, 5, 0).getTime(),
  "value": 100.5,
  "bulletSettings": warning
}, {
  "timestamp": new Date(2026, 0, 2, 5, 30).getTime(),
  "value": 100.92,
  "bulletSettings": warning
}, {
  "timestamp": new Date(2026, 0, 2, 6, 0).getTime(),
  "value": 102.2,
  "bulletSettings": alarm
}];

series.data.setAll(data);

// Accessibility: keyboard and screen reader support
// https://docs.amcharts.com/v5/concepts/accessibility/
chart.setAll({
  focusable: true, // Tab reaches the chart, and a screen reader names it
  role: "figure",
  ariaLabel: "Control chart of 16 readings, one every 30 minutes from 10:30 pm on January 1, 2026 to 6 am the next day, against a center line of 100 and control limits of 98.35 and 101.65. Tab to the readings, then move between them with the arrow keys"
});
// the readings: set up for the keyboard where they are made, in the bullet function above

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
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
- https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js
