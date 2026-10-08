---
title: "Multiple Value Axes"
source: "https://www.amcharts.com/demos/multiple-value-axes/"
category: "line-area"
scraped: "2026-10-08"
---

Three series with very different ranges, each with its own axis in its color and one shared set of grid lines, so every line gets the full height.

When to give each series its own axis: Separate axes let series of very different size share one time line, like revenue in millions next to a rate in percent. The catch: the chart no longer shows how big they are against each other, and where lines cross means nothing, so color each axis like its line and stop at two or three.

amCharts keeps the axes in step: syncWithAxis gives each axis the grid lines of another, as here, so the chart has one grid instead of three, and with syncZeros the zero lines of all the axes fall on the same line too, when their ranges cross zero.

Good for:
- Measures in different units over the same dates
- Seeing whether series rise and fall together
- One chart on a dashboard instead of three

Think twice when:
- Comparing sizes: use one axis, or separate charts
- More than three axes: readers lose track of which is which
- Readers who take a crossing as a meaningful point

Prompt: Create a line chart of three series of daily values of very different sizes on one date axis, each with its own value axis (one on the left, two on the right) colored like its series, synced so they share one set of grid lines. Add a cursor, tooltips and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

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

// every third palette color, so the three lines differ clearly
chart.get("colors").set("step", 3);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    maxDeviation: 0.1, // pans up to 10% past the first and last day
    groupData: false,  // every day stays a point of its own, never grouped into weeks
    baseInterval: {    // one point per day
      timeUnit: "day",
      count: 1
    },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 80,   // at least 80px between labels; on narrow screens some are skipped
      minorGridEnabled: true // fainter grid lines between the labeled ones
    }),
    tooltip: am5.Tooltip.new(root, {}) // a date label follows the cursor along the axis
  })
);

// faint grid lines, 5% like the value axes'
xAxis.get("renderer").grid.template.set("strokeOpacity", 0.05);

// a value axis with a line of its own
function createAxisAndSeries(startValue, opposite) {
  var yRenderer = am5xy.AxisRendererY.new(root, {
    opposite: opposite // true puts the axis on the right side
  });
  var yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      maxDeviation: 1, // can pan up to a whole screen past the values
      renderer: yRenderer
    })
  );

  // the other axes fit their scale to the first one's grid, so one set of grid lines serves all
  if (chart.yAxes.indexOf(yAxis) > 0) {
    yAxis.set("syncWithAxis", chart.yAxes.getIndex(0));
  }

  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  var series = chart.series.push(
    am5xy.LineSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "horizontal", // the tooltip sits beside the point
        labelText: "{valueY}"             // the point's value
      })
    })
  );

  series.strokes.template.setAll({ strokeWidth: 1 }); // a 1px line

  yRenderer.grid.template.set("strokeOpacity", 0.05); // faint grid lines
  // labels and axis line in the series' color show which scale belongs to which line
  yRenderer.labels.template.set("fill", series.get("fill"));
  yRenderer.setAll({
    stroke: series.get("fill"),
    strokeOpacity: 1, // show the axis line, which the theme hides
    opacity: 1
  });

  series.data.setAll(generateChartData(startValue)); // 100 days of random values from startValue
}

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis,    // the cursor snaps to the days
  behavior: "none" // dragging the plot pans instead of selecting a range to zoom
}));
cursor.lineY.set("visible", false); // only the vertical cursor line, no horizontal one

// add scrollbar
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // a bar above the plot to zoom and scroll through the days
}));

createAxisAndSeries(100, false); // left axis, values from about 100
createAxisAndSeries(1000, true); // right axis, about 1000
createAxisAndSeries(8000, true); // another right axis, about 8000

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart.appear(1000, 100);

// Generates random data, quite different range
function generateChartData(value) {
  var data = [];
  var firstDate = new Date();
  firstDate.setDate(firstDate.getDate() - 100); // 100 days ago
  firstDate.setHours(0, 0, 0, 0);

  for (var i = 0; i < 100; i++) {
    var newDate = new Date(firstDate);
    newDate.setDate(newDate.getDate() + i);

    value += Math.round( // a random step of up to 5% of the value
      ((Math.random() < 0.5 ? 1 : -1) * Math.random() * value) / 20
    );

    data.push({
      date: newDate.getTime(), // a timestamp, as the date axis needs
      value: value
    });
  }
  return data;
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
