---
title: "Process Control Chart"
source: "https://www.amcharts.com/demos/process-control-chart/"
category: "line-area"
scraped: "2026-10-08"
---

A process control chart: 23 samples against an upper and a lower limit, with the zone between them shaded. Three fall outside, the signal to look for a cause.

When to shade the limits: Shading the space between the limits turns the chart into a simple test: inside the band is normal variation, outside it is a signal. That reads at a glance on a wall screen or in a report, even for people who never learned the rules of process control.

Good for:
- Shop-floor and wall-screen dashboards
- Quality reports for non-specialists
- Any safe range: temperature, pressure, stock levels

Think twice when:
- Limits that change over time: draw them as series from your data
- Several processes at once: give each its own small chart
- Subtle drifts inside the band: flag runs of points too

Prompt: Create a process control chart of 23 samples, with a shaded band between the lower and upper control limits, solid lines for both limits and a dashed line for the process average, each labeled inside the plot. Add round markers, a cursor, tooltips and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

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

var data = [
  { x: 1, value: 14 },
  { x: 2, value: 11 },
  { x: 3, value: 12 },
  { x: 4, value: 14 },
  { x: 5, value: 11 },
  { x: 6, value: 11 },
  { x: 7, value: 12 },
  { x: 8, value: 12 },
  { x: 9, value: 13 },
  { x: 10, value: 15 },
  { x: 11, value: 19 },
  { x: 12, value: 21 },
  { x: 13, value: 22 },
  { x: 14, value: 20 },
  { x: 15, value: 18 },
  { x: 16, value: 14 },
  { x: 17, value: 16 },
  { x: 18, value: 18 },
  { x: 19, value: 17 },
  { x: 20, value: 15 },
  { x: 21, value: 12 },
  { x: 22, value: 8 },
  { x: 23, value: 11 }
];

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: true,     // drag the plot to pan sideways...
    panY: true,     // ...and up and down
    wheelX: "panX", // a horizontal wheel or trackpad swipe pans...
    wheelY: "zoomX" // ...and the vertical wheel zooms in along x
  })
);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 50 // at least 50px between the x labels
    }),
    tooltip: am5.Tooltip.new(root, {}) // shows the x value under the cursor on the axis
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
    // bullets hide when points get closer than 10px, so they don't crowd a zoomed-out line
    minBulletDistance: 10,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "x",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal", // the tooltip sits beside the point, not above it
      labelText: "{valueY}"             // just the value
    })
  })
);

series.strokes.template.setAll({
  strokeWidth: 3 // a 3px line
});

series.data.setAll(data);

// All bullets share one template, so setting its radius resizes them at once
var bulletTemplate = am5.Template.new({
  radius: 6
});

// a dot on every point
series.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      fill: series.get("fill"), // the series color
      stroke: root.interfaceColors.get("background"), // a ring in the background color...
      strokeWidth: 2 // ...2px wide, sets each dot off the line
    }, bulletTemplate)
  });
});

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis
}));
cursor.lineY.set("visible", false); // only the vertical cursor line, no horizontal one

// add scrollbar
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // a scrollbar along the top, to zoom in on part of the line
}));

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000, 100);
chart.appear(1000, 100);

// Function to add process control ranges
function addLimits(lower, upper) {
  // Colors from the theme, so the chart follows the theme
  var colors = chart.get("colors");

  // Add range fill
  createRange(lower, upper, undefined, colors.getIndex(4));

  // Add upper/average/lower lines
  var lowerRange = createRange(lower, undefined, "Lower control limit", colors.getIndex(10));
  createRange(upper, undefined, "Upper control limit", colors.getIndex(10));
  createRange(lower + (upper - lower) / 2, undefined, "Process average", colors.getIndex(10), true);

  // The lower label goes under its line, clear of the data inside the limits
  lowerRange.get("label").set("centerY", am5.p0);
}

addLimits(10, 20);

// an axis range: a filled band when it has an end value, otherwise a line, with an optional label
function createRange(value, endValue, label, color, dashed) {
  var rangeDataItem = yAxis.makeDataItem({
    value: value,
    endValue: endValue
  });

  var range = yAxis.createAxisRange(rangeDataItem);

  if (endValue) {
    range.get("axisFill").setAll({
      fill: color,
      fillOpacity: 0.2, // a light band between the limits
      visible: true     // an axis range's fill is hidden until set visible
    });
  }
  else {
    range.get("grid").setAll({
      stroke: color,
      strokeOpacity: 1, // fully opaque, unlike the regular grid
      strokeWidth: 2,   // 2px wide
      location: 1,
      forceHidden: false // shown even with the regular grid hidden, whose template this grid copies
    });

    if (dashed) {
      range.get("grid").set("strokeDasharray", [5, 3]); // 5px dashes, 3px gaps
    }
  }

  if (label) {
    range.get("label").setAll({
      text: label,
      location: 1,
      fontSize: 19,    // large text, in pixels
      inside: true,    // inside the plot, not next to the axis
      centerX: am5.p0, // the label starts at the left edge of the plot and runs right
      // the label's bottom on the line, so the text sits just above it
      centerY: am5.p100
    });
  }

  return range;
}
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
