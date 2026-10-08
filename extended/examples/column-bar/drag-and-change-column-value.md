---
title: "Drag and Change Column Value"
source: "https://www.amcharts.com/demos/drag-and-change-column-value/"
category: "column-bar"
scraped: "2026-10-08"
---

A column chart you can edit by hand: press anywhere on the plot and drag up or down, and the column under the pointer follows. The chart becomes an input.

When people set the values: Dragging columns is a quick way to collect a rough set of numbers: a budget split by month, a forecast, a guess in a survey. People see the shape of what they enter as they go, and the new values are in the chart’s data, ready for your code to save.

Good for:
- What-if planning and rough budgets
- Surveys and estimation games
- Letting people sketch a forecast

Think twice when:
- Exact figures: offer input boxes too
- Dozens of columns: hard to hit the one you mean
- Data that must not change, like reported results

Prompt: Create a column chart of about three weeks of daily values that users set by pressing on the plot and dragging up or down; dragging sideways sets the next columns too. Give each column its own color. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// a theme of our own: its rules apply to every axis label
const myTheme = am5.Theme.new(root);

myTheme.rule("AxisLabel", ["minor"]).setAll({
  dy: 1 // the minor labels sit 1px lower
});

myTheme.rule("AxisLabel").setAll({
  fontSize: "0.9em" // all axis labels a little smaller
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
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX", // ...and the vertical wheel zooms in on the dates
  paddingLeft: 0   // the value labels sit at the chart's left edge
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  // dragging over the plot doesn't zoom, so it is free to change the column values
  behavior: "none"
}));
cursor.lineY.set("visible", false); // no horizontal cursor line

// Generate random data: one value from 30 to 90 per day
var date = new Date();
date.setHours(0, 0, 0, 0);

// the next day's data point
function generateData() {
  var value = Math.round(Math.random() * 60 + 30);
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
  baseInterval: {    // one column per day
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true,  // faint grid lines between the main ones...
    minorLabelsEnabled: true // ...with small labels for the days in between
  }),
  tooltip: am5.Tooltip.new(root, {}) // shows the hovered date on the axis
}));

// the minor labels show just the day of the month
xAxis.set("minorDateFormats", {
  "day":"dd",
  "month":"MM"
});

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0, // columns start at zero, so a column dragged down can reach it
  extraMax: 0.1, // a little room above the highest column, to drag it higher
  renderer: am5xy.AxisRendererY.new(root, {
    minorGridEnabled: true, // faint grid lines between the value grid lines
    // dragging along the axis labels zooms the value scale
    pan: "zoom"
  })
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "Series",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  valueXField: "date",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY.formatNumber('#.#')}" // the value, with at most one decimal
  }),
  // Each column takes its own color from the series palette
  colorByDataItem: true
}));

// rounded top corners, no outline
series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
// manipulating with mouse code
var isDown = false;

// register down
chart.plotContainer.events.on("pointerdown", function () {
  isDown = true;
})
// register up
chart.plotContainer.events.on("globalpointerup", function () {
  isDown = false;
})

// while the button is down, the hovered column takes the value under the pointer
chart.plotContainer.events.on("globalpointermove", function (e) {
  // if pointer is down
  if (isDown) {
    // get tooltip data item
    var tooltipDataItem = series.get("tooltipDataItem");
    if (tooltipDataItem) {
      if (e.originalEvent) {

        // the pointer's height in the plot area, as a relative position on the value axis
        var position = yAxis.coordinateToPosition(chart.plotContainer.toLocal(e.point).y);
        // the value under the pointer, rounded to one decimal
        var value = Math.round(yAxis.positionToValue(position) * 10) / 10;
        // set both the value and the working value
        tooltipDataItem.set("valueY", value);
        tooltipDataItem.set("valueYWorking", value);
      }
    }
  }
})

// Set data
var data = generateDatas(20);
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
