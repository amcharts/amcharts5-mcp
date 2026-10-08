---
title: "Range Area Chart"
source: "https://www.amcharts.com/demos/range-area-chart/"
category: "line-area"
scraped: "2026-10-08"
---

A band instead of a line: the shaded area runs between a low and a high value for each day, so you see the spread as well as the trend.

When a range area works: A range area shows where values fall between two limits: daily low and high temperatures, a forecast with its margin, a price’s range through the day. The width of the band means as much as its position, so it reads best when the two edges move together.

Good for:
- Daily lows and highs, like temperatures or prices
- Forecasts with an upper and a lower estimate
- Tolerance bands: the range a value should stay in

Think twice when:
- Two lines that cross: color the gap by which one leads
- Readers who need the middle value: draw it as a line inside the band
- Several bands at once: they overlap and muddy each other

Prompt: Create a range area chart of about 200 days of data: a shaded band between a low and a high line that wanders, widening and narrowing but never pinching shut. Add tooltips with the low and high values, a cursor and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: true,       // drag the plot to pan sideways...
    panY: true,       // ...and up and down
    wheelX: "panX",   // a horizontal wheel or trackpad swipe pans...
    wheelY: "zoomX",  // ...and the vertical wheel zooms in on the dates
    pinchZoomX: true, // pinch on a touch screen to zoom in on the dates
    paddingLeft: 0    // the value labels sit at the chart's left edge
  })
);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none" // a drag pans the plot instead of zooming
}));
cursor.lineY.set("visible", false); // only the vertical cursor line, no horizontal one

// Generate random data: a middle value that wanders, and a band around it
// that widens and narrows, but never pinches shut
var date = new Date(); // today; each new point moves it one day on
date.setHours(0, 0, 0, 0);
var middle = 120;      // where the middle of the band starts
var spread = 20;       // half the band's starting width

// the next day's point: the low and high edges of the band
function generateData() {
  middle = Math.round(Math.random() * 10 - 5 + middle);
  spread = Math.round(Math.random() * 6 - 3 + spread);

  // the middle never drops below 60
  if (middle < 60) {
    middle = 60;
  }

  // keep the band between 20 and 70 wide
  spread = Math.min(35, Math.max(10, spread));

  am5.time.add(date, "day", 1);
  return { date: date.getTime(), value0: middle - spread, value1: middle + spread };
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
    maxDeviation: 0.5, // can pan up to half a screen past the first and last day
    baseInterval: { timeUnit: "day", count: 1 }, // one point per day
    renderer: am5xy.AxisRendererX.new(root, {
      // drag the axis to zoom it
      pan: "zoom",
      minorGridEnabled: true // fainter grid lines between the labeled ones
    }),
    tooltip: am5.Tooltip.new(root, {}) // shows the date under the cursor on the axis
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 1, // can pan up to a full plot height above or below the values
    renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" }) // drag the value axis to zoom it too
  })
);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
// The lower edge of the band
var series0 = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Low",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value0",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      labelText: "Low: {valueY}",
      pointerOrientation: "horizontal" // the tooltip sits beside the point, not above it
    })
  })
);

// The upper edge, filled down to the lower one (openValueYField)
// instead of down to the axis
var series1 = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "High",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value1",
    openValueYField: "value0",
    valueXField: "date",
    // the same color as the lower edge, so the two lines and the fill read as one band
    stroke: series0.get("stroke"),
    fill: series0.get("stroke"),
    tooltip: am5.Tooltip.new(root, {
      labelText: "High: {valueY}",
      pointerOrientation: "horizontal" // the tooltip sits beside the point, not above it
    })
  })
);

series1.fills.template.setAll({
  fillOpacity: 0.3, // a see-through band between the two lines
  visible: true     // a line series' fill is hidden by default
});

series0.strokes.template.set("strokeWidth", 2); // 2px lines
series1.strokes.template.set("strokeWidth", 2);

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // a scrollbar along the top, to zoom in on the dates
}));

var data = generateDatas(200); // 200 days
series0.data.setAll(data);
series1.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series0.appear(1000);
series1.appear(1000);
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
