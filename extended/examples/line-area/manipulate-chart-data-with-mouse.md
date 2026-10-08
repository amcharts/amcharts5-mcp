---
title: "Manipulate Chart Data with Mouse"
source: "https://www.amcharts.com/demos/manipulate-chart-data-with-mouse/"
category: "line-area"
scraped: "2026-10-08"
---

A line chart you can edit by hand: press anywhere on the plot and drag up or down, and the nearest point follows. Handy for what-if plans and rough forecasts.

When people edit the data: Dragging points turns a chart into an input: people shape a forecast, a budget or a target curve by eye and see the result as they go. The new values are in the chart’s data, ready for your code to save or send on.

Good for:
- What-if planning and rough forecasts
- Teaching how one change moves a trend
- Collecting estimates in a survey

Think twice when:
- Exact numbers: offer a table or input boxes too
- Hundreds of points: each one is too close to the next to pick
- Data that must not change, like reported results

Prompt: Create a line chart of 40 daily values where pressing on the plot and dragging up or down changes the value of the nearest point, live. Show circle markers on the points and a resize cursor on hover. Add tooltips and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

const myTheme = am5.Theme.new(root); // a theme of our own, for the rule below

myTheme.rule("AxisLabel").setAll({
  fontSize:"0.9em" // axis labels at 90% of the normal text size
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
  wheelX: "panX",   // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX",  // ...and the vertical wheel zooms in on the dates
  pinchZoomX: true, // pinch with two fingers to zoom on a touch screen
  paddingLeft: 0    // the value labels sit at the chart's left edge
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none" // a drag on the plot neither zooms nor selects, so it can move points
}));
cursor.lineY.set("visible", false); // only the vertical cursor line, no horizontal one

// Generate random data
var date = new Date();
date.setHours(0, 0, 0, 0);
var value = 100;

// one day's point: the value moves randomly by up to 5 from the day before
function generateData() {
  value = Math.round((Math.random() * 10 - 5) + value);
  am5.time.add(date, "day", 1);
  return {
    date: date.getTime(),
    value: value
  };
}

// an array of count daily points
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
  maxDeviation: 0.2, // pans up to 20% past the first and last date
  baseInterval: {    // one data point per day
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true // fainter grid lines between the labeled ones
  }),
  tooltip: am5.Tooltip.new(root, {}) // a date label follows the cursor along the axis
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {
    // drag along the value axis labels to zoom it in and out
    pan: "zoom"
  })
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Series",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  valueXField: "date",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY.formatNumber('#.#')}" // the value with up to one decimal
  })
}));

// a hollow dot on each point, with an up-down pointer to hint it can be dragged
series.bullets.push(function() {
  var graphics = am5.Circle.new(root, {
    radius: 4,                    // 4px radius
    interactive: true,            // reacts to the pointer, so the pointer style shows
    cursorOverStyle: "ns-resize", // an up-down arrow pointer over the dot
    stroke: series.get("stroke"), // outlined in the line's color
    // filled with the chart's background color, so the points look hollow in light and dark mode
    fill: root.interfaceColors.get("background")
  });

  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // a bar above the plot to zoom and scroll through the dates
}));

// manipulating with mouse code
var isDown = false; // true while the mouse button is held down on the plot

// register down
chart.plotContainer.events.on("pointerdown", function() {
  isDown = true;
})
// register up
chart.plotContainer.events.on("globalpointerup", function() {
  isDown = false;
})

// while the button is held, the point under the cursor follows the pointer up and down
chart.plotContainer.events.on("globalpointermove", function(e) {
  // if pointer is down
  if (isDown) {
    // get tooltip data item
    var tooltipDataItem = series.get("tooltipDataItem");
    if (tooltipDataItem) {
      if (e.originalEvent) {

        // the pointer's height in the plot area, turned into a value on the Y axis
        var position = yAxis.coordinateToPosition(chart.plotContainer.toLocal(e.point).y);
        // rounded to one decimal
        var value = Math.round(yAxis.positionToValue(position) * 10) / 10;
        // need to set both working and original value
        tooltipDataItem.set("valueY", value);
        tooltipDataItem.set("valueYWorking", value);
      }
    }
  }
})

// Set data
var data = generateDatas(40);
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
  max-width:100%;
  height: 500px;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
