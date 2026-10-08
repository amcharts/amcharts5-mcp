---
title: "Draggable Range with a Close Button"
source: "https://www.amcharts.com/demos/draggable-range-with-close-button/"
category: "line-area"
scraped: "2026-10-08"
---

A stop-loss line you can move: drag the box up or down and the value in it follows. Click the X and the line is gone.

When to let people drag a line: A draggable line turns a threshold into something people set themselves: a stop-loss in a trading tool, an alert level on a monitoring screen, a limit in a budget planner. The value in the box updates as it moves, and your code can act on it.

Good for:
- Trading tools: stop-loss and take-profit levels
- Alert thresholds people tune themselves
- What-if limits on a forecast

Think twice when:
- A fixed limit nobody should change: draw it in code
- Exact values: offer an input box too, dragging is approximate
- Touch screens: make the box bigger, so a finger can grab it

Prompt: Create a line chart of about 300 daily values with a draggable stop-loss line: a dashed horizontal line with a small box showing its value, which updates as the box is dragged up or down. A close button in the box removes it. Add a fill under the line, a cursor and tooltips. Use the amCharts 5 library with its Responsive theme.

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
  panX: true,       // drag the plot sideways to pan...
  panY: true,       // ...or up and down
  wheelX: "panX",   // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX",  // ...and the vertical wheel zooms in on the dates
  pinchZoomX: true, // pinch with two fingers to zoom on touch screens
  paddingLeft: 0    // the value labels sit at the chart's left edge
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineX.set("forceHidden", true); // no vertical cursor line...
cursor.lineY.set("forceHidden", true); // ...and no horizontal one: the cursor just shows the tooltip

// Generate random data
var date = new Date();
date.setHours(0, 0, 0, 0);

var value = 20;
// a random walk: each day moves a little from the day before, kept within 0 to 100
function generateData() {
  value = am5.math.round(Math.random() * 10 - 4.8 + value, 1);
  if (value < 0) {
    value = am5.math.round(Math.random() * 10, 1);
  }

  if (value > 100) {
    value = am5.math.round(100 - Math.random() * 10, 1);
  }
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
  baseInterval: { // one data point per day
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true, // faint grid lines between the main ones
    minGridDistance: 90     // at least 90px between date labels
  })
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
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
    labelText: "{valueY}" // the hovered value
  })
}));

series.fills.template.setAll({
  fillOpacity: 0.2, // a light fill under the line...
  visible: true     // ...switched on (line series fills are hidden by default)
});

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // a scrollbar above the plot, to zoom and pan the dates
}));

// DRAGGABLE RANGE
// add series range
var rangeDataItem = yAxis.makeDataItem({});
yAxis.createAxisRange(rangeDataItem);

// create container for all elements, you can put anything you want in it
var container = am5.Container.new(root, {
  // the box is centered vertically on the range line
  centerY: am5.p50,
  draggable: true,              // the box can be dragged (up and down only, see the adapters below)
  layout: root.horizontalLayout // the label and the X button side by side
})

// restrict from being dragged horizontally: the box stays at the value axis's side of the plot
container.adapters.add("x", function() {
  if (yAxis.get("renderer").get("opposite")) {
    return chart.plotContainer.width() - container.width(); // the axis on the right: at the right edge
  }
  return 0; // at the left edge
});

// restrict from being dragged outside of plot
container.adapters.add("y", function(y) {
  return Math.max(0, Math.min(chart.plotContainer.height(), y));
});

// change range when y changes
container.events.on("dragged", function() {
  updateLabel();
});

// this is needed for the bullets to be interactive, above the plot
yAxis.topGridContainer.children.push(container);

// create bullet and set container as a bullets sprite
rangeDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: container
}));

// decorate grid of a range: a red dashed line, the same red as the box around the label
rangeDataItem.get("grid").setAll({
  strokeOpacity: 1,
  visible: true,
  stroke: am5.color(0xff0000),
  strokeDasharray: [2, 2]
})

// create background for the container, in the chart's background color (white, or dark in dark mode)
var background = am5.RoundedRectangle.new(root, {
  fill: root.interfaceColors.get("background"),
  fillOpacity: 1,               // opaque, so the chart doesn't show through the box
  strokeOpacity: 0.5,           // the outline half transparent
  cornerRadiusTL: 0,            // square left corners, flush with the axis...
  cornerRadiusBL: 0,            // ...the right ones stay rounded
  cursorOverStyle: "ns-resize", // an up-down arrow pointer over the box
  stroke: am5.color(0xff0000)   // red, like the range line
})

container.set("background", background);

// with the value axis on the right, the box moves to the right edge and squares its right corners instead
yAxis.get("renderer").on("opposite", function(opposite) {
  background.setAll({
    cornerRadiusTL: opposite ? 8 : 0, // 8px, the theme's rounding, away from the axis
    cornerRadiusBL: opposite ? 8 : 0,
    cornerRadiusTR: opposite ? 0 : 8,
    cornerRadiusBR: opposite ? 0 : 8
  });
  container.markDirtyPosition(); // places the box again, through the x adapter above
});

// add label to container, this one will show value and text
var label = container.children.push(am5.Label.new(root, {
  paddingTop: 5,   // 5px of space above...
  paddingBottom: 5 // ...and below the text
}))

// add x button
var xButton = container.children.push(am5.Button.new(root, {
  cursorOverStyle: "pointer", // a hand pointer over the button
  paddingTop: 5,              // the same height as the label...
  paddingBottom: 5,
  paddingLeft: 2,             // ...close to it on the left, with some room on the right
  paddingRight: 8
}))

// add label to the button (you can add icon instead of a label)
xButton.set("label", am5.Label.new(root, {
  text: "X",
  paddingBottom: 0,         // no padding around the X
  paddingTop: 0,
  paddingRight: 0,
  paddingLeft: 0,
  fill: am5.color(0xff0000) // a red X
}))

// modify background of x button
xButton.get("background").setAll({
  strokeOpacity: 0, // no outline...
  fillOpacity: 0    // ...and no fill: only the red X shows
})

// dispose item when x button is clicked
xButton.events.on("click", function() {
  yAxis.disposeDataItem(rangeDataItem);
})

// reads the value at the box's height (zoom included), shows it and moves the range line there
function updateLabel(value) {
  var y = container.y();
  var position = yAxis.toAxisPosition(y / chart.plotContainer.height());

  if(value == null){
    value = yAxis.positionToValue(position);
  }

  label.set("text", "Stop loss: " + root.numberFormatter.format(value, "#.00")); // always two decimals

  rangeDataItem.set("value", value);
}

// when data is validated, set range value to the middle
series.events.on("datavalidated", () => {
  var max = yAxis.getPrivate("max", 1);
  var min = yAxis.getPrivate("min", 0);

  var value = min + (max - min) / 2;
  rangeDataItem.set("value", value);
  updateLabel(value);
})

// Set data
var data = generateDatas(300);
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
  max-width: 100%;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
